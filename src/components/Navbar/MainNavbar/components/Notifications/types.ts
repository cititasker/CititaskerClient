export interface NotificationItem {
  id: string;
  user_id?: string;
  type?: string;
  message: string;
  created_at: string;
  read_at?: string | null;
  read: boolean;
  data?: any;
}

export function transformNotification(apiNotification: any): NotificationItem {
  return {
    id: apiNotification.id,
    user_id: apiNotification.user_id,
    type: apiNotification.type,
    message: apiNotification.message || "New notification",
    created_at: apiNotification.created_at,
    read_at: apiNotification.read_at,
    read: apiNotification.is_read || !!apiNotification.read_at,
    data: {
      // Preserve all backend data
      ...apiNotification.data,
      title: apiNotification.title,
      icon: apiNotification.icon,
      priority: apiNotification.priority,
      action_url: apiNotification.action_url,
      created_at_human: apiNotification.created_at_human,
    },
  };
}
