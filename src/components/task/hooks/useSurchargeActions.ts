import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useRejectSurchargeRequest,
  useSurchargeList,
} from "@/services/offers/offers.hook";
import { useCreateIntent } from "@/services/tasks/tasks.hook";
import { API_ROUTES } from "@/constant";
import { usePurgeData } from "@/utils/dataPurge";
import useModal from "@/hooks/useModal";
import Paystack from "@/utils/paystackSetup";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { errorHandler } from "@/utils";
import { useTaskAlert } from "@/providers/TaskAlertContext";

type SurchargeStep = "request" | "accept" | "reject" | "success";

export const useSurchargeActions = (task: ITask) => {
  const [surchargeStep, setSurchargeStep] = useState<SurchargeStep>("request");
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const { purgeOffer } = usePurgeData();
  const { hideAlert } = useTaskAlert();

  const surchargeModal = useModal();
  const rejectSurchargeModal = useModal();

  const { data: surchargeList } = useSurchargeList(
    String(task?.id),
    Boolean(task?.has_surcharge_requests)
  );

  const pendingSurcharge = useMemo(() => {
    const pending = surchargeList?.data?.data.find(
      (s) => s.status === "pending"
    );
    if (!pending) return undefined;
    return pending;
  }, [surchargeList]);

  const rejectSurcharge = useRejectSurchargeRequest();

  const invalidateQueries = () => {
    queryClient.invalidateQueries({
      queryKey: [API_ROUTES.GET_USER_TASK, String(task.id)],
    });
  };

  const paySurchargeMutation = useCreateIntent({
    onSuccess: (res) => {
      surchargeModal.closeModal();

      const { amount, hash_id } = res.data;
      Paystack.startPayment({
        email: task.poster.email,
        amount: amount * 100,
        reference: hash_id,
        handleSuccess: () => {
          invalidateQueries();
          hideAlert(`surcharge_${task.id}`);
          setSurchargeStep("success");
          surchargeModal.openModal();
        },
      });
    },
    onError: (err) => showSnackbar(errorHandler(err), "error"),
  });

  const handleSurchargePayment = async () => {
    if (!pendingSurcharge) return;

    await paySurchargeMutation.mutateAsync({
      payable_id: pendingSurcharge.id,
      task_id: task.id,
      intent: "surcharge_payment",
    });
  };

  const closeSurchargeModal = async () => {
    await purgeOffer();
    surchargeModal.closeModal();
  };

  return {
    // State
    pendingSurcharge,
    surchargeStep,

    // Modals
    surchargeModal,
    rejectSurchargeModal,

    // Mutations
    rejectSurcharge,
    paySurchargeMutation,

    // Actions
    handleSurchargePayment,
    closeSurchargeModal,
    setSurchargeStep,
  };
};
