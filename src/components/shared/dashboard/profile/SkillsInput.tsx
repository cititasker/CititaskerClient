import React, { useState, KeyboardEvent } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { X, Plus, AlertCircle, Sparkles } from "lucide-react";

interface SkillsInputProps {
  name: string;
  label: string;
  description?: string;
  placeholder?: string;
  maxSkills?: number;
  maxLength?: number;
  className?: string;
}

const SkillBadge = ({
  skill,
  onRemove,
  index,
}: {
  skill: string;
  onRemove: () => void;
  index: number;
}) => (
  <Badge
    variant="secondary"
    className="group flex items-center gap-2 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-text-secondary border border-neutral-200 hover:border-neutral-300 transition-all duration-200 animate-fade-in"
  >
    <span className="truncate max-w-[120px] sm:max-w-[180px]" title={skill}>
      {skill}
    </span>
    <button
      type="button"
      onClick={onRemove}
      className="flex-shrink-0 p-0.5 rounded-full hover:bg-neutral-300 text-neutral-500 hover:text-error transition-colors focus:outline-none focus:ring-2 focus:ring-error/20"
      aria-label={`Remove ${skill} skill`}
    >
      <X className="w-3 h-3" />
    </button>
  </Badge>
);

const SkillsCounter = ({ current, max }: { current: number; max?: number }) => {
  if (!max) return null;

  const percentage = (current / max) * 100;
  const isNearLimit = percentage >= 80;
  const isAtLimit = current >= max;

  return (
    <div className="flex items-center gap-2">
      <div
        className={`text-xs font-medium flex items-center gap-1 ${
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
      </div>
      <div className="w-16 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            isAtLimit ? "bg-error" : isNearLimit ? "bg-warning" : "bg-primary"
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
};

const EmptySkillsState = ({ onAddFirst }: { onAddFirst: () => void }) => (
  <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center bg-neutral-50">
    <Sparkles className="w-8 h-8 text-neutral-400 mx-auto mb-3" />
    <h4 className="text-sm font-medium text-text-primary mb-1">
      Add your first skill
    </h4>
    <p className="text-xs text-text-muted mb-3">
      Showcase your expertise and abilities
    </p>
    <Button
      type="button"
      onClick={onAddFirst}
      variant="ghost"
      size="sm"
      className="text-primary hover:text-primary-600 hover:bg-primary-50"
    >
      Get started
    </Button>
  </div>
);

export const SkillsInput = ({
  name,
  label,
  description,
  placeholder = "e.g. JavaScript, Project Management",
  maxSkills = 15,
  maxLength = 50,
  className = "",
}: SkillsInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const validateSkill = (skill: string): string | null => {
    if (!skill.trim()) return "Please enter a skill";
    if (skill.length > maxLength)
      return `Skill must be ${maxLength} characters or less`;
    if (
      fields.some(
        (field: any) => field.name.toLowerCase() === skill.toLowerCase()
      )
    ) {
      return "This skill is already added";
    }
    if (fields.length >= maxSkills)
      return `Maximum ${maxSkills} skills allowed`;
    return null;
  };

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    const validationError = validateSkill(trimmed);

    if (validationError) {
      setError(validationError);
      return;
    }

    append({ name: trimmed });
    setInputValue("");
    setError("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
    if (e.key === "Escape") {
      setInputValue("");
      setError("");
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (error) setError("");
  };

  const handleRemove = (index: number) => {
    remove(index);
    setError("");
  };

  const isAtLimit = fields.length >= maxSkills;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={className}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
            <FormLabel className="text-text-primary font-medium">
              {label}
              {fields.length > 0 && (
                <span className="ml-2 text-xs bg-primary-100 text-primary px-2 py-0.5 rounded-full">
                  {fields.length}
                </span>
              )}
            </FormLabel>
            <SkillsCounter current={fields.length} max={maxSkills} />
          </div>

          {description && (
            <FormDescription className="text-text-muted">
              {description}
            </FormDescription>
          )}

          <FormControl>
            <div className="space-y-4">
              {/* Input Section */}
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Input
                    {...field}
                    value={inputValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={
                      isAtLimit
                        ? `Maximum ${maxSkills} skills reached`
                        : placeholder
                    }
                    disabled={isAtLimit}
                    className={`transition-colors ${
                      error
                        ? "border-error focus-visible:ring-error"
                        : fieldState.error
                        ? "border-error focus-visible:ring-error"
                        : ""
                    }`}
                  />
                  {error && (
                    <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-error" />
                  )}
                </div>
                <Button
                  type="button"
                  onClick={handleAdd}
                  disabled={isAtLimit || !inputValue.trim()}
                  variant="outline"
                  className="btn-animate-press w-full sm:w-auto hover:bg-primary-50 hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4 sm:mr-0 mr-2" />
                  <span className="sm:sr-only">Add Skill</span>
                </Button>
              </div>

              {/* Error Display */}
              {error && (
                <div className="flex items-center gap-2 text-xs text-error bg-error-light p-3 rounded-lg border border-error/20">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Skills Display */}
              {fields.length === 0 ? (
                <EmptySkillsState
                  onAddFirst={() =>
                    document.getElementById(`${name}-input`)?.focus()
                  }
                />
              ) : (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {fields.map((field: any, index) => (
                      <SkillBadge
                        key={field.id}
                        skill={field.name}
                        onRemove={() => handleRemove(index)}
                        index={index}
                      />
                    ))}
                  </div>

                  {/* Help Text */}
                  <div className="text-xs text-text-muted bg-neutral-50 p-3 rounded-lg">
                    <div className="flex flex-wrap gap-4">
                      <span>💡 Press Enter to add quickly</span>
                      <span>✕ Click × to remove</span>
                      <span>⎋ Press Escape to clear input</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Limit Warning */}
              {isAtLimit && (
                <div className="text-xs text-warning bg-warning-light p-3 rounded-lg border border-warning/20">
                  You've reached the maximum of {maxSkills} skills. Remove some
                  to add new ones.
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
