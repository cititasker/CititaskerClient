"use client";

import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { EMOJI_DATA } from "./attachment-preview/constants";

interface EmojiPickerProps {
  onSelect: (emoji: { native: string }) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Frequently Used");

  const filteredEmojis = useMemo(() => {
    if (!searchTerm) {
      return EMOJI_DATA[selectedCategory as keyof typeof EMOJI_DATA] || [];
    }

    // Search across all categories
    const allEmojis = Object.values(EMOJI_DATA).flat();
    const searchLower = searchTerm.toLowerCase();

    return allEmojis.filter((emojiData) => {
      return (
        emojiData.name.toLowerCase().includes(searchLower) ||
        emojiData.keywords.some((keyword) =>
          keyword.toLowerCase().includes(searchLower)
        ) ||
        emojiData.emoji.includes(searchTerm)
      );
    });
  }, [searchTerm, selectedCategory]);

  const handleEmojiClick = (emojiData: any) => {
    onSelect({ native: emojiData.emoji });
  };

  return (
    <div className="w-80 bg-white border border-neutral-200 rounded-xl shadow-xl">
      <div className="p-4">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search emojis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            autoFocus
          />
        </div>

        {/* Categories */}
        {!searchTerm && (
          <div className="flex gap-1 mb-4 overflow-x-auto pb-2 no-scrollbar">
            {Object.keys(EMOJI_DATA).map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors",
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-neutral-100 text-text-secondary hover:bg-neutral-200"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Search Results Header */}
        {searchTerm && (
          <div className="mb-3">
            <p className="text-sm text-text-muted">
              {filteredEmojis.length} result
              {filteredEmojis.length !== 1 ? "s" : ""} for "{searchTerm}"
            </p>
          </div>
        )}

        {/* Emoji Grid */}
        <div className="grid grid-cols-8 gap-1 max-h-64 overflow-y-auto">
          {filteredEmojis.map((emojiData, index) => (
            <button
              key={`${emojiData.emoji}-${index}`}
              type="button"
              onClick={() => handleEmojiClick(emojiData)}
              className="p-2 text-lg hover:bg-neutral-100 rounded-lg transition-colors flex items-center justify-center"
              title={emojiData.name}
            >
              {emojiData.emoji}
            </button>
          ))}
        </div>

        {/* No Results */}
        {filteredEmojis.length === 0 && searchTerm && (
          <div className="text-center py-8 text-text-muted">
            <p className="text-sm">No emojis found for "{searchTerm}"</p>
            <p className="text-xs mt-1">Try a different search term</p>
          </div>
        )}

        {/* Empty State */}
        {filteredEmojis.length === 0 && !searchTerm && (
          <div className="text-center py-8 text-text-muted">
            <p className="text-sm">No emojis in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmojiPicker;
