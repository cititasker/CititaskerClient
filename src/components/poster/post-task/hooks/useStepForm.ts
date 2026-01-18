import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setTaskData } from "@/store/slices/task";
import { useEffect, useMemo, useRef } from "react";
import { postTaskSchemaType } from "@/schema/task";

interface UseStepFormProps {
  schema: any;
  pickFields: (keyof postTaskSchemaType)[];
  step?: number;
  customSchema?: any;
}

export const useStepForm = ({
  schema,
  pickFields,
  step,
  customSchema,
}: UseStepFormProps) => {
  const { task } = useAppSelector((s) => s.task);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialized = useRef(false);

  const currentStep = step || Number(searchParams.get("step")) || 1;

  // Memoize pickFields to prevent infinite loop
  const memoizedPickFields = useMemo(() => pickFields, [pickFields.join(",")]);

  // Create schema with picked fields
  const fieldsObject = useMemo(
    () =>
      memoizedPickFields.reduce(
        (acc, field) => ({ ...acc, [field]: true }),
        {} as Record<string, boolean>
      ),
    [memoizedPickFields]
  );

  const stepSchema = useMemo(
    () => customSchema || schema.pick(fieldsObject),
    [customSchema, schema, fieldsObject]
  );

  // Create default values - ALWAYS use persisted task data if available
  const defaultValues = useMemo(() => {
    const values = {} as Record<string, any>;
    memoizedPickFields.forEach((field) => {
      // For both create and edit mode, use task data if available
      // This ensures persistence during task creation flow
      const taskValue = (task as any)[field];
      values[field] =
        taskValue !== undefined ? taskValue : getFieldDefault(field as string);
    });
    return values;
  }, [memoizedPickFields, task]);

  const methods = useForm<FieldValues>({
    resolver: zodResolver(stepSchema),
    defaultValues,
  });

  const { handleSubmit, reset, getValues } = methods;

  // Reset form when task data changes - works for both create and edit modes
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      return; // Skip first run to prevent initial reset
    }

    // Build task data with proper typing
    const taskData = {} as Record<string, any>;
    memoizedPickFields.forEach((field) => {
      const taskValue = (task as any)[field];
      taskData[field] =
        taskValue !== undefined ? taskValue : getFieldDefault(field as string);
    });

    // Only reset if data actually changed
    const currentValues = getValues() as Record<string, any>;
    const hasChanged = memoizedPickFields.some((field) => {
      const currentValue = currentValues[field];
      const newValue = taskData[field];

      // Deep comparison for objects/arrays
      if (Array.isArray(currentValue) && Array.isArray(newValue)) {
        return JSON.stringify(currentValue) !== JSON.stringify(newValue);
      }
      if (
        typeof currentValue === "object" &&
        typeof newValue === "object" &&
        currentValue &&
        newValue
      ) {
        return JSON.stringify(currentValue) !== JSON.stringify(newValue);
      }
      return currentValue !== newValue;
    });

    if (hasChanged) {
      reset(taskData);
    }
  }, [task, memoizedPickFields, reset, getValues]);

  // Fixed onSubmit with proper typing - persists data for both modes
  const onSubmit = handleSubmit((data: FieldValues) => {
    console.log(data);
    // Always persist data to Redux (and therefore to localStorage via redux-persist)
    dispatch(setTaskData(data as Partial<postTaskSchemaType>));
    navigateToNextStep(currentStep);
  });

  const navigateToNextStep = (step: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("step", String(step + 1));
    router.push(url.toString());
  };

  return {
    methods,
    onSubmit,
    currentStep,
  };
};

// Helper function for default values
const getFieldDefault = (field: string): any => {
  switch (field) {
    case "images":
      return [];
    case "location":
      return [];
    case "showTimeOfDay":
      return false;
    case "category_id":
      return null;
    case "sub_category_id":
      return null;
    case "state":
      return null;
    case "address":
      return null;
    case "location_type":
      return null;
    case "time_frame":
      return null;
    case "time":
      return null;
    case "date":
      return "";
    case "budget":
      return "";
    case "name":
      return "";
    case "description":
      return "";
    default:
      return null;
  }
};
