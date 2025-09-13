import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { arrayMove } from "@dnd-kit/sortable";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { useGetFaq } from "@/services/user/user.hook";
import { deleteFaq } from "@/services/user/users.api";
import useModal from "@/hooks/useModal";
import { API_ROUTES } from "@/constant";

export function useFAQListManager(
  userId: string | number,
  onReorder?: (faqs: UserFaq[]) => void
) {
  const [faqs, setFaqs] = useState<UserFaq[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deletingFaqId, setDeletingFaqId] = useState<string | number | null>(
    null
  );

  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const deleteModal = useModal();
  const { data, isLoading } = useGetFaq({ id: userId });

  const deleteMutation = useMutation({
    mutationFn: deleteFaq,
    onSuccess: (data) => {
      showSnackbar(data.message, "success");
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.GET_FAQ, userId] });
      deleteModal.closeModal();
      setEditingIndex(null);
      setDeletingFaqId(null);
    },
    onError: (error: any) => {
      showSnackbar(error.message, "error");
    },
  });

  useEffect(() => {
    if (data?.data && editingIndex === null) {
      setFaqs(data.data);
    }
  }, [data, editingIndex]);

  const handleEdit = (index: number) => setEditingIndex(index);

  const handleCancelEdit = () => {
    if (editingIndex === null) return;

    const current = faqs[editingIndex];
    if (typeof current.id === "string" && current.id.startsWith("temp-")) {
      const newFaqs = [...faqs];
      newFaqs.splice(editingIndex, 1);
      setFaqs(newFaqs);
      showSnackbar("Draft FAQ discarded", "info");
    }

    setEditingIndex(null);
  };

  const handleSuccessEdit = () => {
    setEditingIndex(null);
    queryClient.invalidateQueries({ queryKey: [API_ROUTES.GET_FAQ, userId] });
  };

  const handleCopy = (selectedIndex: number) => {
    const selectedFaq = faqs[selectedIndex];
    if (!selectedFaq) {
      showSnackbar("FAQ not found", "error");
      return;
    }

    const newFaq: UserFaq = {
      ...selectedFaq,
      id: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      question: `${selectedFaq.question} (Copy)`,
      answer: selectedFaq.answer,
    };

    const newFaqs = [...faqs];
    const insertIndex = selectedIndex + 1;
    newFaqs.splice(insertIndex, 0, newFaq);
    setFaqs(newFaqs);
    setEditingIndex(insertIndex);
    // showSnackbar("FAQ duplicated - now editing copy", "success");
  };

  const handleDelete = (faqId: string | number) => {
    if (typeof faqId === "string" && faqId.startsWith("temp-")) {
      const faqIndex = faqs.findIndex((f) => f.id === faqId);
      if (faqIndex !== -1) {
        const newFaqs = [...faqs];
        newFaqs.splice(faqIndex, 1);
        setFaqs(newFaqs);
        // showSnackbar("Draft FAQ removed", "info");

        if (editingIndex === faqIndex) {
          setEditingIndex(null);
        }
      }
      return;
    }

    setDeletingFaqId(faqId);
    deleteModal.openModal();
  };

  const confirmDelete = () => {
    if (deletingFaqId) {
      deleteMutation.mutate(deletingFaqId);
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = faqs.findIndex((f) => f.id.toString() === active.id);
    const newIndex = faqs.findIndex((f) => f.id.toString() === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const reordered = arrayMove(faqs, oldIndex, newIndex);
      setFaqs(reordered);
      onReorder?.(reordered);
    }
  };

  return {
    faqs,
    isLoading,
    editingIndex,
    deleteModal,
    deleteMutation,
    handleEdit,
    handleCancelEdit,
    handleSuccessEdit,
    handleCopy,
    handleDelete,
    confirmDelete,
    handleDragEnd,
  };
}
