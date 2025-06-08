"use client";

import React from "react";
import Image from "next/image";
import { useAppSelector } from "@/store/hook";
import { replyOffer } from "@/services/offer";
import { useMutation } from "@tanstack/react-query";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import FormError from "@/components/reusables/FormError";
import Icons from "@/components/Icons";
import { defaultProfile } from "@/constant/images";

const schema = z.object({
  content: z.string().min(1, "Please write your reply"),
  offer_id: z.number().nullable(),
});

type SchemaType = z.infer<typeof schema>;

interface CommentBoxProps {
  item: IOffer;
}

const CommentBox = ({ item }: CommentBoxProps) => {
  const { user } = useAppSelector((state) => state.user);

  const mutation = useMutation({
    mutationFn: replyOffer,
    onSuccess(data) {
      console.log(324, data);
    },
    onError(error) {
      console.log(123, error);
    },
  });

  const methods = useForm<SchemaType>({
    defaultValues: {
      content: "",
      offer_id: item.id ?? null,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<SchemaType> = (values) => {
    mutation.mutate(values);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex gap-4 mt-4"
        noValidate
      >
        <Image
          src={user.profile_image ?? defaultProfile}
          alt="User avatar"
          width={48}
          height={48}
          className="rounded-full object-cover shrink-0"
        />
        <div className="flex flex-col flex-1">
          <Textarea
            placeholder="Reply"
            {...methods.register("content")}
            rows={3}
            className="resize-none"
          />
          <FormError name="content" />
          <div className="flex justify-between items-center mt-2">
            <div className="flex space-x-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    aria-label="Insert emoji"
                  >
                    <Icons.emoji />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Insert emoji</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    aria-label="Attach file"
                  >
                    <Icons.attachment />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Attach file</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    aria-label="Insert link"
                  >
                    <Icons.insertLink />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Insert link</TooltipContent>
              </Tooltip>
            </div>
            <Button size="sm" type="submit" aria-label="Send reply">
              <Icons.send />
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CommentBox;
