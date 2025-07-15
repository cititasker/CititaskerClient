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
    face: boolean;
    id: boolean;
    bank: boolean;
    home: boolean;
    profile: boolean;
  };
}

const verificationMeta = {
  face: { label: "Face ID", text: "Verify" },
  id: { label: "ID Verification", text: "Upload" },
  bank: { label: "Bank Details", text: "Verify" },
  home: { label: "Home Address", text: "Upload" },
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
            className="flex items-center justify-between pl-4 pr-2 py-2 rounded-full border"
          >
            <span className="text-[16px] font-medium text-black">
              {el.label}
            </span>
            <FormButton
              size="lg"
              className={cn(
                "min-w-[120px] w-fit text-sm",
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
            />
          </Card>
        ))}
      </div>
    </CustomModal>
  );
}
