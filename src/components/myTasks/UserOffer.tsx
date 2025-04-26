import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";
import { FaStar } from "react-icons/fa";
import StatusChip from "../reusables/StatusChip";
import { capitalize, formatCurrency, loggedInUser } from "@/utils";
import Icons from "../Icons";
import FormButton from "../forms/FormButton";
import ReplyOffer from "../browseTask/Offer/ReplyOffer";
import { defaultProfile } from "@/constant/images";

interface IProps {
  offer: IOffer;
  task: ITask;
  toggleModal: any;
}

const UserOffer = ({ offer, task, toggleModal }: IProps) => {
  return (
    <div className="mb-5 last:mb-0 border border-light-grey rounded-30 p-5">
      <div className="max-w-[691px] m-auto">
        <div className="mb-6 flex items-center justify-between gap-3">
          <Box display="flex" gap={2}>
            <Avatar
              src={offer.tasker.profile_image ?? defaultProfile}
              alt="User Avatar"
              className="w-[50px] h-[50px]"
            />
            <div className="">
              <Box display="flex" alignItems="center" gap={0.5}>
                <Typography variant="body1" fontWeight="bold">
                  {loggedInUser(
                    offer.tasker.first_name,
                    offer.tasker.last_name
                  )}
                </Typography>
                <Typography variant="body2" sx={{ color: "#F2AF42" }}>
                  5.0
                </Typography>
                <FaStar className="text-[#F2AF42]" />
                <Typography variant="body2" color="textSecondary">
                  (82)
                </Typography>
                {task.tasker?.id === offer.tasker.id && (
                  <StatusChip
                    status={capitalize(task.status)}
                    isActive={false}
                  />
                )}
              </Box>
              <Box display="flex" alignItems="center" gap={2.5} mt={1}>
                <Button
                  startIcon={<Icons.person />}
                  className="text-dark-grey-2"
                >
                  View Profile
                </Button>
                <Button startIcon={<Icons.flag />} className="text-dark-grey-2">
                  Report Offer
                </Button>
              </Box>
            </div>
          </Box>
          <Typography variant="h6" fontWeight="bold">
            {formatCurrency({
              value: offer.offer_amount,
              noFraction: true,
            })}
          </Typography>
        </div>

        {offer.status === "pending" && (
          <FormButton
            text="Accept Offer"
            btnStyle="min-h-[45px] ml-auto max-w-[184px] w-full mb-5 bg-green-state-color"
            handleClick={() => toggleModal(offer)}
          />
        )}
        {task.status === "assigned" &&
          task.tasker?.email === offer.tasker.email && (
            <FormButton
              text="Message"
              btnStyle="text-white min-h-[45px] ml-auto max-w-[184px] w-full mb-5"
              handleClick={() => {}}
            />
          )}
        <ReplyOffer offer={offer} />
      </div>
    </div>
  );
};

export default UserOffer;
