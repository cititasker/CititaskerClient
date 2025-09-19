"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Link as LinkIcon, ExternalLink, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import FormInput from "@/components/forms/FormInput";
import CustomModal from "@/components/reusables/CustomModal";

const linkSchema = z.object({
  linkUrl: z.string().url("Please enter a valid URL"),
  linkText: z.string().optional(),
});

type LinkFormData = z.infer<typeof linkSchema>;

interface LinkModalProps {
  open: boolean;
  onClose: () => void;
  editor: any;
}

const LinkModal: React.FC<LinkModalProps> = ({ open, onClose, editor }) => {
  const methods = useForm<LinkFormData>({
    defaultValues: {
      linkUrl: "",
      linkText: "",
    },
    resolver: zodResolver(linkSchema),
  });

  const { handleSubmit, reset, watch, setValue } = methods;
  const urlValue = watch("linkUrl");

  // Auto-generate link text from URL if not provided
  useEffect(() => {
    if (urlValue && !watch("linkText")) {
      try {
        const url = new URL(urlValue);
        setValue("linkText", url.hostname);
      } catch {
        // Invalid URL, ignore
      }
    }
  }, [urlValue, setValue, watch]);

  const onInsertLink = handleSubmit((values) => {
    if (!editor || !values.linkUrl.trim()) return;

    const url = values.linkUrl.trim();
    const text = values.linkText?.trim() || url;

    editor
      .chain()
      .focus()
      .insertContent({
        type: "text",
        text,
        marks: [
          {
            type: "link",
            attrs: {
              href: url,
              target: "_blank",
              rel: "noopener noreferrer",
            },
          },
        ],
      })
      .run();

    handleClose();
  });

  const handleClose = () => {
    onClose();
    reset();
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, handleClose]);

  // Don't render anything if not open
  if (!open) return null;

  // Use portal to render outside of any parent forms
  const modalContent = (
    <CustomModal
      isOpen={open}
      onClose={handleClose}
      contentClassName="rounded-xl shadow-xl w-full max-w-md mx-4 animate-in zoom-in-95 duration-200"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mx-auto">
            <LinkIcon className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-text-primary">
            Insert Link
          </h2>
          <p className="text-sm text-text-muted">Add a link to your message</p>
        </div>

        {/* Form - Now completely separate from parent form */}
        <FormProvider {...methods}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onInsertLink(e);
            }}
            className="space-y-4"
          >
            <FormInput
              name="linkUrl"
              label="URL"
              placeholder="https://example.com"
            />

            <FormInput
              name="linkText"
              label="Link Text (optional)"
              placeholder="Display text for the link"
            />

            {/* Preview */}
            {urlValue && (
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                <div className="flex items-center gap-2 text-sm text-text-muted mb-1">
                  <ExternalLink className="w-4 h-4" />
                  Link Preview
                </div>
                <p className="text-primary hover:underline cursor-pointer text-sm">
                  {watch("linkText") || urlValue}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={handleClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 btn-primary"
                disabled={!urlValue}
              >
                Insert Link
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </CustomModal>
  );

  // Render to document.body using portal to avoid nested form issues
  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
};

export default LinkModal;
