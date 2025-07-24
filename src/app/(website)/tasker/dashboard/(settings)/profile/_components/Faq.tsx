import FormButton from "@/components/forms/FormButton";
import useModal from "@/hooks/useModal";
import { ArrowDownUp, Plus } from "lucide-react";
import React, { useState } from "react";
import EditFAQ from "./EditFAQ";
import FAQList from "./FAQList";
import { useAppSelector } from "@/store/hook";
import useToggle from "@/hooks/useToggle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { API_ROUTES } from "@/constant";
import { reorderFaqs } from "@/services/user/users.api";

export default function Faq() {
  const [reorderedFaqs, setReorderedFaqs] = useState<UserFaq[]>([]);
  const { openModal, isOpen, closeModal } = useModal();
  const { user } = useAppSelector((state) => state.user);
  const rearrange = useToggle();
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const reorderMutation = useMutation({
    mutationFn: reorderFaqs,
    onSuccess(data) {
      showSnackbar("FAQ order updated", "success");
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.GET_FAQ, user.id],
      });
      rearrange.handleClose();
    },
    onError(error) {
      showSnackbar(error.message || "Failed to update FAQ order", "error");
    },
  });

  const handleSaveReorder = () => {
    if (!reorderedFaqs.length) return;

    const payload = reorderedFaqs.map((faq, index) => ({
      id: faq.id,
      order: index + 1,
    }));
    console.log(44, payload);
    rearrange.handleClose();
    // reorderMutation.mutate({ userId: user.id, faqs: payload });
  };

  return (
    <div>
      {!isOpen && (
        <div className="w-fit ml-auto mb-4">
          {rearrange.isOpen ? (
            <div className="flex items-center gap-2">
              <FormButton
                text="Cancel"
                variant="nude"
                className="p-1 text-xs font-semibold text-primary h-fit"
                onClick={rearrange.handleClose}
              />
              <FormButton
                text="Save"
                variant="nude"
                className="p-1 text-xs font-semibold text-primary h-fit"
                onClick={handleSaveReorder}
              />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <FormButton
                icon={<ArrowDownUp />}
                text="Re-arrange"
                variant="nude"
                className="p-1 text-xs font-semibold text-primary h-fit"
                onClick={rearrange.handleOpen}
              />
              <FormButton
                icon={<Plus />}
                text="Add Faq"
                variant="nude"
                className="p-1 text-xs font-semibold text-primary h-fit"
                onClick={openModal}
              />
            </div>
          )}
        </div>
      )}

      <div>
        {isOpen ? (
          <EditFAQ handleCancel={closeModal} />
        ) : (
          <FAQList
            id={user.id}
            rearrange={rearrange.isOpen}
            onFaqsReorderChange={setReorderedFaqs}
          />
        )}
      </div>
    </div>
  );
}
