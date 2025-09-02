"use client";

import React from "react";
import Image from "next/image";
import { useAppSelector } from "@/store/hook";
import { replyOffer } from "@/services/offer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { defaultProfile } from "@/constant/images";
import { API_ROUTES } from "@/constant";
import { useSnackbar } from "@/providers/SnackbarProvider";
import FormError from "@/components/reusables/FormError";
import RichEditor from "./RichEditor";

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
  offer_id?: number | undefined;
  parentId?: number | null;
  onSuccess?: () => void;
}

const CommentBox = ({ offer_id }: CommentBoxProps) => {
  const { user } = useAppSelector((state) => state.user);
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

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
      showSnackbar(data.message, "success");
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.OFFER_REPLIES, offer_id],
      });
    },
    onError(error: any) {
      console.error("Reply failed", error);
      showSnackbar(error.message, "error");
    },
  });

  // Update form content from editor
  const onEditorContentUpdate = (html: string) => {
    setValue("content", html);
  };

  const onSubmit = handleSubmit((values: SchemaType) => {
    console.log(11, values);
    const { attachments, content, offer_id } = values;
    const formData = new FormData();
    formData.append("offer_id", `${offer_id}`);
    formData.append("content", `${content}`);
    attachments?.forEach((file) => formData.append("images[]", file));
    mutation.mutate(formData);
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="flex w-full " noValidate>
        <div className="w-full flex gap-3 sm:gap-4">
          <Image
            src={user.profile_image ?? defaultProfile}
            alt="User avatar"
            width={48}
            height={48}
            className="rounded-full object-cover shrink-0 h-6 w-6 sm:h-[48px] sm:w-[48px] object-top"
          />

          <div className="flex-1 min-w-0 relative max-w-full">
            <RichEditor
              onContentUpdate={onEditorContentUpdate}
              isLoading={mutation.isPending}
              setAttachments={(files) => setValue("attachments", files)}
              attachments={watch("attachments") ?? []}
            />
            <FormError name="content" />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CommentBox;
