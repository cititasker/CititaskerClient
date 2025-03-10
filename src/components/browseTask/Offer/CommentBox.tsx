import Icons from "@/components/Icons";
import FormError from "@/components/reusables/FormError";
import { defaultProfile } from "@/constant/images";
import { replyOffer } from "@/services/offer";
import { useAppSelector } from "@/store/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconButton } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  content: z.string().min(1, "Please write your reply"),
  offer_id: z.number().nullable(),
});
type schemaType = z.infer<typeof schema>;

const CommentBox = ({ item }: { item: IOffer }) => {
  const { user } = useAppSelector((state) => state.user);
  const postCommentMutation = useMutation({
    mutationFn: replyOffer,
    onSuccess(data) {
      console.log(324, data);
    },
    onError(error) {
      console.log(123, error);
    },
  });
  const methods = useForm<schemaType>({
    defaultValues: {
      content: "",
      offer_id: item.id ?? null,
    },
    resolver: zodResolver(schema),
  });
  const { handleSubmit, register } = methods;
  const onSubmit: SubmitHandler<schemaType> = (values) => {
    postCommentMutation.mutate(values);
  };
  return (
    <FormProvider {...methods}>
      <div className="flex gap-4 mt-4">
        <Image
          src={user.profile_image ?? defaultProfile}
          alt=""
          width={60}
          height={60}
          className="rounded-full shrink-0 object-cover w-[60px] h-[60px]"
        />
        <div className="w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full pt-4 pb-1 px-5 bg-light-primary-1 rounded-[10px]"
          >
            <textarea
              placeholder="Reply"
              {...register("content")}
              className="focus:outline-none bg-transparent w-full resize-none text-sm"
            ></textarea>
            <div className="flex justify-between items-center gap-2 w-full">
              <div className="flex items-center gap-2">
                <IconButton>
                  <Icons.emoji />
                </IconButton>
                <IconButton>
                  <Icons.attachment />
                </IconButton>
                <IconButton>
                  <Icons.insertLink />
                </IconButton>
              </div>
              <IconButton size="small" type="submit">
                <Icons.send />
              </IconButton>
            </div>
          </form>
          <FormError name="content" />
        </div>
      </div>
    </FormProvider>
  );
};

export default CommentBox;
