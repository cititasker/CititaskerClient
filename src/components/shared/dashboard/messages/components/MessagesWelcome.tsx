"use client";

import React, { useEffect, useState } from "react";
import { MessageCircle, Search, Clock, ShieldCheck } from "lucide-react";

const MessagesWelcome: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  // On large screens, we don't show this page (because conversation view appears)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="text-center max-w-lg">
        {/* Hero Icon */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-full bg-gradient-primary flex items-center justify-center shadow-lg">
          <MessageCircle
            className="w-10 h-10 sm:w-12 sm:h-12 text-white"
            strokeWidth={1.5}
          />
        </div>

        {/* Title & Description */}
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800 mb-4">
          Welcome to Messages
        </h2>
        <p className="text-neutral-600 leading-relaxed mb-8 text-sm sm:text-base">
          Select a conversation from the sidebar to start chatting with your
          contacts. Your conversations will appear in this area.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
            <Search className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-xs text-neutral-600 font-medium">Quick Search</p>
          </div>
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
            <ShieldCheck className="w-6 h-6 text-secondary mx-auto mb-2" />
            <p className="text-xs text-neutral-600 font-medium">
              Secure Messaging
            </p>
          </div>
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
            <Clock className="w-6 h-6 text-accent-purple mx-auto mb-2" />
            <p className="text-xs text-neutral-600 font-medium">
              Message History
            </p>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-primary-200 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-primary-700 text-xs font-bold">💡</span>
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-primary-800 mb-1">
                Pro Tip
              </p>
              <p className="text-xs text-primary-700">
                Use the search bar to quickly find specific conversations or
                messages
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesWelcome;
