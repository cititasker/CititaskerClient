import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Plus, Trash2, Award, GraduationCap } from "lucide-react";
import FormInput from "@/components/forms/FormInput";
import FormDatePicker from "@/components/forms/FormDatePicker";

interface CertificatesInputProps {
  name: string;
  label: string;
  maxCertificates?: number;
  className?: string;
}

const EmptyState = ({ onAdd }: { onAdd: () => void }) => (
  <Card className="border-dashed border-2 border-neutral-300 bg-neutral-50">
    <CardContent className="flex flex-col items-center justify-center py-8 px-4 text-center">
      <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center mb-4">
        <Award className="w-6 h-6 text-neutral-500" />
      </div>
      <h3 className="font-medium text-text-primary mb-2">
        No certificates added yet
      </h3>
      <p className="text-sm text-text-muted mb-4 max-w-sm">
        Add your professional certifications, licenses, or qualifications to
        showcase your expertise.
      </p>
      <Button
        type="button"
        onClick={onAdd}
        variant="outline"
        className="hover:bg-primary-50 hover:border-primary hover:text-primary"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Your First Certificate
      </Button>
    </CardContent>
  </Card>
);

const CertificateCard = ({
  index,
  name,
  onRemove,
  isLast,
}: {
  index: number;
  name: string;
  onRemove: () => void;
  isLast: boolean;
}) => (
  <Card className="group relative border border-neutral-200 hover:border-neutral-300 hover:shadow-md transition-all duration-200">
    <CardContent className="p-4 sm:p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
          <GraduationCap className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-text-primary">
            Certificate {index + 1}
          </h4>
          <p className="text-xs text-text-muted">Certification details</p>
        </div>
        <Button
          type="button"
          onClick={onRemove}
          variant="ghost"
          size="sm"
          className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-500 hover:text-error hover:bg-error-light p-1.5"
          aria-label="Remove certificate"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput
          name={`${name}.${index}.institution`}
          label="Institution"
          placeholder="e.g. Google, Microsoft, AWS"
        />
        <FormDatePicker
          name={`${name}.${index}.year`}
          label="Year Completed"
          placeholder="Select year"
          required
        />
      </div>
    </CardContent>
  </Card>
);

const CertificatesCounter = ({
  current,
  max,
}: {
  current: number;
  max?: number;
}) => {
  if (!max) return null;

  const isNearLimit = current >= max * 0.8;
  const isAtLimit = current >= max;

  return (
    <div
      className={`text-xs flex items-center gap-1 ${
        isAtLimit
          ? "text-error"
          : isNearLimit
          ? "text-warning"
          : "text-text-muted"
      }`}
    >
      <span>{current}</span>
      <span>/</span>
      <span>{max}</span>
      <span>certificates</span>
    </div>
  );
};

export const CertificatesInput = ({
  name,
  label,
  maxCertificates = 10,
  className = "",
}: CertificatesInputProps) => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const handleAdd = () => {
    if (fields.length < maxCertificates) {
      append({ institution: "", year: "" });
    }
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  const isAtLimit = fields.length >= maxCertificates;

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className={className}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <FormLabel className="text-text-primary">{label}</FormLabel>
              {fields.length > 0 && (
                <span className="text-xs bg-neutral-100 text-text-muted px-2 py-1 rounded-full">
                  {fields.length}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <CertificatesCounter
                current={fields.length}
                max={maxCertificates}
              />
              {fields.length > 0 && (
                <Button
                  type="button"
                  onClick={handleAdd}
                  disabled={isAtLimit}
                  variant="outline"
                  size="sm"
                  className="hover:bg-primary-50 hover:border-primary hover:text-primary disabled:opacity-50"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another
                </Button>
              )}
            </div>
          </div>

          <FormControl>
            <div className="space-y-4">
              {fields.length === 0 ? (
                <EmptyState onAdd={handleAdd} />
              ) : (
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <CertificateCard
                      key={field.id}
                      index={index}
                      name={name}
                      onRemove={() => handleRemove(index)}
                      isLast={index === fields.length - 1}
                    />
                  ))}

                  {fields.length > 0 && (
                    <div className="text-xs text-text-muted bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                      <p className="font-medium mb-1">
                        Tips for adding certificates:
                      </p>
                      <ul className="space-y-1 ml-4 list-disc">
                        <li>
                          Include professional certifications, licenses, or
                          courses
                        </li>
                        <li>Add the full name of the issuing institution</li>
                        <li>
                          Specify the year you completed or received the
                          certification
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {isAtLimit && (
                <div className="text-xs text-warning bg-warning-light p-3 rounded-lg border border-warning/20">
                  You've reached the maximum limit of {maxCertificates}{" "}
                  certificates.
                </div>
              )}
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
