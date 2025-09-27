"use client";

import React, { useCallback, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z, ZodSchema } from "zod";

import { useAppSelector } from "@/store/hook";
import { defaultProfile } from "@/constant/images";
import RichEditor, { RichEditorRef } from "./RichEditor/RichEditor";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import FormButton from "@/components/forms/FormButton";

// Define your default schema
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

// Infer type from defaultSchema
export type CommentBoxSchemaType = z.infer<typeof defaultSchema>;

interface CommentBoxProps {
  id?: number;
  schema?: ZodSchema<CommentBoxSchemaType>; // <- This fixes your type error
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
  autoFocus = false,
  showAvatar = true,
  className,
}) => {
  const { user } = useAppSelector((state) => state.user);
  const richEditorRef = useRef<RichEditorRef>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

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
    },
    [setValue]
  );

  const onFocusChange = useCallback((focused: boolean) => {
    setIsFocused(focused);
  }, []);

  const resetEditor = useCallback(() => {
    reset();
    richEditorRef.current?.reset();
    setIsEmpty(true);
    setIsFocused(false);
  }, [reset]);

  const onInternalSubmit = handleSubmit(async (values) => {
    if (isEmpty || !values.content.trim()) return;
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
        {/* Avatar */}
        <div className="flex-shrink-0 hidden sm:inline-block">
          <Avatar className={cn(avatarSize, "border border-neutral-200")}>
            <AvatarImage
              src={user.profile_image ?? undefined}
              alt="Your avatar"
              className="object-cover"
            />
            <AvatarFallback>
              <img
                src={defaultProfile.src}
                alt="Fallback"
                className="object-cover w-full h-full rounded-full"
              />
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Comment Input */}
        <div className="flex-1 min-w-0">
          <form onSubmit={onInternalSubmit} className="space-y-2">
            <div
              className={`border rounded-2xl transition-all duration-200 ${
                isFocused
                  ? "border-primary shadow-sm bg-background"
                  : "border-neutral-200 bg-neutral-50 hover:bg-background hover:border-neutral-300"
              }`}
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
            {/* Error Display */}
            {methods.formState.errors.content && (
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
