import Icons from "@/components/Icons";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import React from "react";
import PaymentStatus from "../PaymentStatus";
import { useAppSelector } from "@/store/hook";
import DojahVerification from "@/components/DojahVerification";

function BVNVerification() {
  const { user } = useAppSelector((state) => state.user);

  const handleSuccess = (res: any) => {
    console.log(456, res);
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<Icons.dropdown />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className="flex items-center gap-5">
          <Typography className="text-base text-black">
            BVN Verification
          </Typography>
          <PaymentStatus status="on_hold" name="Action Needed" />
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="w-full min-h-[300px] relative">
          <DojahVerification
            text="Start Verification"
            user={user}
            className="absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%] font-medium rounded-[9.75px]"
            handleSuccess={handleSuccess}
          />
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default BVNVerification;
