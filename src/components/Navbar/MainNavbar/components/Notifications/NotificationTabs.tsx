import React, { memo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { NotificationItem } from "./types";
import NotificationList from "./NotificationList";
import FormButton from "@/components/forms/FormButton";

interface NotificationTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  notifications: NotificationItem[];
  unreadNotifications: NotificationItem[];
  unreadCount: number;
  markAllAsRead: () => void;
  markAsRead: (id: string) => void;
  deleteNotification: (id: string, e: React.MouseEvent) => void;
  isMarkingAllAsRead: boolean;
  loadingStates: {
    markingAsRead: string | null;
    deleting: string | null;
  };
}

const NotificationTabs = memo(function NotificationTabs({
  activeTab,
  setActiveTab,
  notifications,
  unreadNotifications,
  unreadCount,
  markAllAsRead,
  markAsRead,
  deleteNotification,
  isMarkingAllAsRead,
  loadingStates,
}: NotificationTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex items-center justify-between px-5 py-2 border-b bg-white">
        <TabsList className="bg-gray-100 p-1 rounded-lg h-9 w-fit">
          <TabsTrigger
            value="all"
            className="text-xs font-medium rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="unread"
            className="text-xs font-medium rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Unread
            {unreadCount > 0 && (
              <Badge className="ml-1.5 h-4 px-1.5 bg-red-500 text-white text-[10px]">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {unreadCount > 0 && (
          <FormButton
            variant="ghost"
            size="sm"
            onClick={markAllAsRead}
            className="h-8 text-xs text-primary hover:text-primary hover:bg-primary/10 font-medium"
            disabled={isMarkingAllAsRead}
            icon={<CheckCheck className="w-3.5 h-3.5" />}
            loading={isMarkingAllAsRead}
          >
            Mark all read
          </FormButton>
        )}
      </div>

      <TabsContent value="all" className="m-0">
        <NotificationList
          notifications={notifications}
          markAsRead={markAsRead}
          deleteNotification={deleteNotification}
          loadingStates={loadingStates}
        />
      </TabsContent>
      <TabsContent value="unread" className="m-0">
        <NotificationList
          notifications={unreadNotifications}
          markAsRead={markAsRead}
          deleteNotification={deleteNotification}
          loadingStates={loadingStates}
        />
      </TabsContent>
    </Tabs>
  );
});

export default NotificationTabs;
