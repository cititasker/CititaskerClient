"use client";
import * as React from "react";
import CustomModal from "@/components/reusables/CustomModal";
import Icons from "@/components/Icons";
import FormButton from "@/components/forms/FormButton";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constant";

interface ModalType {
  open: boolean;
  handleClose: () => void;
  verifications: {
    id: boolean;
    bank: boolean;
    profile: boolean;
  };
}

const verificationMeta = {
  id: { label: "ID Verification", text: "Verify" },
  bank: { label: "Payment Method", text: "Verify" },
  profile: {
    label: "Profile Info",
    text: "Update",
    href: `/tasker/${ROUTES.DASHBOARD_ACCOUNT}?tab=account`,
  },
};

export default function VerificationModal({
  open,
  handleClose,
  verifications,
}: ModalType) {
  const verificationList = React.useMemo(
    () =>
      Object.entries(verifications).map(([key, value]) => ({
        key,
        value,
        href: `/tasker/${ROUTES.DASHBOARD_ACCOUNT}?tab=verifications&type=${key}`,
        ...verificationMeta[key as keyof typeof verificationMeta],
      })),
    [verifications]
  );

  return (
    <CustomModal
      isOpen={open}
      onClose={handleClose}
      contentClassName="p-5 sm:p-[30px] rounded-[20px] text-center"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Verify your account</h2>
        <p className="text-sm text-muted-foreground font-medium">
          You need to verify your account before you can make an offer.
        </p>
      </div>

      <Separator className="my-4" />

      <div className="space-y-3">
        {verificationList.map((el, i) => (
          <Card
            key={i}
            className="flex items-center justify-between p-1 pl-4 rounded-lg border shadow-none"
          >
            <span className="text-[16px] font-medium text-black">
              {el.label}
            </span>
            <FormButton
              size="lg"
              className={cn(
                "min-w-[120px] w-fit text-sm btn-secondary",
                el.value && "bg-green-state-color"
              )}
              href={!el.value ? el.href : undefined}
              icon={
                el.value ? (
                  <Icons.greenTick className="[&_path]:stroke-white" />
                ) : undefined
              }
              text={!el.value ? el.text : "Verified"}
              disabled={el.value}
              variant="custom"
            />
          </Card>
        ))}
      </div>
    </CustomModal>
  );
}
