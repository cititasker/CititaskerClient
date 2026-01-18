import { usePostTask } from "@/services/tasks/tasks.hook";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { API_ROUTES, ROUTES } from "@/constant";
import { errorHandler } from "@/utils";
import { usePurgeData } from "@/utils/dataPurge";
import { useQueryClient } from "@tanstack/react-query";

export const useTaskSubmission = () => {
  const taskMutation = usePostTask();
  const { showSnackbar } = useSnackbar();
  const router = useRouter();
  const { session, user } = useAuth();
  const { purgeTask } = usePurgeData();
  const queryClient = useQueryClient();

  const submitTask = async (formData: FormData, taskId?: string) => {
    if (!session) {
      router.push(
        `/auth/login?redirect=${encodeURIComponent(window.location.href)}`
      );
      return;
    }

    return new Promise<void>((resolve, reject) => {
      taskMutation.mutate(
        { id: taskId, body: formData },
        {
          onSuccess: async (data) => {
            try {
              showSnackbar(data.message, "success");

              await Promise.all([
                queryClient.invalidateQueries({
                  queryKey: [API_ROUTES.USER_TASKS, taskId],
                }),
                queryClient.invalidateQueries({
                  queryKey: [API_ROUTES.TASKS, taskId],
                }),
              ]);

              await purgeTask();

              const baseUrl = `/${user?.role}${ROUTES.MY_TASKS}`;
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
