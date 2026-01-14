import { API_ROUTES } from "@/constant";
import { api } from "@/lib/api-client";

export interface NotificationData {
  id: string;
  type: string;
  title: string;
  message: string;
  icon: string;
  priority: string;
  is_read: boolean;
  read_at: string | null;
  created_at: string;
  created_at_human: string;
  action_url: string;
  data: {
    message?: string;
    title?: string;
    task_name?: string;
    tasker_name?: string;
    agreed_date?: string;
    agreed_time?: string;
    proposed_date?: string;
    proposed_time?: string;
    requested_date?: string;
    requested_time?: string;
    [key: string]: any;
  };
}

export interface NotificationsResponse {
  data: {
    data: NotificationData[];
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}

export const notificationsApi = {
  getNotifications: async (params?: { page?: number; per_page?: number }) => {
    const response = await api.get<NotificationsResponse>(
      API_ROUTES.NOTIFICATIONS.GET_ALL,
      { params: { per_page: 10, page: 1, ...params } }
    );
    return response.data;
  },

  // getUnreadNotifications: async () => {
  //   const response = await api.get<NotificationsResponse>(
  //     API_ROUTES.NOTIFICATIONS.UNREAD
  //   );
  //   return response.data;
  // },

  markAsRead: async (id: string) => {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  },

  markAllAsRead: async () => {
    const response = await api.put("/notifications/read-all");
    return response.data;
  },

  deleteNotification: async (id: string) => {
    const response = await api.delete(`/notifications/${id}`);
    return response.data;
  },

  deleteAllRead: async () => {
    const response = await api.delete("/notifications/read/all");
    return response.data;
  },
};
