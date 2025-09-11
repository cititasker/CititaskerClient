"use client";
import React, { Fragment } from "react";
import { Accordion } from "@/components/ui/accordion";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./_components/SortableItem";
import { FAQItem } from "./_components/FAQItem";
import { ReorderFAQItem } from "./_components/ReorderFAQItem";
import { FAQListSkeleton } from "./_components/FAQListSkeleton";
import { EmptyFAQState } from "./_components/EmptyFAQState";
import { DeleteConfirmModal } from "@/components/reusables/Modals/ConfirmModal";
import { useFAQListManager } from "./hooks/useFAQListManager";

interface FAQListProps {
  id: string | number;
  isEdit?: boolean;
  rearrange?: boolean;
  onFaqsReorderChange?: (faqs: UserFaq[]) => void;
}

export default function FAQList({
  id,
  isEdit = true,
  rearrange = false,
  onFaqsReorderChange,
}: FAQListProps) {
  const sensors = useSensors(useSensor(PointerSensor));

  const {
    faqs,
    isLoading,
    editingIndex,
    deleteModal,
    deleteMutation,
    handleEdit,
    handleCancelEdit,
    handleSuccessEdit,
    handleCopy,
    handleDelete,
    confirmDelete,
    handleDragEnd,
  } = useFAQListManager(id, onFaqsReorderChange);

  if (isLoading) return <FAQListSkeleton />;
  if (faqs.length === 0) return <EmptyFAQState />;

  if (rearrange) {
    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={faqs.map((f) => f.id.toString())}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {faqs.map((faq) => (
              <SortableItem key={faq.id} id={faq.id.toString()}>
                <ReorderFAQItem faq={faq} />
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    );
  }

  return (
    <div className="space-y-3">
      <Accordion type="multiple" className="space-y-3">
        {faqs.map((faq, index) => (
          <Fragment key={faq.id}>
            <FAQItem
              faq={faq}
              isEditing={editingIndex === index}
              isEdit={isEdit}
              onEdit={() => handleEdit(index)}
              onCopy={() => handleCopy(index)}
              onDelete={() => handleDelete(faq.id)}
              onCancelEdit={handleCancelEdit}
              onSuccessEdit={handleSuccessEdit}
            />
          </Fragment>
        ))}
      </Accordion>

      <DeleteConfirmModal
        open={deleteModal.isOpen}
        onClose={deleteModal.closeModal}
        loading={deleteMutation.isPending}
        onConfirm={confirmDelete}
        title="Delete FAQ"
        description="Are you sure you want to delete this FAQ? This action cannot be undone."
      />
    </div>
  );
}
