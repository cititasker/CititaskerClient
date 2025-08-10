import FormButton from "@/components/forms/FormButton";
import Success from "@/components/reusables/Success";
import React from "react";

export default function RescheduleSuccess() {
  return (
    <Success
      title="Success"
      desc="Your offer was successfully sent to Judith N. You’re on your way to earning, there are plenty of people who need your help."
      action={
        <FormButton
          href="/browse-tasks"
          text="Browse more tasks"
          className="w-full mt-auto"
        />
      }
    />
  );
}
