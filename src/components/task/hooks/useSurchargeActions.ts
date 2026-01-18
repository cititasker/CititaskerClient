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
import { useAuth } from "@/hooks/useAuth";

type SurchargeStep =
  | "request"
  | "accept"
  | "reject"
  | "success"
  | "reject_success";

export const useSurchargeActions = (task: ITask) => {
  const [surchargeStep, setSurchargeStep] = useState<SurchargeStep>("request");
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const { purgeOffer } = usePurgeData();
  const { hideAlert } = useTaskAlert();
  const { isAuthenticated } = useAuth();

  const surchargeModal = useModal();

  const { data: surchargeList } = useSurchargeList(
    String(task?.id),
    Boolean(task?.has_surcharge_requests) && isAuthenticated
  );

  const pendingSurcharge = useMemo(() => {
    const pending = surchargeList?.data?.data.find(
      (s) => s.status === "pending"
    );
    if (!pending) return undefined;
    return pending;
  }, [surchargeList]);

  const rejectedSurcharge = useMemo(() => {
    const rejected = surchargeList?.data?.data.find(
      (s) => s.status === "rejected"
    );
    if (!rejected) return undefined;
    return rejected;
  }, [surchargeList]);

  const rejectSurcharge = useRejectSurchargeRequest(String(task?.id));

  const invalidateQueries = () => {
    queryClient.invalidateQueries({
      queryKey: [API_ROUTES.USER_TASKS, String(task.id)],
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
    rejectedSurcharge,
    surchargeStep,

    // Modals
    surchargeModal,

    // Mutations
    rejectSurcharge,
    paySurchargeMutation,

    // Actions
    handleSurchargePayment,
    closeSurchargeModal,
    setSurchargeStep,
  };
};
