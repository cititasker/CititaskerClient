"use client";
import FormButton from "@/components/forms/FormButton";

// important!

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-dvh flex items-center justify-center">
      <div className="flex flex-col gap-5 items-center">
        <h2 className="font-medium text-xl text-red-500">
          Something went wrong loading tasks
        </h2>
        <p className="text-red-600">{error.message}</p>

        <FormButton handleClick={() => reset()}>Try Again</FormButton>
      </div>
    </div>
  );
}
