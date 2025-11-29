import dynamic from "next/dynamic";
import { getPartialInitials } from "@/utils";

const SurchargeModals = dynamic(() => import("./surcharge/SurchargeModals"), {
  ssr: false,
});

const PaymentModals = dynamic(
  () => import("./payment").then((mod) => ({ default: mod.PaymentModals })),
  {
    ssr: false,
  }
);

const RescheduleModals = dynamic(
  () =>
    import("./reschedule").then((mod) => ({ default: mod.RescheduleModals })),
  {
    ssr: false,
  }
);

interface TaskModalsProps {
  task: ITask;
  actions: ReturnType<typeof import("../hooks/useTaskActions").useTaskActions>;
  role: "poster" | "tasker";
}

export default function TaskModals({ task, actions, role }: TaskModalsProps) {
  const taskerName = getPartialInitials(
    actions.acceptedOffer?.tasker || task.tasker?.profile
  ) as string;

  return (
    <>
      {role === "poster" && (
        <>
          <SurchargeModals
            task={task}
            surchargeActions={actions}
            taskerName={taskerName}
          />
          <PaymentModals
            task={task}
            paymentActions={actions}
            taskerName={taskerName}
          />
        </>
      )}

      <RescheduleModals task={task} rescheduleActions={actions} role={role} />
    </>
  );
}
