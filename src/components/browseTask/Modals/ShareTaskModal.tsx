"use client";
import * as React from "react";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import Image from "next/image";
import { Modal } from "@mui/material";
import CustomModal from "@/components/reusables/CustomModal";
import theme from "@/providers/theme";

interface ModalType {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

export default function ShareTaskModal({
  open,
  handleOpen,
  handleClose,
}: ModalType) {
  return (
    <div>
      <CustomModal
        isOpen={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        paperStyle={{
          maxWidth: "576px",
          p: "20px",

          [theme.breakpoints.up("sm")]: {
            px: "34px",
            py: "24px",
            borderRadius: "40px",
          },
        }}
      >
        <div className="flex flex-col">
          <div className="mx-auto text-center mt-20">
            <p className="text font-semibold text-2xl text-black-2">
              Share this task
            </p>
            <p className="text-center font-normal mt-2 text-base text-wrap w-[417px]">
              Spread the word about this task on your social media account
            </p>
          </div>

          <div className="flex gap-4 mt-[44px] mb-20 mx-auto">
            <div className="cursor-pointer border border-dark-grey-1 w-14 h-14 shrink-0 grow-0 rounded-full grid place-content-center">
              <Image
                src="/icons/facebook.svg"
                alt="facebook"
                width={24}
                height={26}
              />
            </div>
            <div className="cursor-pointer border border-dark-grey-1 w-14 h-14 shrink-0 grow-0 rounded-full grid place-content-center">
              <Image
                src="/icons/whatsapp.svg"
                alt="facebook"
                width={28}
                height={28}
              />
            </div>
            <div className="cursor-pointer border border-dark-grey-1 w-14 h-14 shrink-0 grow-0 rounded-full grid place-content-center">
              <Image
                src="/icons/twitter.svg"
                alt="facebook"
                width={28}
                height={28}
              />
            </div>
            <div className="cursor-pointer border border-dark-grey-1 w-14 h-14 shrink-0 grow-0 rounded-full grid place-content-center">
              <Image
                src="/icons/instagram.svg"
                alt="facebook"
                width={28}
                height={28}
              />
            </div>
          </div>
        </div>
      </CustomModal>
    </div>
  );
}

const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>(function Backdrop(props, ref) {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "base-Backdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const BaseModal = styled(Modal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled("div")(
  ({ theme }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 40px;
    border: 1px solid transparent;
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};

    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};
    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;

      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
);

const TriggerButton = styled("button")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &:hover {
      background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
    }

    &:active {
      background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
    }

    &:focus-visible {
      box-shadow: 0 0 0 4px
        ${theme.palette.mode === "dark" ? blue[300] : blue[200]};
      outline: none;
    }
  `
);
