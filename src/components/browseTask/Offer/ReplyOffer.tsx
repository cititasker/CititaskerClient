"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatTime } from "@/utils";
import Icons from "@/components/Icons";
import CommentBox from "./CommentBox";
import DOMPurify from "dompurify";

interface IProps {
  offer: ICommenThreadProps | undefined;
  level?: number;
}

const ReplyOffer = ({ offer, level = 0 }: IProps) => {
  const [showComment, setShowComment] = useState(false);

  return (
    <div className="w-full space-y-4">
      <div
        className="p-5 bg-muted rounded-b-[25px] rounded-tr-[25px]"
        style={{ marginLeft: `${level * 30}px` }}
      >
        <div
          className="text-sm mb-2 prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(offer?.content || ""),
          }}
        />
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {offer && <span>{formatTime(offer.created_at)}</span>}
          <Button
            variant="link"
            size="sm"
            className="flex items-center"
            onClick={() => setShowComment((prev) => !prev)}
            aria-expanded={showComment}
          >
            <Icons.reply width={14} height={14} />
            Reply
          </Button>
        </div>
      </div>
      {showComment && offer?.id && <CommentBox offer_id={offer.id} />}

      <div className="space-y-4 w-full">
        {offer?.replies?.map((reply) => (
          <ReplyOffer key={reply.id} offer={reply} level={level + 1} />
        ))}
      </div>
    </div>
  );
};

export default ReplyOffer;
