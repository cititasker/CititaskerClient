"use client";
import * as React from "react";
import Image from "next/image";
import CustomModal from "@/components/reusables/CustomModal";
import theme from "@/providers/theme";

interface ModalType {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

export default function ShareTaskModal({ open, handleClose }: ModalType) {
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
