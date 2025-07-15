import React, { useMemo } from "react";
import ReplyOffer from "./ReplyOffer";
import { IOfferReplies } from "@/services/offers/offers.types";

interface IProps {
  offer: IOfferReplies | undefined;
}
export default function CommentThread({ offer }: IProps) {
  const comment = useMemo(() => {
    if (offer) {
      const { description, ...rest } = offer;
      return {
        content: description,
        ...rest,
      };
    }
    return undefined;
  }, [offer]) as ICommenThreadProps | undefined;

  return <ReplyOffer offer={comment} />;
}
