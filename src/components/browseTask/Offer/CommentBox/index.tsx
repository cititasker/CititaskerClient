"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAppSelector } from "@/store/hook";
import { replyOffer } from "@/services/offer";
import { defaultProfile } from "@/constant/images";
import { API_ROUTES } from "@/constant";
import { useSnackbar } from "@/providers/SnackbarProvider";
import RichEditor from "./RichEditor/RichEditor";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const schema = z.object({
  content: z.string().min(1, "Please write your reply"),
  offer_id: z.number().nullable(),
  attachments: z
    .array(
      z.instanceof(File).refine((file) => file.size <= 5_000_000, {
        message: "File size must not be more than 5MB",
      })
    )
    .optional(),
});

type SchemaType = z.infer<typeof schema>;

interface CommentBoxProps {
  offer_id?: number;
  onSuccess?: () => void;
  placeholder?: string;
  compact?: boolean;
}

const CommentBox: React.FC<CommentBoxProps> = ({
  offer_id,
  onSuccess,
  placeholder = "Write a comment...",
  compact = false,
}) => {
  const { user } = useAppSelector((state) => state.user);
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const [isFocused, setIsFocused] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  const methods = useForm<SchemaType>({
    defaultValues: {
      content: "",
      offer_id: offer_id,
      attachments: [],
    },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, setValue, reset, watch } = methods;

  const mutation = useMutation({
    mutationFn: replyOffer,
    onSuccess(data) {
      reset();
      setIsEmpty(true);
      setIsFocused(false);
      showSnackbar(data.message, "success");
      onSuccess?.();
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.OFFER_REPLIES, offer_id],
      });
    },
    onError(error: any) {
      showSnackbar(error.message || "Failed to send reply", "error");
    },
  });

  const onContentUpdate = (html: string, isEmpty: boolean) => {
    setValue("content", html);
    setIsEmpty(isEmpty);
  };

  const onSubmit = handleSubmit((values) => {
    if (isEmpty || !values.content.trim()) return;

    const formData = new FormData();
    formData.append("offer_id", `${values.offer_id}`);
    formData.append("content", values.content);
    values.attachments?.forEach((file) => formData.append("images[]", file));
    mutation.mutate(formData);
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
          <form onSubmit={onSubmit} className="space-y-2">
            <div
              className={`border rounded-2xl transition-all duration-200 ${
                isFocused
                  ? "border-primary shadow-sm bg-background"
                  : "border-neutral-200 bg-neutral-50 hover:bg-background hover:border-neutral-300"
              }`}
            >
              <RichEditor
                onContentUpdate={onContentUpdate}
                onFocusChange={setIsFocused}
                placeholder={placeholder}
                attachments={watch("attachments") ?? []}
                setAttachments={(files) => setValue("attachments", files)}
                isLoading={mutation.isPending}
                onSubmit={onSubmit}
                compact={compact}
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
