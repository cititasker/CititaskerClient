export interface IMessage {
  id: string;
  content: string;
  sender: "user" | "other";
  timestamp: Date;
  status: string;
  senderName?: string;
  senderAvatar?: string;
}

export interface IConversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  avatar?: string;
  unreadCount?: number;
  isOnline: boolean;
}

export interface FilePreview {
  id: string;
  file: File;
  type: "image" | "video" | "document" | "contact" | "audio";
  url?: string;
  name: string;
}

export interface AttachmentOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  accept: string;
  type: "image" | "video" | "document" | "contact";
  color: string;
}
