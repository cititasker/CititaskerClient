"use client";

import React, { useState } from "react";
import FormSwitch from "@/components/forms/FormSwitch";

const Notification = () => {
  const [email, setEmail] = useState(false);
  const [sms, setSms] = useState(false);

  const toggleEmail = (checked: boolean) => {
    setEmail(checked);
  };

  const toggleSMS = (checked: boolean) => {
    setSms(checked);
  };

  const sections = [
    {
      title: "Transactional",
      desc: "You will always receive important notifications about any payments, cancellations and your account.",
      name: "transaction",
    },
    {
      title: "Task Reminder",
      desc: "Friendly reminders if you’ve forgotten to accept an offer, release a payment or leave a review.",
      name: "reminder",
    },
    {
      title: "Task Update",
      desc: "Receive updates on any new comments, messages, offers and reviews.",
      name: "task_update",
    },
    {
      title: "Task Alert",
      desc: "Get notified about tasks we think you’d be interested in based on your alert settings and activities on CitiTasker.",
      name: "task_alert",
    },
    {
      title: "Updates and Newsletters",
      desc: "Get exciting updates on new features and learn about how to earn more and find the right people for your tasks with helpful tips and advice.",
      name: "newsletters",
    },
  ];

  return (
    <div className="w-full space-y-6">
      {sections.map(({ title, desc, name }, i) => (
        <div
          key={i}
          className="w-full rounded-2xl border border-muted px-8 py-6"
        >
          <p className="text-black font-semibold mb-2">{title}</p>
          <p className="text-black font-normal">{desc}</p>
          <div className="mt-8 flex items-center gap-8">
            <FormSwitch
              label="Email"
              value={email}
              handleChange={toggleEmail}
            />
            <FormSwitch label="SMS" value={sms} handleChange={toggleSMS} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notification;
