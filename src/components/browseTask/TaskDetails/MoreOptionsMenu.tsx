import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import CustomModal from "@/components/reusables/CustomModal";
import useModal from "@/hooks/useModal";
import AnimatedStep from "@/components/reusables/AnimatedStep";
import { useState } from "react";
import Reschedule from "./Reschedule";

const options = [
  { label: "Cancel task", name: "task" },
  { label: "Reschedule task", name: "reschedule" },
  { label: "Post similar task", name: "post-similar" },
];

const MoreOptionsMenu: React.FC = () => {
  const reschedule = useModal();
  const [currentStep, setCurrentStep] = useState(1);

  const handleAction = (action: string) => {
    switch (action) {
      case "reschedule": {
        reschedule.openModal();
      }
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            className="w-full text-black-2 rounded-[10px] border-none bg-light-grey font-normal"
          >
            More Options
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-0 w-[var(--radix-dropdown-menu-trigger-width)] bg-white border border-light-grey">
          {options.map((opt) => (
            <DropdownMenuItem
              className="focus-visible:bg-transparent px-5 py-3 border-b border-table-stroke last:border-none"
              key={opt.name}
              onClick={() => handleAction(opt.name)}
            >
              {opt.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <CustomModal
        isOpen={reschedule.isOpen}
        onClose={reschedule.closeModal}
        aria-labelledby="make-offer-modal-title"
        aria-describedby="make-offer-modal-description"
      >
        <AnimatedStep currentStep={currentStep}>
          {currentStep == 1 && <Reschedule onClose={reschedule.closeModal} />}
        </AnimatedStep>
      </CustomModal>
    </>
  );
};

export default MoreOptionsMenu;
