import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reorderFaqs } from "@/services/user/users.api";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { API_ROUTES } from "@/constant";
import { useCallback, useState } from "react";

export const useReorderFaqs = (userId: string) => {
  const [reorderedFaqs, setReorderedFaqs] = useState<UserFaq[]>([]);
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  const reorderMutation = useMutation({
    mutationFn: reorderFaqs,
    onSuccess: () => {
      showSnackbar("FAQ order updated successfully", "success");
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.GET_FAQ, userId],
      });
      setReorderedFaqs([]);
    },
    onError: (error: any) => {
      showSnackbar(error.message || "Failed to update FAQ order", "error");
    },
  });

  const handleSaveReorder = useCallback(() => {
    if (!reorderedFaqs.length) {
      showSnackbar("No changes to save", "info");
      return;
    }

    const payload = reorderedFaqs.map((faq, index) => ({
      id: faq.id,
      order: index + 1,
    }));

    reorderMutation.mutate({ userId, faqs: payload });
  }, [reorderedFaqs, reorderMutation, showSnackbar, userId]);

  const resetReorderedFaqs = useCallback(() => {
    setReorderedFaqs([]);
  }, []);

  return {
    reorderedFaqs,
    setReorderedFaqs,
    handleSaveReorder,
    resetReorderedFaqs,
    isSaving: reorderMutation.isPending,
  };
};
