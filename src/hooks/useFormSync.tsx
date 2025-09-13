import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

export const useFormSync = <T extends Record<string, any>>(
  formMethods: ReturnType<typeof useForm<T>>,
  data: Partial<T>,
  dependencies: any[] = []
) => {
  const { reset } = formMethods;

  const syncForm = useCallback(() => {
    reset(data as T);
  }, [reset, ...dependencies]);

  useEffect(() => {
    syncForm();
  }, [syncForm]);

  return { syncForm };
};
