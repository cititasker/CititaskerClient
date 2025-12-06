import { useMemo } from "react";
import { usePaymentActions } from "./usePaymentActions";
import { useSurchargeActions } from "./useSurchargeActions";
import { useRescheduleActions } from "./useRescheduleActions";

export type TaskActionType =
  | "surcharge_request"
  | "accept_surcharge"
  | "reject_surcharge"
  | "accept_offer"
  | "release_payment"
  | "reschedule_create"
  | "reschedule_request"
  | "reschedule_counter"
  | "surcharge_success"
  | "offer_success"
  | "release_success"
  | "reschedule_success";

interface UseTaskActionsProps {
  task: ITask;
}

export const useTaskActions = ({ task }: UseTaskActionsProps) => {
  const acceptedOffer = useMemo(
    () => task?.offers?.find((o) => o.status === "accepted"),
    [task]
  );

  const updatedBudget = useMemo(() => {
    return acceptedOffer?.offer_amount || task?.budget;
  }, [acceptedOffer]);

  const payment = usePaymentActions(task);
  const surcharge = useSurchargeActions(task);
  const reschedule = useRescheduleActions({ task });

  return {
    // Derived state
    acceptedOffer,
    updatedBudget,

    // Payment
    ...payment,

    // Surcharge
    ...surcharge,

    // Reschedule
    ...reschedule,
  };
};
