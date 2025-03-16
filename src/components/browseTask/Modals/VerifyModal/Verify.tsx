"use client";
import * as React from "react";
import CustomModal from "@/components/reusables/CustomModal";
import { Button } from "@mui/material";
import Icons from "@/components/Icons";
import theme from "@/providers/theme";

interface ModalType {
  open: boolean;
  handleClose: () => void;
  onContinue: () => void;
}


export default function VerificationModal({ open, handleClose, onContinue }: ModalType) {
  const [isVerified, setIsVerified] = React.useState({
    face: false,
    id: false,
    bank: false,
    home: false,
  });

  const handleVerify = (field: keyof typeof isVerified) => {
    setIsVerified((prev) => ({ ...prev, [field]: true }));
  };

  const allVerified = Object.values(isVerified).every((value) => value);

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
      <h2 id="verify-modal-title" className="text-2xl font-bold mb-2 text-center">
        Verify your account
      </h2>
      <p id="verify-modal-description" className="text-sm mb-3 px-4 font-semibold text-center">
        You need to verify your account before you can make an offer.
      </p>

      <div className="space-y-3">
        {/* Face Verification */}
        <div className="flex items-center border w-full rounded-full h-10 bg-white pl-4">
          <div className="justify-between flex w-full font-medium text-[16px] text-black">
            Face ID
          </div>
          <div className="w-[120px] h-full flex justify-center items-center">
            {!isVerified.face ? (
              <Button variant="contained" className="w-[120px] h-10 rounded-full" onClick={() => handleVerify("face")}>
                Verify
              </Button>
            ) : (
              <Icons.greenTick />
            )}
          </div>
        </div>

        {/* ID Verification */}
        <div className="flex items-center border w-full rounded-full h-10 bg-white pl-4">
          <div className="justify-between flex w-full font-medium text-[16px] text-black">
            ID Verification
          </div>
          <div className="w-[120px] h-full flex justify-center items-center">
            {!isVerified.id ? (
              <Button variant="contained" className="w-[120px] h-10 rounded-full" onClick={() => handleVerify("id")}>
                Upload
              </Button>
            ) : (
              <Icons.greenTick />
            )}
          </div>
        </div>

        {/* Bank Details Verification */}
        <div className="flex items-center border w-full rounded-full h-10 bg-white pl-4">
          <div className="justify-between flex w-full font-medium text-[16px] text-black">
            Bank Details
          </div>
          <div className="w-[120px] h-full flex justify-center items-center">
            {!isVerified.bank ? (
              <Button variant="contained" className="w-[120px] h-10 rounded-full" onClick={() => handleVerify("bank")}>
                Verify
              </Button>
            ) : (
              <Icons.greenTick />
            )}
          </div>
        </div>

        {/* Home Address Verification */}
        <div className="flex items-center border w-full rounded-full h-10 bg-white pl-4">
          <div className="justify-between flex w-full font-medium text-[16px] text-black">
            Home Address
          </div>
          <div className="w-[120px] h-full flex justify-center items-center">
            {!isVerified.home ? (
              <Button variant="contained" className="w-[120px] h-10 rounded-full" onClick={() => handleVerify("home")}>
                Upload
              </Button>
            ) : (
              <Icons.greenTick />
            )}
          </div>
        </div>
      </div>

      <Button
          variant="contained"
          color="primary"
          className="mt-4 w-full h-12 rounded-full"
          disabled={!allVerified} 
          onClick={() => {
            if (allVerified) {
              onContinue(); 
            }
          }}
        >
          Continue
        </Button>

    </CustomModal>
  );
}
