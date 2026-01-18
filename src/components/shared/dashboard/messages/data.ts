import { IConversation, IMessage } from "./types";

export const mockConversations: IConversation[] = [
  {
    id: "1",
    name: "Saraki Bikola",
    lastMessage: "Tomorrow will be preferable...",
    timestamp: "09:00 am",
    unreadCount: 2,
    isOnline: true,
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "2",
    name: "Serena Akpan Clara",
    lastMessage: "Hi Judith I will be at the location by 3pm today...",
    timestamp: "10:32 am",
    isOnline: true,
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: "3",
    name: "Mohammed Zainab",
    lastMessage: "See you today",
    timestamp: "11:33 am",
    unreadCount: 1,
    isOnline: false,
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: "4",
    name: "Chidozie Okonkwo",
    lastMessage: "Alright...",
    timestamp: "12:28 am",
    unreadCount: 1,
    isOnline: true,
    avatar: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: "5",
    name: "Samson Okonola",
    lastMessage: "Thank you",
    timestamp: "01:43 pm",
    unreadCount: 1,
    isOnline: true,
    avatar: "https://i.pravatar.cc/150?img=10",
  },
  {
    id: "6",
    name: "Zainab Musa",
    lastMessage: "Please share the address...",
    timestamp: "02:00 pm",
    unreadCount: 1,
    isOnline: false,
    avatar: "https://i.pravatar.cc/150?img=16",
  },
];

export const mockMessages: Record<string, IMessage[]> = {
  "1": [
    {
      id: "1",
      content: "Hi there! How are you doing today?",
      sender: "other",
      timestamp: new Date("2024-01-15T09:00:00"),
      senderName: "Saraki Bikola",
      senderAvatar: "https://i.pravatar.cc/150?img=12",
      status: "read",
    },
    {
      id: "2",
      content: "I'm doing great, thanks for asking! How about you?",
      sender: "user",
      timestamp: new Date("2024-01-15T09:05:00"),
      status: "unread",
    },
    {
      id: "3",
      content:
        "Tomorrow will be preferable for the meeting. What time works for you?",
      sender: "other",
      timestamp: new Date("2024-01-15T09:10:00"),
      senderName: "Saraki Bikola",
      senderAvatar: "https://i.pravatar.cc/150?img=12",
      status: "read",
    },
  ],
  "2": [
    {
      id: "1",
      content:
        "Hi Judith! I will be at the location by 3pm today. Is that okay?",
      sender: "other",
      timestamp: new Date("2024-01-15T10:32:00"),
      senderName: "Serena Akpan Clara",
      senderAvatar: "https://i.pravatar.cc/150?img=23",
      status: "unread",
    },
    {
      id: "2",
      content: "That sounds perfect! See you then.",
      sender: "user",
      timestamp: new Date("2024-01-15T10:35:00"),
      status: "read",
    },
  ],
};
