// components/form/form-error.tsx

import { useFormContext } from "react-hook-form";

const FormError = ({ name, id }: { name: string; id?: string }) => {
  const {
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message;

  return error ? (
    <p id={id} className="text-sm text-red-500 mt-1">
      {String(error)}
    </p>
  ) : null;
};

export default FormError;
