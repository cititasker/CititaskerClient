"use client";

import React from "react";
import Image from "next/image";
import { Share2, Copy, Link } from "lucide-react";

import CustomModal from "@/components/reusables/CustomModal";
import { Button } from "@/components/ui/button";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { SocialPlatform, socialPlatforms } from "./VerifyModal/constant";

interface ShareTaskModalProps {
  open: boolean;
  onClose: () => void;
  taskId?: string;
  taskTitle?: string;
}

const SocialButton = ({
  platform,
  onClick,
}: {
  platform: SocialPlatform;
  onClick: () => void;
}) => (
  <Button
    variant="outline"
    size="icon"
    onClick={onClick}
    className={`w-14 h-14 rounded-xl border-2 border-neutral-200 transition-all duration-200 ${platform.color}`}
    title={`Share on ${platform.name}`}
  >
    <Image
      src={platform.icon}
      alt={platform.name}
      width={24}
      height={24}
      className="w-6 h-6"
    />
  </Button>
);

const CopyLinkSection = ({
  taskUrl,
  onCopy,
}: {
  taskUrl: string;
  onCopy: () => void;
}) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 text-text-secondary">
      <Link className="w-4 h-4" />
      <span className="text-sm font-medium">Copy Link</span>
    </div>

    <div className="flex items-center gap-2">
      <div className="flex-1 p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
        <p className="text-sm text-text-muted truncate">{taskUrl}</p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onCopy}
        className="flex-shrink-0 px-4"
      >
        <Copy className="w-4 h-4 mr-2" />
        Copy
      </Button>
    </div>
  </div>
);

const ShareTaskModal: React.FC<ShareTaskModalProps> = ({
  open,
  onClose,
  taskId = "",
  taskTitle = "Check out this task",
}) => {
  const { showSnackbar } = useSnackbar();

  const taskUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/tasks/${taskId}`
      : "";

  const shareText = `${taskTitle} - Find great tasks on our platform!`;

  const handleSocialShare = (platform: SocialPlatform) => {
    const shareUrl = platform.shareUrl(taskUrl, shareText);
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(taskUrl);
      showSnackbar("Link copied to clipboard!", "success");
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = taskUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      showSnackbar("Link copied to clipboard!", "success");
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: taskTitle,
          text: shareText,
          url: taskUrl,
        });
      } catch (error) {
        // User cancelled or error occurred
        console.log(error);
      }
    }
  };

  return (
    <CustomModal
      isOpen={open}
      onClose={onClose}
      contentClassName="max-w-md mx-auto"
    >
      <div className="space-y-6 p-2">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <Share2 className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-text-primary">
            Share this task
          </h2>
          <p className="text-text-muted">
            Spread the word about this task on your social media
          </p>
        </div>

        {/* Social Media Buttons */}
        <div>
          <div className="flex justify-center gap-3 mb-6">
            {socialPlatforms.map((platform) => (
              <SocialButton
                key={platform.name}
                platform={platform}
                onClick={() => handleSocialShare(platform)}
              />
            ))}
          </div>

          {/* Native Share Button (Mobile) */}
          {typeof window !== "undefined" &&
            typeof navigator.share === "function" && (
              <div className="text-center mb-6">
                <Button
                  variant="outline"
                  onClick={handleNativeShare}
                  className="w-full sm:w-auto"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share via device
                </Button>
              </div>
            )}
        </div>

        {/* Copy Link Section */}
        <div className="border-t border-neutral-200 pt-6">
          <CopyLinkSection taskUrl={taskUrl} onCopy={handleCopyLink} />
        </div>
      </div>
    </CustomModal>
  );
};

export default ShareTaskModal;
