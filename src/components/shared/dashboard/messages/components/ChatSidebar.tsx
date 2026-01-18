"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { IConversation } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils";
import { SearchBar } from "@/components/browseTask/SearchBar";

interface ChatSidebarProps {
  conversations: IConversation[];
  activeConversationId?: string;
  baseUrl?: string;
}

const TABS = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
  { key: "archive", label: "Archive" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  conversations,
  activeConversationId,
  baseUrl = "/messages",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<TabKey>("all");

  const filteredConversations = useMemo(() => {
    return conversations
      .filter(
        (conv) =>
          conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((conv) => {
        switch (activeTab) {
          case "unread":
            return conv.unreadCount && conv.unreadCount > 0;
          case "archive":
            return false; // TODO: Add archive logic
          default:
            return true;
        }
      });
  }, [conversations, searchTerm, activeTab]);

  const unreadCount = conversations.filter(
    (c) => c.unreadCount && c.unreadCount > 0
  ).length;

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
        <Search size={24} className="text-neutral-400" />
      </div>
      <p className="text-sm text-neutral-600 text-center">
        {searchTerm ? "No conversations found" : "No conversations yet"}
      </p>
      {searchTerm && (
        <p className="text-xs text-neutral-500 mt-1">
          Try adjusting your search terms
        </p>
      )}
    </div>
  );

  const renderConversation = (conversation: IConversation) => {
    const isActive = activeConversationId === conversation.id;

    return (
      <Link
        key={conversation.id}
        href={`${baseUrl}/${conversation.id}`}
        className={`block p-3 rounded-xl transition-all duration-200 group ${
          isActive
            ? "bg-primary-50 border border-primary-200"
            : "hover:bg-neutral-50 border border-transparent"
        }`}
      >
        <div className="flex items-start space-x-3">
          {/* Avatar */}
          <div className="relative">
            <Avatar className=" h-12 w-12 ring-2 ring-white shadow-sm">
              <AvatarImage
                src={conversation.avatar}
                alt={conversation.name}
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-primary text-white font-semibold text-sm">
                {getInitials(conversation.name)}
              </AvatarFallback>
            </Avatar>
            {conversation.isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-success rounded-full border-2 border-white" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3
                className={`font-semibold text-sm truncate ${
                  isActive
                    ? "text-primary-800"
                    : "text-neutral-800 group-hover:text-primary-700"
                }`}
              >
                {conversation.name}
              </h3>
              <span className="text-xs text-neutral-500 flex-shrink-0 ml-2">
                {conversation.timestamp}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs text-neutral-600 truncate mr-2">
                {conversation.lastMessage}
              </p>
              {conversation.unreadCount && conversation.unreadCount > 0 && (
                <div className="flex-shrink-0 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-white">
                    {conversation.unreadCount > 9
                      ? "9+"
                      : conversation.unreadCount}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border-light">
        <h2 className="text-xl font-semibold text-neutral-800 mb-4">Chats</h2>

        {/* Search */}
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          autoFocus
          className="mb-4"
          placeholder="Search conversations..."
        />
      </div>

      {/* Tabs */}
      <div className="px-4 py-3 border-b border-border-light">
        <div className="flex space-x-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center space-x-1 ${
                activeTab === tab.key
                  ? "bg-primary-50 text-primary-700"
                  : "text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50"
              }`}
            >
              <span>{tab.label}</span>
              {tab.key === "unread" && unreadCount > 0 && (
                <span className="text-xs bg-success text-white rounded-full px-1.5 py-0.5">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          renderEmptyState()
        ) : (
          <div className="p-2 space-y-1">
            {filteredConversations.map(renderConversation)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
