"use client";

import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface NotificationPreference {
  email: boolean;
  sms: boolean;
}

interface NotificationSection {
  id: string;
  title: string;
  description: string;
  disabled?: boolean;
}

const Notification = () => {
  const [preferences, setPreferences] = useState<
    Record<string, NotificationPreference>
  >({
    transactional: { email: true, sms: true }, // Always enabled
    reminder: { email: false, sms: false },
    task_update: { email: false, sms: false },
    task_alert: { email: false, sms: false },
    newsletters: { email: false, sms: false },
  });

  const sections: NotificationSection[] = [
    {
      id: "transactional",
      title: "Transactional",
      description:
        "You will always receive important notifications about any payments, cancellations and your account.",
      disabled: true, // Always enabled for important notifications
    },
    {
      id: "reminder",
      title: "Task Reminder",
      description:
        "Friendly reminders if you've forgotten to accept an offer, release a payment or leave a review.",
    },
    {
      id: "task_update",
      title: "Task Update",
      description:
        "Receive updates on any new comments, messages, offers and reviews.",
    },
    {
      id: "task_alert",
      title: "Task Alert",
      description:
        "Get notified about tasks we think you'd be interested in based on your alert settings and activities on CitiTasker.",
    },
    {
      id: "newsletters",
      title: "Updates and Newsletters",
      description:
        "Get exciting updates on new features and learn about how to earn more and find the right people for your tasks with helpful tips and advice.",
    },
  ];

  const updatePreference = (
    sectionId: string,
    type: "email" | "sms",
    value: boolean
  ) => {
    setPreferences((prev) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [type]: value,
      },
    }));
  };

  const NotificationSwitch = ({
    sectionId,
    type,
    label,
    disabled,
  }: {
    sectionId: string;
    type: "email" | "sms";
    label: string;
    disabled?: boolean;
  }) => (
    <div className="flex items-center gap-3 group">
      <Switch
        id={`${sectionId}-${type}`}
        checked={preferences[sectionId]?.[type] || false}
        onCheckedChange={(checked) =>
          updatePreference(sectionId, type, checked)
        }
        disabled={disabled}
        className={cn(
          "transition-all duration-200",
          "data-[state=checked]:bg-primary",
          "focus:ring-2 focus:ring-primary/20",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      />
      <Label
        htmlFor={`${sectionId}-${type}`}
        className={cn(
          "text-sm font-medium text-text-primary cursor-pointer",
          "group-hover:text-text-secondary transition-colors duration-200",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {label}
      </Label>
    </div>
  );

  return (
    <div className="w-full mx-auto space-y-4">
      {/* Header */}
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-text-primary">
          Notification Preferences
        </h2>
        <p className="text-text-muted">
          Choose how you want to be notified about different activities.
        </p>
      </div>

      {/* Notification Sections */}
      <div className="space-y-4">
        {sections.map((section) => {
          const sectionPrefs = preferences[section.id];
          const isDisabled = section.disabled;

          return (
            <div
              key={section.id}
              className={cn(
                "group relative overflow-hidden rounded-2xl border transition-all duration-200",
                "bg-background hover:bg-background-secondary",
                isDisabled
                  ? "border-border-light bg-background-secondary"
                  : "border-border-light hover:border-border-medium hover:shadow-sm"
              )}
            >
              {/* Required badge for transactional */}
              {isDisabled && (
                <div className="absolute top-4 right-4">
                  <span className="px-2.5 py-1 text-xs font-medium bg-info/10 text-info rounded-full border border-info/20">
                    Required
                  </span>
                </div>
              )}

              <div className="p-6">
                <div className="space-y-4">
                  {/* Section Info */}
                  <div className="pr-16 space-y-2">
                    <h3 className="text-lg font-semibold text-text-primary">
                      {section.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {section.description}
                    </p>
                  </div>

                  {/* Toggle Controls */}
                  <div className="flex flex-wrap items-center gap-6 pt-2">
                    <NotificationSwitch
                      sectionId={section.id}
                      type="email"
                      label="Email"
                      disabled={isDisabled}
                    />
                    <NotificationSwitch
                      sectionId={section.id}
                      type="sms"
                      label="SMS"
                      disabled={isDisabled}
                    />

                    {/* Status indicator */}
                    <div className="flex items-center gap-2 ml-auto">
                      <div className="flex items-center gap-1">
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full transition-colors duration-200",
                            sectionPrefs?.email ||
                              sectionPrefs?.sms ||
                              isDisabled
                              ? "bg-success"
                              : "bg-neutral-300"
                          )}
                        />
                        <span className="text-xs text-text-muted">
                          {isDisabled
                            ? "Always enabled"
                            : sectionPrefs?.email || sectionPrefs?.sms
                            ? "Active"
                            : "Disabled"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t border-border-light">
        <button
          type="button"
          className={cn(
            "px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200",
            "bg-gradient-to-r from-primary to-primary-600",
            "hover:shadow-lg hover:scale-105 active:scale-95",
            "focus:outline-none focus:ring-2 focus:ring-primary/20"
          )}
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default Notification;
