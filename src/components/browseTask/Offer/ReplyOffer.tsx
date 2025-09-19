"use client";

import React, { useState } from "react";
import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatTime } from "@/utils";
import CommentBox from "./CommentBox";
import DOMPurify from "dompurify";

interface ReplyOfferProps {
  offer: ICommenThreadProps | undefined;
  level?: number;
}

const ReplyOffer: React.FC<ReplyOfferProps> = ({ offer, level = 0 }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (!offer) return null;

  const handleReplyClick = () => {
    setShowReplyBox(!showReplyBox);
  };

  return (
    <div className="w-full space-y-2">
      {/* Main Comment */}
      <div
        className="group"
        style={{ marginLeft: `${level * 24}px` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          {/* Comment Bubble */}
          <div className="bg-neutral-50 hover:bg-neutral-100 rounded-2xl rounded-tl-md p-4 transition-colors">
            <div
              className="text-text-primary text-sm leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(offer.content || ""),
              }}
            />
          </div>

          {/* Actions Bar */}
          <div className="flex items-center gap-2 mt-1 pl-2">
            <span className="text-xs text-text-muted">
              {formatTime(offer.created_at)}
            </span>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleReplyClick}
              className={`h-6 px-2 text-xs text-text-muted hover:text-primary hover:bg-primary-50 transition-all ${
                showReplyBox ? "text-primary bg-primary-50" : ""
              }`}
            >
              <MessageCircle className="w-3 h-3 mr-1" />
              Reply
            </Button>
          </div>
        </div>
      </div>

      {/* Reply Input */}
      {showReplyBox && (
        <div style={{ marginLeft: `${(level + 1) * 24}px` }}>
          <CommentBox
            offer_id={offer.id}
            onSuccess={() => setShowReplyBox(false)}
            placeholder="Write a reply..."
            // compact
          />
        </div>
      )}

      {/* Nested Replies */}
      {offer.replies && offer.replies.length > 0 && (
        <div className="space-y-2">
          {offer.replies.map((reply) => (
            <ReplyOffer key={reply.id} offer={reply} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReplyOffer;
