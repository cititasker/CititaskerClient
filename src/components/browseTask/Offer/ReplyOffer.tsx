import { formatTime } from "@/utils";
import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import CommentBox from "./CommentBox";
import Icons from "@/components/Icons";

interface IProps {
  offer: IOffer;
}

const ReplyOffer = ({ offer }: IProps) => {
  const [showComment, setShowComment] = useState(false);

  const toggleComment = () => {
    setShowComment((prev) => !prev);
  };
  return (
    <div>
      <div className="w-full  p-5 bg-light-grey rounded-b-[25px] rounded-tr-[25px]">
        <p className="text-sm mb-2">{offer.description}</p>
        <div className="flex items-center gap-2">
          <Typography className="text-dark-grey-2 text-xs">
            {formatTime(offer.created_at)}
          </Typography>
          <Button
            startIcon={<Icons.reply width={10} height={10} />}
            className="text-xs text-primary"
            onClick={toggleComment}
          >
            Reply
          </Button>
        </div>
      </div>
      {showComment && <CommentBox item={offer} />}
    </div>
  );
};

export default ReplyOffer;
