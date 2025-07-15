import FormButton from "@/components/forms/FormButton";
import useModal from "@/hooks/useModal";
import { Plus } from "lucide-react";
import React from "react";
import EditFAQ from "./EditFAQ";
import FAQList from "./FAQList";
import { useAppSelector } from "@/store/hook";

export default function Faq() {
  const { openModal, isOpen, closeModal } = useModal();
  const { user } = useAppSelector((state) => state.user);
  return (
    <div>
      {!isOpen && (
        <FormButton
          icon={<Plus />}
          text="Add Faq"
          variant="nude"
          className="p-1 text-xs font-semibold text-primary h-fit ml-auto mb-4"
          onClick={openModal}
        />
      )}

      <div>
        {isOpen ? (
          <EditFAQ handleCancel={closeModal} />
        ) : (
          <FAQList id={user.id} />
        )}
      </div>
    </div>
  );
}
