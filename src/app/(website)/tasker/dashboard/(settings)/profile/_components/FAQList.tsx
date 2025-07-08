import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import React, { Fragment, useEffect, useState } from "react";
import EditSingleFaq from "./EditSingleFaq";
import { useGetFaq } from "@/services/user/user.hook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { API_ROUTES } from "@/constant";
import { deleteFaq } from "@/services/user/users.api";
import useModal from "@/hooks/useModal";
import Empty from "@/components/myTasks/Empty";
import DeleteConfirmationModal from "@/components/reusables/Modals/DeleteConfirmationModal";
import { IAddCircle } from "@/constant/icons";

const MoreAction = ({
  onEdit,
  onDelete,
  className,
}: {
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={className}>
        <MoreVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
        <DropdownMenuItem>Copy FAQ</DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} className="!text-destructive">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface IProps {
  id: any;
  isEdit?: boolean;
}

export default function FAQList({ id, isEdit = true }: IProps) {
  const [index, setIndex] = useState<number | null>(null); // Manage which FAQ is being edited
  const [faqs, setFaqs] = useState<UserFaq[]>([]);
  const { data } = useGetFaq({ id });
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const deleteFaqModal = useModal();
  const [mode, setMode] = useState<"edit" | "delete" | null>(null);

  const faqData = data?.data || [];

  const deleteMutation = useMutation({
    mutationFn: deleteFaq,
    onSuccess(data) {
      showSnackbar(data.message, "success");
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.GET_FAQ, id],
      });
      deleteFaqModal.closeModal();
    },
    onError(error) {
      showSnackbar(error.message, "error");
    },
  });

  useEffect(() => {
    setFaqs(faqData);
  }, [data]);

  const handleEdit = (index: number) => {
    setIndex(index);
    setMode("edit");
  };

  const handleSave = () => {
    setIndex(null); // Hide the FaqItem when save is clicked
  };

  const handleCancel = () => {
    setIndex(null);
  };

  const handleDelete = (index: number) => {
    setIndex(index);
    setMode("delete");
    deleteFaqModal.openModal();
  };

  const deleteSelection = () => {
    deleteMutation.mutate(index);
  };

  if (faqs.length < 1) return <Empty text="Please add your FAQ" />;

  return (
    <div>
      <Accordion type="multiple" className="space-y-5">
        {faqs.map((el, i) => (
          <Fragment key={el.id}>
            {index == i && mode == "edit" ? (
              <EditSingleFaq faq={faqs[index]} handleCancel={handleCancel} />
            ) : (
              <AccordionItem
                value={`${el.id}`}
                className="border border-[#45485B] rounded-2xl"
              >
                <div className="relative">
                  <AccordionTrigger
                    showIcon={!isEdit}
                    className="px-5 text-sm text-black-2 font-semibold hover:no-underline flex-1"
                    icon={!isEdit ? <IAddCircle /> : undefined}
                  >
                    {el.question}
                  </AccordionTrigger>
                  {isEdit && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                      <MoreAction
                        onEdit={() => handleEdit(i)}
                        onDelete={() => handleDelete(el.id)}
                      />
                    </div>
                  )}
                </div>
                <AccordionContent className="px-5 text-sm font-normal">
                  {el.answer}
                </AccordionContent>
              </AccordionItem>
            )}
          </Fragment>
        ))}
      </Accordion>
      <DeleteConfirmationModal
        isOpen={deleteFaqModal.isOpen}
        onClose={deleteFaqModal.closeModal}
        loading={deleteMutation.isPending}
        handleSubmit={deleteSelection}
      />
    </div>
  );
}
