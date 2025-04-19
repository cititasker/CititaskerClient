"use client";
import { Box, SxProps, Theme } from "@mui/material";
import React from "react";
import Icons from "@/components/Icons";
import PaymentStatus from "../PaymentStatus";
import ExtraInfo from "@/components/forms/ExtraInfo";
import CustomModal from "@/components/reusables/CustomModal";
import useModal from "@/hooks/useModal";
import theme from "@/providers/theme";
import PadLock from "@/../public/images/padlock.png";
import Image from "next/image";
import { useAppSelector } from "@/store/hook";
import dynamic from "next/dynamic";

const DojahVerification = dynamic(
  () => import("@/components/DojahVerification"),
  {
    ssr: false,
  }
);

const style: Record<string, SxProps<Theme>> = {
  container: {
    ".MuiAccordion-root": {
      boxShadow: "0px 13px 13px 0px rgba(0, 0, 0, 0.05)",
      border: "1px solid var(--F5F5F5)",
      borderRadius: "20px !important",
      mb: "20px",
      overflow: "hidden",
      bgcolor: "white",

      "&:last-of-type": {
        mb: 0,
      },

      "&:before": {
        display: "none",
      },

      ".MuiAccordion-heading": {
        border: "none",
      },

      ".MuiAccordionSummary-root": {
        height: "80px",
        px: "40px",
        ".MuiAccordionSummary-content": {
          my: 0,
        },
      },
      ".MuiAccordionDetails-root": {
        px: "40px",
      },
      ".Mui-expanded": {
        minHeight: "auto",
      },
      "&.Mui-expanded": {
        minHeight: "auto",
      },
    },
  },
};

const data = [
  "BVN",
  "Government ID such as NIN Slip, Voter’s Card, International Passport, or Driver’s License.",
  "Access to a functioning camera for face validation.",
  "Proof of Address e.g. Utility Bill, Bank Statement or Rent Agreement",
];
const Verifications = () => {
  const { user } = useAppSelector((state) => state.user);
  const idVerification = useModal();
  // const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleSuccess = (res: any) => {
    console.log(456, res);
  };

  // const handleChange =
  //   (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
  //     setExpanded(isExpanded ? panel : false);
  //   };

  // const expandedIcon = (panel: string, status: string) => {
  //   if (expanded === panel) {
  //     if (status == "completed") return null;
  //     else return <Icons.dropdown />;
  //   } else {
  //     if (status == "completed") return <Icons.greenTick />;
  //     else return <Icons.dropdown />;
  //   }
  // };
  return (
    <Box sx={style.container} className="px-12 pt-7">
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-1">Verify Account</h3>
        <p className="text-cs-dark-4">
          Please take a few minutes to complete the following:
        </p>
      </div>
      <div className="mb-[70px]">
        <div
          onClick={idVerification.openModal}
          className="mb-3 cursor-pointer h-[60px] flex items-center gap-[14px] py-3 px-[14px] max-w-[375px] w-full rounded-md bg-F9F9F9"
        >
          <Icons.profileTick />
          <span className="font-semibold">Identity verification</span>
          <PaymentStatus status="on_hold" name="unverified" />
        </div>
        <div className="cursor-pointer h-[60px] flex items-center gap-[14px] py-3 px-[14px] max-w-[375px] w-full rounded-md bg-F9F9F9">
          <Icons.cardPos />
          <span className="font-semibold">Identity verification</span>
          <PaymentStatus status="on_hold" name="unverified" />
        </div>
      </div>
      <ExtraInfo className="w-fit">
        Please ensure that your legal name and date of birth are used to avoid
        having to re-verify.
      </ExtraInfo>
      <p className="text-sm mt-3 text-cs-dark-5">
        Any information captured in this process is used for security purposes
        only. Learn more about CitiTasker{" "}
        <span className="text-secondary">Data Privacy Policy.</span>
      </p>

      <CustomModal
        isOpen={idVerification.isOpen}
        onClose={idVerification.closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        paperStyle={{
          maxWidth: "496px",
          p: "20px",
          [theme.breakpoints.up("sm")]: {
            px: "46px",
            py: "48px",
            borderRadius: "24px",
          },
        }}
        showCloseBtn={false}
      >
        <div className="mb-9">
          <h3 className="text-xl font-semibold mb-3">Verify Identity</h3>
          <p className="max-w-[360px] w-full text-sm">
            To complete the identity verification process. You’ll need the
            following for the identity verification:
          </p>
        </div>
        <ul className="list-outside list-disc pl-5">
          {data.map((el, i) => (
            <li key={i} className="mb-3 last:mb-0">
              {el}
            </li>
          ))}
        </ul>
        <DojahVerification
          text="Verify Identity"
          user={user}
          className="font-normal w-full mt-[63px]"
          handleSuccess={handleSuccess}
        />
        <Image
          src={PadLock}
          alt=""
          width={245}
          height={245}
          className="absolute top-0 bottom-0 right-0 left-0 m-auto"
        />
      </CustomModal>
    </Box>
  );
};

export default Verifications;
