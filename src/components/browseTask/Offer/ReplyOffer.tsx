"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatTime } from "@/utils";
import CommentBox from "./CommentBox";
import Icons from "@/components/Icons";

interface IProps {
  offer: IOffer;
}

const ReplyOffer = ({ offer }: IProps) => {
  const [showComment, setShowComment] = useState(false);

  return (
    <div>
      <div className="w-full p-5 bg-muted rounded-b-[25px] rounded-tr-[25px]">
        <p className="text-sm mb-2">{offer.description}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{formatTime(offer.created_at)}</span>
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
      {showComment && <CommentBox item={offer} />}
    </div>
  );
};

export default ReplyOffer;
