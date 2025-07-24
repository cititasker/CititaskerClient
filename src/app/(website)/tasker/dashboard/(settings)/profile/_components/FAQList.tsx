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
import { GripHorizontal, GripVertical, MoreVertical } from "lucide-react";
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
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import SortableItem from "./SortableItem";

const MoreAction = ({
  onEdit,
  onCopy,
  onDelete,
  className,
}: {
  onEdit: () => void;
  onCopy: () => void;
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
        <DropdownMenuItem onClick={onCopy}>Copy FAQ</DropdownMenuItem>
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
  rearrange?: boolean;
  onFaqsReorderChange?: (faqs: UserFaq[]) => void;
}

export default function FAQList({
  id,
  isEdit = true,
  rearrange,
  onFaqsReorderChange,
}: IProps) {
  const sensors = useSensors(useSensor(PointerSensor));

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

  const handleCopy = (selectedIndex: number) => {
    const selectedFaq = faqs[selectedIndex];

    const newFaq: UserFaq = {
      ...selectedFaq,
      id: `temp-${Date.now()}`, // temporary ID
      question: selectedFaq.question + " (Copy)",
    };

    const newFaqs = [...faqs];
    newFaqs.splice(selectedIndex + 1, 0, newFaq);

    setFaqs(newFaqs);
    setIndex(selectedIndex + 1);
    setMode("edit");
  };

  const handleCancel = () => {
    if (index === null) return;

    const current = faqs[index];

    if (typeof current.id === "string" && current.id.startsWith("temp-")) {
      const newFaqs = [...faqs];
      newFaqs.splice(index, 1);
      setFaqs(newFaqs);
    }

    setIndex(null);
    setMode(null);
  };

  const handleDelete = (index: any) => {
    setIndex(index);
    setMode("delete");
    deleteFaqModal.openModal();
  };

  const deleteSelection = () => {
    deleteMutation.mutate(index);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = faqs.findIndex((f) => f.id.toString() === active.id);
    const newIndex = faqs.findIndex((f) => f.id.toString() === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const reordered = arrayMove(faqs, oldIndex, newIndex);
      setFaqs(reordered);
      onFaqsReorderChange?.(reordered);
    }
  };

  if (faqs.length < 1) return <Empty text="Please add your FAQ" />;

  return (
    <div>
      {rearrange ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={faqs.map((f) => f.id.toString())}
            strategy={verticalListSortingStrategy}
          >
            <Accordion type="multiple" className="space-y-5">
              {faqs.map((el, i) => (
                <SortableItem key={el.id} id={el.id.toString()}>
                  <Fragment>
                    {index == i && mode == "edit" ? (
                      <EditSingleFaq
                        faq={faqs[index]}
                        handleCancel={handleCancel}
                        isNew={faqs[index].id?.toString().startsWith("temp-")} // detect temp FAQ
                      />
                    ) : (
                      <AccordionItem
                        value={`${el.id}`}
                        className="border border-[#45485B] rounded-2xl bg-white shadow-sm"
                      >
                        <div className="relative">
                          <AccordionTrigger
                            showIcon={!isEdit}
                            className="px-5 text-sm text-black-2 font-semibold hover:no-underline flex-1"
                            icon={!isEdit ? <IAddCircle /> : undefined}
                          >
                            <div className="flex items-center gap-2">
                              {rearrange && (
                                <GripVertical size={16} className="" />
                              )}
                              {el.question}
                            </div>
                          </AccordionTrigger>
                          {isEdit && !rearrange && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                              <MoreAction
                                onEdit={() => handleEdit(i)}
                                onCopy={() => handleCopy(i)}
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
                </SortableItem>
              ))}
            </Accordion>
          </SortableContext>
        </DndContext>
      ) : (
        <Accordion type="multiple" className="space-y-5">
          {faqs.map((el, i) => (
            <Fragment key={el.id}>
              {index == i && mode == "edit" ? (
                <EditSingleFaq
                  faq={faqs[index]}
                  handleCancel={handleCancel}
                  isNew={faqs[index].id?.toString().startsWith("temp-")} // detect temp FAQ
                />
              ) : (
                <AccordionItem
                  value={`${el.id}`}
                  className="border border-[#45485B] rounded-2xl bg-white shadow-sm"
                >
                  <div className="relative">
                    <AccordionTrigger
                      showIcon={!isEdit}
                      className="px-5 text-sm text-black-2 font-semibold hover:no-underline flex-1"
                      icon={!isEdit ? <IAddCircle /> : undefined}
                    >
                      <div className="flex items-center gap-2">
                        {rearrange && <GripVertical size={16} className="" />}
                        {el.question}
                      </div>
                    </AccordionTrigger>
                    {isEdit && !rearrange && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                        <MoreAction
                          onEdit={() => handleEdit(i)}
                          onCopy={() => handleCopy(i)}
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
      )}

      <DeleteConfirmationModal
        isOpen={deleteFaqModal.isOpen}
        onClose={deleteFaqModal.closeModal}
        loading={deleteMutation.isPending}
        handleSubmit={deleteSelection}
      />
    </div>
  );
}
