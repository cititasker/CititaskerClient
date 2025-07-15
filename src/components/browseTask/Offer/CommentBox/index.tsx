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
import { Loader } from "lucide-react";
import { useSnackbar } from "@/providers/SnackbarProvider";
import FormError from "@/components/reusables/FormError";

import RichEditor from "./RichEditor";
import { ISend2 } from "@/constant/icons";

const schema = z.object({
  content: z.string().min(1, "Please write your reply"),
  offer_id: z.number().nullable(),
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
    },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, setValue, reset } = methods;

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

  const onSubmit = handleSubmit((values) => {
    mutation.mutate(values);
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="flex gap-4 mt-4" noValidate>
        <Image
          src={user.profile_image ?? defaultProfile}
          alt="User avatar"
          width={48}
          height={48}
          className="rounded-full object-cover shrink-0 h-[48px] w-[48px] object-top"
        />

        <div className="flex flex-col flex-1 relative">
          <RichEditor onContentUpdate={onEditorContentUpdate} />
          <FormError name="content" />
        </div>
      </form>
    </FormProvider>
  );
};

export default CommentBox;
