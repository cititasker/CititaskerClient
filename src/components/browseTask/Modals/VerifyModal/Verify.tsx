"use client";
import * as React from "react";
import CustomModal from "@/components/reusables/CustomModal";
import Icons from "@/components/Icons";
import theme from "@/providers/theme";
import FormButton from "@/components/forms/FormButton";

interface ModalType {
  open: boolean;
  handleClose: () => void;
  verifications: any;
}

export default function VerificationModal({
  open,
  handleClose,
  verifications,
}: ModalType) {
  const verificationList = React.useMemo(() => {
    return Object.entries(verifications).map(([key, value]) => {
      switch (key) {
        case "face": {
          return { label: "Face ID", key, value, href: "#", text: "Verify" };
        }
        case "id": {
          return {
            label: "ID Verification",
            key,
            value,
            href: "#",
            text: "Upload",
          };
        }
        case "bank": {
          return {
            label: "Bank Details",
            key,
            value,
            href: "#",
            text: "Verify",
          };
        }
        case "home": {
          return {
            label: "Home Address",
            key,
            value,
            href: "#",
            text: "Upload",
          };
        }
      }
    });
  }, [verifications]);

  return (
    <CustomModal
      isOpen={open}
      onClose={handleClose}
      aria-labelledby="verify-modal-title"
      aria-describedby="verify-modal-description"
      paperStyle={{
        maxWidth: "576px",
        p: "20px",
        textAlign: "center",
        [theme.breakpoints.up("sm")]: {
          px: "100px",
          pt: "20px",
          pb: "30px",
          borderRadius: "20px",
        },
      }}
    >
      <h2
        id="verify-modal-title"
        className="text-2xl font-bold mb-2 text-center"
      >
        Verify your account
      </h2>
      <p
        id="verify-modal-description"
        className="text-sm mb-3 px-4 font-semibold text-center"
      >
        You need to verify your account before you can make an offer.
      </p>

      <div className="space-y-3">
        {verificationList.map((el, i) => (
          <div
            key={i}
            className="flex items-center justify-between border w-full rounded-full h-[45px] pl-4 pr-[3px] py-[3px]"
          >
            <div className="justify-between flex w-full font-medium text-[16px] text-black">
              {el?.label}
            </div>
            <div className="h-full">
              {!el?.value ? (
                <FormButton
                  btnStyle="min-w-[120px] w-fit h-full"
                  href={el?.href}
                >
                  {el?.text}
                </FormButton>
              ) : (
                <Icons.greenTick />
              )}
            </div>
          </div>
        ))}
      </div>
    </CustomModal>
  );
}
