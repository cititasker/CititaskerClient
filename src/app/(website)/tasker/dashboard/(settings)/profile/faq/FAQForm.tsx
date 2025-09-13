"use client";
import React, { useEffect } from "react";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFaq, updateFaq } from "@/services/user/users.api";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { useAppSelector } from "@/store/hook";
import { API_ROUTES } from "@/constant";
import {
  Save,
  X,
  Plus,
  Trash2,
  HelpCircle,
  Edit,
  AlertCircle,
  Copy,
} from "lucide-react";
import FormInput from "@/components/forms/FormInput";
import FormTextArea from "@/components/forms/FormTextArea";

// Dynamic schema based on mode
const createFAQSchema = (isMultiple: boolean) => {
  const faqItem = z.object({
    question: z
      .string()
      .min(1, "Question is required")
      .max(200, "Question too long"),
    answer: z
      .string()
      .min(1, "Answer is required")
      .max(1000, "Answer too long"),
  });

  return isMultiple
    ? z.object({ faqs: z.array(faqItem).min(1).max(10) })
    : faqItem;
};

interface FAQFormProps {
  mode: "create" | "edit" | "duplicate" | "create-multiple";
  existingFaq?: UserFaq;
  onCancel: () => void;
  onSuccess: () => void;
}

// Character counter component
const CharacterCounter = ({
  current,
  max,
}: {
  current: number;
  max: number;
}) => {
  const percentage = (current / max) * 100;
  const colorClass =
    percentage >= 100
      ? "text-error"
      : percentage >= 80
      ? "text-warning"
      : "text-text-muted";

  return (
    <span className={`text-xs font-medium ${colorClass}`}>
      {current}/{max}
    </span>
  );
};

const getFormConfig = (mode: FAQFormProps["mode"]) => {
  switch (mode) {
    case "edit":
      return {
        icon: <Edit className="w-5 h-5 text-primary" />,
        title: "Edit FAQ",
        description: "Update your FAQ question and answer",
        buttonText: "Update FAQ",
        buttonLoadingText: "Updating...",
      };
    case "duplicate":
      return {
        icon: <Copy className="w-5 h-5 text-primary" />,
        title: "Duplicate FAQ",
        description: "Modify and save this FAQ copy",
        buttonText: "Save Copy",
        buttonLoadingText: "Saving...",
      };
    case "create-multiple":
      return {
        icon: <Plus className="w-5 h-5 text-primary" />,
        title: "Create FAQs",
        description: "Add multiple questions and answers",
        buttonText: "Save FAQs",
        buttonLoadingText: "Saving...",
      };
    default: // create
      return {
        icon: <Plus className="w-5 h-5 text-primary" />,
        title: "Create FAQ",
        description: "Add a new question and answer",
        buttonText: "Save FAQ",
        buttonLoadingText: "Saving...",
      };
  }
};

// Individual FAQ field component
const FAQField = ({
  questionName,
  answerName,
  index,
  onRemove,
  canRemove,
  showTips = false,
}: {
  questionName: string;
  answerName: string;
  index?: number;
  onRemove?: () => void;
  canRemove?: boolean;
  showTips?: boolean;
}) => {
  const { watch } = useFormContext();

  const questionValue = watch(questionName);
  const answerValue = watch(answerName);

  return (
    <div className="border border-neutral-200 rounded-xl p-6 bg-background hover:border-neutral-300 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
            <HelpCircle className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary">
              {typeof index === "number" ? `FAQ ${index + 1}` : "FAQ"}
            </h4>
            <p className="text-xs text-text-muted">Question and answer</p>
          </div>
        </div>

        {canRemove && onRemove && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-error hover:text-error hover:bg-error-light"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <FormInput
            name={questionName}
            label="Question"
            placeholder="What would you like to know?"
          />
          <div className="flex justify-between text-xs text-text-muted">
            <span>Keep it clear and specific</span>
            <CharacterCounter current={questionValue.length || 0} max={200} />
          </div>
        </div>

        <div className="space-y-2">
          <FormTextArea
            name={answerName}
            label="Answer"
            placeholder="Provide a clear and helpful answer..."
            rows={4}
          />
          <div className="flex justify-between text-xs text-text-muted">
            <span>Be comprehensive yet concise</span>
            <CharacterCounter current={answerValue.length || 0} max={1000} />
          </div>
        </div>
      </div>

      {showTips && (
        <div className="mt-4 bg-info-light border border-info/20 rounded-lg p-3">
          <div className="flex gap-2">
            <AlertCircle className="w-4 h-4 text-info mt-0.5 flex-shrink-0" />
            <div className="text-xs text-info/80">
              <p className="font-medium text-info mb-1">Writing Tips:</p>
              <ul className="space-y-0.5">
                <li>• Use language your customers understand</li>
                <li>• Address common concerns directly</li>
                <li>• Keep answers solution-focused</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function FAQForm({
  mode,
  existingFaq,
  onCancel,
  onSuccess,
}: FAQFormProps) {
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { user } = useAppSelector((state) => state.user);

  const isMultiple = mode === "create-multiple";
  const isEdit = mode === "edit";
  const isDuplicate = mode === "duplicate";
  const schema = createFAQSchema(isMultiple);
  const config = getFormConfig(mode);

  const methods = useForm({
    defaultValues: isMultiple
      ? { faqs: [{ question: "", answer: "" }] }
      : {
          question: existingFaq?.question || "",
          answer: existingFaq?.answer || "",
        },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = methods;

  const fieldArray = isMultiple
    ? useFieldArray({ name: "faqs", control })
    : null;

  // Mutations
  const createMutation = useMutation({
    mutationFn: createFaq,
    onSuccess: (data) => {
      const successMessage = isDuplicate
        ? "FAQ duplicated successfully"
        : data.message;
      showSnackbar(successMessage, "success");
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.GET_FAQ, user.id],
      });
      onSuccess();
    },
    onError: (error: any) => {
      const errorMessage = isDuplicate
        ? "Failed to duplicate FAQ"
        : error.message || "Failed to create FAQ";
      showSnackbar(errorMessage, "error");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateFaq,
    onSuccess: (data) => {
      showSnackbar(data.message, "success");
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.GET_FAQ, user.id],
      });
      onSuccess();
    },
    onError: (error: any) =>
      showSnackbar(error.message || "Failed to update FAQ", "error"),
  });

  // Reset form when editing FAQ changes
  useEffect(() => {
    if ((isEdit || isDuplicate) && existingFaq) {
      reset({
        question: existingFaq.question || "",
        answer: existingFaq.answer || "",
      });
    }
  }, [existingFaq, reset, isEdit, isDuplicate]);

  const onSubmit = (values: any) => {
    if (isEdit && existingFaq) {
      updateMutation.mutate({ id: existingFaq.id, data: values });
    } else {
      // For duplicate and create modes, always create new FAQ
      const payload = isMultiple ? values : { faqs: [values] };
      createMutation.mutate(payload);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            {config.icon}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-text-primary">
              {config.title}
            </h2>
            <p className="text-sm text-text-muted">{config.description}</p>
          </div>
        </div>

        {/* Duplicate notice */}
        {isDuplicate && (
          <div className="bg-info-light border border-text-info rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Copy className="w-4 h-4 text-info" />
              <p className="text-sm text-info font-medium">
                Duplicating FAQ - make your changes and save to create a new FAQ
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Form Fields */}
          <div className="space-y-4">
            {isMultiple && fieldArray ? (
              fieldArray.fields.map((field, index) => (
                <FAQField
                  key={field.id}
                  questionName={`faqs.${index}.question`}
                  answerName={`faqs.${index}.answer`}
                  index={index}
                  onRemove={() => fieldArray.remove(index)}
                  canRemove={fieldArray.fields.length > 1}
                  showTips={index === 0}
                />
              ))
            ) : (
              <FAQField
                questionName="question"
                answerName="answer"
                showTips={!isEdit && !isDuplicate}
              />
            )}
          </div>

          {/* Add FAQ Button (multiple mode only) */}
          {isMultiple && fieldArray && fieldArray.fields.length < 10 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => fieldArray.append({ question: "", answer: "" })}
              className="w-full border-dashed hover:border-primary hover:bg-primary-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Another FAQ ({fieldArray.fields.length}/10)
            </Button>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6 border-t border-neutral-200">
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !isValid}
              className="btn-primary w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  {config.buttonLoadingText}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {config.buttonText}
                </>
              )}
            </Button>
          </div>

          {/* Error Display */}
          {errors && Object.keys(errors).length > 0 && (
            <div className="text-xs text-error bg-error-light p-3 rounded-lg border border-error/20">
              Please fix the errors above before saving.
            </div>
          )}
        </form>
      </div>
    </FormProvider>
  );
}
