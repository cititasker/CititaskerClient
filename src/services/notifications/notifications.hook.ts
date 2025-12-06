import { useBaseQuery } from "@/hooks/useBaseQuery";
import { useBaseMutation } from "@/hooks/useBaseMutation";
import { API_ROUTES } from "@/constant";
import { notificationsApi } from "./notifications.api";

// Fetch all notifications
export function useNotifications(params?: {
  page?: number;
  per_page?: number;
}) {
  return useBaseQuery(
    [API_ROUTES.NOTIFICATIONS.GET_ALL, params],
    () => notificationsApi.getNotifications(params),
    {
      queryOptions: {
        staleTime: 1 * 60 * 1000,
      },
    }
  );
}

// Fetch unread notifications
// export function useUnreadNotifications() {
//   return useBaseQuery(
//     [API_ROUTES.NOTIFICATIONS.UNREAD],
//     notificationsApi.getUnreadNotifications,
//     {
//       queryOptions: {
//         staleTime: 30 * 1000, // 30 seconds
//       },
//     }
//   );
// }

// Mark notification as read
export function useMarkAsRead() {
  return useBaseMutation((id: string) => notificationsApi.markAsRead(id), {
    invalidateQueryKeys: [
      [API_ROUTES.NOTIFICATIONS.GET_ALL],
      [API_ROUTES.NOTIFICATIONS.UNREAD],
    ],
    disableSuccessToast: true,
  });
}

// Mark all as read
export function useMarkAllAsRead() {
  return useBaseMutation(notificationsApi.markAllAsRead, {
    invalidateQueryKeys: [
      [API_ROUTES.NOTIFICATIONS.GET_ALL],
      [API_ROUTES.NOTIFICATIONS.UNREAD],
    ],
    successMessage: "All notifications marked as read",
  });
}

// Delete notification
export function useDeleteNotification() {
  return useBaseMutation(
    (id: string) => notificationsApi.deleteNotification(id),
    {
      invalidateQueryKeys: [
        [API_ROUTES.NOTIFICATIONS.GET_ALL],
        [API_ROUTES.NOTIFICATIONS.UNREAD],
      ],
      successMessage: "Notification deleted",
    }
  );
}

// Delete all read
export function useDeleteAllRead() {
  return useBaseMutation(notificationsApi.deleteAllRead, {
    invalidateQueryKeys: [
      [API_ROUTES.NOTIFICATIONS.GET_ALL],
      [API_ROUTES.NOTIFICATIONS.UNREAD],
    ],
    successMessage: "All read notifications deleted",
  });
}
