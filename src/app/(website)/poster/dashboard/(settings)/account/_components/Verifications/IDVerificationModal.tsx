import React from "react";
import CustomModal from "@/components/reusables/CustomModal";
import DojahVerification from "@/components/DojahVerification";
import Image from "next/image";
import PadLock from "@/../public/images/padlock.png";
import { data } from "../../_utils/constant";

interface IDVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleSuccess: (res: any) => void;
  user: Partial<IUser>;
}

const IDVerificationModal: React.FC<IDVerificationModalProps> = ({
  isOpen,
  onClose,
  handleSuccess,
  user,
}) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <div>
        <div className="mb-9">
          <h3 className="text-xl font-semibold mb-3">Verify Identity</h3>
          <p className="max-w-[360px] w-full text-sm">
            To complete the identity verification process, you’ll need the
            following:
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
      </div>
    </CustomModal>
  );
};

export default IDVerificationModal;
