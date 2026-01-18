// import { COMMENT_LIMITS } from "./constants";

export const getIndentationClass = (level: number): string => {
  const indentMap: Record<number, string> = {
    0: "ml-0",
    1: "ml-4 sm:ml-8",
    2: "ml-8 sm:ml-16",
    3: "ml-12 sm:ml-24",
  };
  return indentMap[level] || indentMap[3];
};

// export const canReply = (level: number): boolean =>
//   level < COMMENT_LIMITS.MAX_NESTING_LEVEL;

// export const getAvatarSize = (level: number): "sm" | "md" | "lg" => {
//   if (level === 0) return "md";
//   if (level === 1) return "sm";
//   return "sm";
// };

import { cn } from "@/lib/utils";

/**
 * Thread utility functions for comment threading system
 */

// Maximum nesting level for replies
export const MAX_THREAD_DEPTH = 1;

// Visual configuration
export const THREAD_CONFIG = {
  maxDepth: 1,
  collapseDepth: 2, // Auto-collapse threads deeper than this
  mobileCollapseDepth: 1, // More aggressive collapsing on mobile
  avatarSizes: {
    0: "md", // Root comment
    1: "sm", // First level reply
  },
  indentSizes: {
    mobile: "0.75rem", // 12px
    tablet: "1rem", // 16px
    desktop: "1.5rem", // 24px
  },
} as const;

type AvatarSizes = "sm" | "md" | "lg" | undefined;

export const getAvatarSize = (level: number): AvatarSizes => {
  return THREAD_CONFIG.avatarSizes[
    Math.min(level, 3) as keyof typeof THREAD_CONFIG.avatarSizes
  ];
};

/**
 * Check if replies are allowed at this depth
 */
export const canReply = (level: number): boolean => {
  return level < MAX_THREAD_DEPTH;
};

/**
 * Get indentation classes for thread nesting
 */
export const getThreadIndentClass = (level: number): string => {
  if (level === 0) return "";

  return cn(
    "ml-3 sm:ml-6 md:ml-8",
    // "border-l border-neutral-200",
    "pl-3 sm:pl-4 md:pl-6",
    level > 2 && "ml-2 sm:ml-4 md:ml-6 pl-2 sm:pl-3 md:pl-4"
  );
};

/**
 * Calculate total reply count recursively
 */
export const calculateReplyCount = (comments: CommentThreadT[]): number => {
  return comments.reduce((count, comment) => {
    const directReplies = comment.replies?.length || 0;
    const nestedReplies = comment.replies
      ? calculateReplyCount(comment.replies)
      : 0;
    return count + directReplies + nestedReplies;
  }, 0);
};

/**
 * Get thread depth styling classes
 */
export const getThreadDepthClass = (level: number): string => {
  const depthClasses = {
    0: "thread-root",
    1: "thread-level-1",
    2: "thread-level-2",
    3: "thread-level-3",
  };

  const key = Math.min(level, 3) as keyof typeof depthClasses;
  return depthClasses[key];
};

/**
 * Determine if thread should be collapsed by default
 */
export const shouldAutoCollapse = (
  level: number,
  isMobile: boolean = false
): boolean => {
  const threshold = isMobile
    ? THREAD_CONFIG.mobileCollapseDepth
    : THREAD_CONFIG.collapseDepth;
  return level >= threshold;
};

/**
 * Format comment timestamp
 */
export const formatCommentTime = (timestamp: string | Date): string => {
  const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString();
};

/**
 * Get user display name from comment
 */
export const getUserDisplayName = (comment: CommentThreadT): string => {
  if (!comment.user) return "Anonymous User";

  const firstName = comment.user.first_name?.trim() || "";
  const lastName = comment.user.last_name?.trim() || "";

  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }

  return firstName || lastName || "Anonymous User";
};

/**
 * Get user initials for avatar fallback
 */
export const getUserInitials = (comment: CommentThreadT): string => {
  const displayName = getUserDisplayName(comment);

  if (displayName === "Anonymous User") return "?";

  const names = displayName.split(" ");
  if (names.length >= 2) {
    return `${names[0][0]}${names[1][0]}`.toUpperCase();
  }

  return names[0]?.charAt(0)?.toUpperCase() || "?";
};
