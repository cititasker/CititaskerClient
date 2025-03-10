import FormButton from "@/components/forms/FormButton";
import Icons from "@/components/Icons";
import { defaultProfile } from "@/constant/images";
import { useAppSelector } from "@/store/hook";
import { formatCurrency, loggedInUser } from "@/utils";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import React from "react";
import ReplyOffer from "./ReplyOffer";

interface IProps {
  offer: IOffer;
  toggleModal: any;
}
const TaskerOffer = ({ offer, toggleModal }: IProps) => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="w-full flex gap-4 mb-6 last:mb-0">
      <Image
        src={offer.tasker.profile_image ?? defaultProfile}
        alt="taskers profile"
        width={60}
        height={60}
        className="w-[60px] h-[60px] rounded-full object-cover shrink-0"
      />
      <div className="w-full">
        <div className="w-full mb-2 flex justify-between items-center gap-3">
          <div className="flex items-center gap-1">
            <Typography className="text-black-2 text-xl">
              {loggedInUser(offer.tasker.first_name, offer.tasker.last_name)}
            </Typography>
            <Icons.info />
          </div>
          {offer.status == "pending" && (
            <div className="flex items-center gap-6">
              <Typography className="text-[#000] font-semibold">
                {formatCurrency({
                  value: offer.offer_amount,
                  noFraction: true,
                })}
              </Typography>

              {offer.tasker.id === user.id ? (
                <FormButton
                  text="Withdraw"
                  btnStyle="mb-0"
                  handleClick={() => {
                    toggleModal(offer.id);
                  }}
                />
              ) : null}
            </div>
          )}
        </div>
        <ReplyOffer offer={offer} />
      </div>
    </div>
  );
};

export default TaskerOffer;
