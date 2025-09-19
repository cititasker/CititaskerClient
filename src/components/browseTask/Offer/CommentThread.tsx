import React, { useMemo } from "react";
import ReplyOffer from "./ReplyOffer";
import { IOfferReplies } from "@/services/offers/offers.types";

interface CommentThreadProps {
  offer: IOfferReplies | undefined;
}

const CommentThread: React.FC<CommentThreadProps> = ({ offer }) => {
  const comment = useMemo(() => {
    if (!offer) return undefined;

    const { description, ...rest } = offer;
    return {
      content: description,
      ...rest,
    };
  }, [offer]) as ICommenThreadProps | undefined;

  return <ReplyOffer offer={comment} />;
};

export default CommentThread;
