import { usPostTask } from "@/services/tasks/tasks.hook";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { queryClient } from "@/providers/ServerProvider";
import { API_ROUTES, ROUTES } from "@/constant";
import { errorHandler } from "@/utils";
import { usePurgeData } from "@/utils/dataPurge";

export const useTaskSubmission = () => {
  const taskMutation = usPostTask();
  const { showSnackbar } = useSnackbar();
  const router = useRouter();
  const { data: session } = useSession();
  const { purgeTask } = usePurgeData();

  const submitTask = async (formData: FormData, taskId?: string) => {
    if (!session) {
      router.push(
        `/login?redirect=${encodeURIComponent(window.location.href)}`
      );
      return;
    }

    return new Promise<void>((resolve, reject) => {
      taskMutation.mutate(
        { id: taskId, body: formData },
        {
          onSuccess: async (data) => {
            try {
              // Show success message
              showSnackbar(data.message, "success");

              // Invalidate relevant queries
              await Promise.all([
                queryClient.invalidateQueries({
                  queryKey: [API_ROUTES.GET_USER_TASK, taskId],
                }),
                queryClient.invalidateQueries({
                  queryKey: [API_ROUTES.GET_TASK_BY_ID, taskId],
                }),
              ]);

              // Reset task creation state
              await purgeTask();

              // Navigate to appropriate page
              const baseUrl = `/${session.user.role}/${ROUTES.MY_TASKS}`;
              const url = taskId ? `${baseUrl}/${taskId}` : baseUrl;
              router.push(url);

              resolve();
            } catch (error) {
              console.error("Error in success handler:", error);
              reject(error);
            }
          },
          onError: (error) => {
            const errorMessage = errorHandler(error);
            showSnackbar(errorMessage, "error");
            reject(error);
          },
        }
      );
    });
  };

  return {
    submitTask,
    isLoading: taskMutation.isPending,
    error: taskMutation.error,
  };
};
