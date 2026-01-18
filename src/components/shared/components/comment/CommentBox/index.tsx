"use client";

import React, { useCallback, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z, ZodSchema } from "zod";
import dynamic from "next/dynamic";

import { useAppSelector } from "@/store/hook";
import { defaultProfile } from "@/constant/images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  moderateContent,
  ModerationConfig,
  MODERATION_PRESETS,
  ModerationResult,
} from "@/lib/contentModeration";
import { ModerationWarning } from "./ModerationWarning";
import Image from "next/image";
import type { RichEditorRef } from "./RichEditor/RichEditor";

const RichEditor = dynamic(() => import("./RichEditor/RichEditor"), {
  loading: () => (
    <div className="min-h-[100px] bg-neutral-50 border border-neutral-200 rounded-lg animate-pulse p-4">
      <div className="h-4 bg-neutral-300 rounded w-1/3"></div>
    </div>
  ),
  ssr: false,
});

const defaultSchema = z.object({
  content: z.string().min(1, "Please write your reply"),
  id: z.number().nullable(),
  attachments: z
    .array(
      z.instanceof(File).refine((file) => file.size <= 5_000_000, {
        message: "File size must not be more than 5MB",
      })
    )
    .optional(),
});

export type CommentBoxSchemaType = z.infer<typeof defaultSchema>;

interface CommentBoxProps {
  id?: number;
  schema?: ZodSchema<CommentBoxSchemaType>;
  onSubmit: (values: CommentBoxSchemaType) => Promise<void>;
  placeholder?: string;
  compact?: boolean;
  acceptTypes?: string[];
  showLinkButton?: boolean;
  isLoading?: boolean;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  autoFocus?: boolean;
  showAvatar?: boolean;
  className?: string;
  moderationConfig?: ModerationConfig;
  onModerationViolation?: (violations: string[]) => void;
}

const CommentBox: React.FC<CommentBoxProps> = ({
  id,
  schema = defaultSchema,
  onSubmit,
  placeholder = "Write a comment...",
  compact = false,
  acceptTypes = ["image/png", "image/jpeg", "image/jpg"],
  showLinkButton = false,
  isLoading = false,
  onSuccess,
  onError,
  showAvatar = true,
  moderationConfig = MODERATION_PRESETS.NONE,
  onModerationViolation,
}) => {
  const { user } = useAppSelector((state) => state.user);
  const richEditorRef = useRef<RichEditorRef>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [moderationResult, setModerationResult] = useState<ModerationResult>({
    valid: true,
    violations: [],
    warnings: [],
    hasIssues: false,
  });

  const methods = useForm<CommentBoxSchemaType>({
    defaultValues: {
      content: "",
      id: id ?? null,
      attachments: [],
    },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, setValue, reset, watch } = methods;

  const onContentUpdate = useCallback(
    (html: string, isEmpty: boolean) => {
      setValue("content", html);
      setIsEmpty(isEmpty);

      if (moderationConfig.enabled && moderationConfig.realTime) {
        if (isEmpty) {
          setModerationResult({
            valid: true,
            violations: [],
            warnings: [],
            hasIssues: false,
          });
          if (methods.formState.errors.content) {
            methods.clearErrors("content");
          }
        } else {
          const result = moderateContent(html, moderationConfig);
          setModerationResult(result);

          if (result.valid && methods.formState.errors.content) {
            methods.clearErrors("content");
          }
        }
      } else {
        setModerationResult({
          valid: true,
          violations: [],
          warnings: [],
          hasIssues: false,
        });
      }
    },
    [setValue, moderationConfig, methods]
  );

  const onFocusChange = useCallback((focused: boolean) => {
    setIsFocused(focused);
  }, []);

  const resetEditor = useCallback(() => {
    reset();
    richEditorRef.current?.reset();
    setIsEmpty(true);
    setIsFocused(false);
    setModerationResult({
      valid: true,
      violations: [],
      warnings: [],
      hasIssues: false,
    });
  }, [reset]);

  const onInternalSubmit = handleSubmit(async (values) => {
    if (isEmpty || !values.content.trim()) return;

    if (moderationConfig.enabled) {
      const result = moderateContent(values.content, moderationConfig);

      if (!result.valid) {
        const errorMessage = result.violations.join(". ");
        methods.setError("content", {
          type: "moderation",
          message: errorMessage,
        });

        setModerationResult(result);
        onModerationViolation?.(result.violations);
        onError?.(errorMessage);
        return;
      }

      if (result.warnings.length > 0) {
        console.warn("Content warnings:", result.warnings);
        setModerationResult(result);
      }
    }

    try {
      await onSubmit(values);
      onSuccess?.();
      resetEditor();
    } catch (error: any) {
      onError?.(error?.message || "Failed to submit comment.");
    }
  });

  const avatarSize = compact ? "w-8 h-8" : "w-10 h-10";

  return (
    <FormProvider {...methods}>
      <div className="flex gap-3">
        {showAvatar && (
          <div className="flex-shrink-0 hidden sm:inline-block">
            <Avatar className={cn(avatarSize, "border border-neutral-200")}>
              <AvatarImage
                src={user.profile_image ?? undefined}
                alt="Your avatar"
                className="object-cover"
              />
              <AvatarFallback>
                <Image
                  fill
                  src={defaultProfile.src}
                  alt="Fallback"
                  className="object-cover w-full h-full rounded-full"
                />
              </AvatarFallback>
            </Avatar>
          </div>
        )}

        <div className="flex-1 min-w-0">
          <form onSubmit={onInternalSubmit} className="space-y-2">
            <div
              className={cn(
                "border rounded-2xl transition-all duration-200",
                isFocused
                  ? "border-primary shadow-sm bg-background"
                  : "border-neutral-200 bg-neutral-50 hover:bg-background hover:border-neutral-300",
                moderationResult.violations.length > 0 && "border-error"
              )}
            >
              <RichEditor
                ref={richEditorRef}
                onContentUpdate={onContentUpdate}
                onFocusChange={onFocusChange}
                placeholder={placeholder}
                attachments={watch("attachments") ?? []}
                setAttachments={(files) => setValue("attachments", files)}
                isLoading={isLoading}
                onSubmit={onInternalSubmit}
                compact={compact}
                acceptTypes={acceptTypes}
                showLinkButton={showLinkButton}
              />
            </div>

            <ModerationWarning
              violations={moderationResult.violations}
              warnings={moderationResult.warnings}
              className="mt-2"
            />

            {methods.formState.errors.content &&
              methods.formState.errors.content.type !== "moderation" && (
                <p className="text-xs text-error mt-1 px-3">
                  {methods.formState.errors.content.message}
                </p>
              )}
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default CommentBox;
