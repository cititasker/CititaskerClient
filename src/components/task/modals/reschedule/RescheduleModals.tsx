import RescheduleModal from "../reschedule/RescheduleModal";
import { getPartialInitials } from "@/utils";

interface RescheduleModalsProps {
  task: ITask;
  rescheduleActions: ReturnType<
    typeof import("../../hooks/useRescheduleActions").useRescheduleActions
  >;
  role: "poster" | "tasker";
}

export default function RescheduleModals({
  rescheduleActions,
  role,
}: RescheduleModalsProps) {
  const targetName =
    role === "poster"
      ? getPartialInitials(rescheduleActions.task?.tasker?.profile)
      : getPartialInitials(rescheduleActions.task?.poster?.profile);

  const handleCreateSubmit = (data: any) => {
    rescheduleActions.handleCreateReschedule(data, () =>
      rescheduleActions.setStep("success")
    );
  };

  const handleCounterSubmit = (data: any) => {
    rescheduleActions.handleRescheduleSubmit(data, () =>
      rescheduleActions.setStep("success")
    );
  };

  const closeModal = () => {
    rescheduleActions.closeRescheduleModal();
  };

  return (
    <RescheduleModal
      isOpen={rescheduleActions.rescheduleModal.isOpen}
      onClose={closeModal}
      step={rescheduleActions.step}
      setStep={rescheduleActions.setStep}
      role={role}
      targetName={targetName as string}
      loading={
        rescheduleActions.rescheduleTask.isPending ||
        rescheduleActions.createReschedule.isPending ||
        rescheduleActions.acceptReschedule.isPending
      }
      onCreateSubmit={handleCreateSubmit}
      onCounterSubmit={handleCounterSubmit}
      onAcceptSubmit={rescheduleActions.handleAcceptReschedule}
    />
  );
}
