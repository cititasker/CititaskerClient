"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  Paper,
  Chip,
  Button,
  Popper,
  Grow,
  MenuList,
  MenuItem,
  ClickAwayListener,
} from "@mui/material";

import Icons from "@/components/Icons";
import FormButton from "@/components/forms/FormButton";
import MakeOfferModal from "../Modals";
import ShareTaskModal from "../Modals/ShareTaskModal";
import VerificationModal from "../Modals/VerifyModal/Verify";
import ImageGallery from "../Modals/ImageGalleryModal/ImageGallery";
import CustomTab from "@/components/reusables/CustomTab";
import Offer from "../Offer";
import Question from "../Question";

import useModal from "@/hooks/useModal";
import { styles } from "./styles";
import { defaultProfile } from "@/constant/images";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getSingleTaskQuery } from "@/queries/task";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setTaskDetails, setUserTaskOffer } from "@/store/slices/task";
import {
  cn,
  convertDate,
  formatCurrency,
  formatDateAgo,
  initializeName,
  truncate,
} from "@/utils";

const TaskDetails = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuth, user } = useAppSelector((state) => state.user);

  const { data } = useSuspenseQuery(getSingleTaskQuery(id));
  const task: ITask = data.data;

  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [openMoreOptions, setOpenMoreOptions] = useState(false);
  const moreOptionsRef = useRef<HTMLButtonElement>(null);
  const prevOpen = useRef(openMoreOptions);

  const {
    isOpen: shareModalOpen,
    openModal: openShareModal,
    closeModal: closeShareModal,
  } = useModal();
  const {
    isOpen: offerModalOpen,
    openModal: openOfferModal,
    closeModal: closeOfferModal,
  } = useModal();

  const verifications = useMemo(
    () => ({ face: false, id: false, bank: false, home: false }),
    []
  );

  useEffect(() => {
    if (task) dispatch(setTaskDetails(task));
  }, [task]);

  const hasMadeOffer = useMemo(
    () => task.offers.some((el) => el.tasker.id === user?.id),
    [task, user]
  );

  useEffect(() => {
    const taskerOffer =
      task.offers.find((el) => el.tasker.id === user?.id) ?? null;
    dispatch(setUserTaskOffer(taskerOffer));
  }, [hasMadeOffer]);

  const buttonText = useMemo(() => {
    if (task.status === "open" && !hasMadeOffer) return "Make an Offer";
    if (task.status === "open" && hasMadeOffer) return "Update Offer";
    if (task.status === "assigned") return "Assigned";
    return "Unavailable";
  }, [task.status, hasMadeOffer]);

  const handleButtonClick = () => {
    const isAllVerified = Object.values(verifications).every(Boolean);
    isAllVerified ? setVerifyModalOpen(true) : openOfferModal();
  };

  const handleToggleMoreOptions = () => setOpenMoreOptions((prev) => !prev);
  const handleCloseMoreOptions = (event: Event | React.SyntheticEvent) => {
    if (moreOptionsRef.current?.contains(event.target as HTMLElement)) return;
    setOpenMoreOptions(false);
  };

  useEffect(() => {
    if (prevOpen.current && !openMoreOptions) moreOptionsRef.current?.focus();
    prevOpen.current = openMoreOptions;
  }, [openMoreOptions]);

  const headerMenu = [
    { icon: Icons.share, name: "Share task", action: openShareModal },
    { icon: Icons.flag, name: "Report task" },
    { icon: Icons.bookmark, name: "Save task" },
  ];

  return (
    <Paper
      sx={styles.container}
      elevation={0}
      className="hide-scrollbar relative"
    >
      <div className="px-12 h-[65px] flex justify-between items-center border-b sticky top-0 z-[20] bg-white">
        <Link
          href="#"
          onClick={router.back}
          className="flex items-center gap-2 text-base text-primary font-normal"
        >
          <Icons.arrowLeft /> Back to Map
        </Link>
        <div className="flex items-center gap-5">
          {headerMenu.map((item) => (
            <button
              key={item.name}
              onClick={item.action}
              className="flex items-center gap-2"
            >
              <item.icon fill="red" />
              <p className="text-dark-grey-2 text-sm font-normal">
                {item.name}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="px-[30px] pt-[28px] mb-10">
        {/* Poster Info & Task Header */}
        <div className="flex gap-7 mb-[48px]">
          <div className="shrink-0">
            <Image
              src={task.poster_profile_image ?? defaultProfile}
              alt="poster"
              width={60}
              height={60}
              className="rounded-full object-cover"
            />
            <div className="text-center mt-2">
              <p className="text-black-2 text-xs font-semibold mb-1">
                Posted by
              </p>
              <p className="text-dark-grey-2 text-xs">
                {initializeName(task.poster?.profile)}
              </p>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex gap-3 mb-5">
              {["open", "assigned", "completed"].map((status) => (
                <Chip
                  key={status}
                  label={status.charAt(0).toUpperCase() + status.slice(1)}
                  className={cn(
                    "text-xs h-[26px] font-normal",
                    task.status === status
                      ? "bg-light-primary-2"
                      : "bg-light-grey"
                  )}
                />
              ))}
            </div>

            <div className="flex justify-between gap-5">
              <div className="max-w-[250px]">
                <h1 className="text-2xl font-semibold text-black-2">
                  {task.name}
                </h1>
                <div className="mt-5 flex flex-col gap-4">
                  {[
                    {
                      icon: <Icons.distance width={20} height={20} />,
                      label: "Location",
                      value: truncate(task.address, 20),
                    },
                    {
                      icon: <Icons.calendar width={18} height={18} />,
                      label: "Due Date",
                      value: convertDate(task.date, "MMM DD, YYYY"),
                    },
                    {
                      icon: <Icons.avTimer />,
                      label: "Posted",
                      value: formatDateAgo(task.created_at),
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      {item.icon}
                      <div>
                        <p className="text-black-2 text-xs font-semibold mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-dark-grey-2 text-xs">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget Box */}
              <div>
                <div className="rounded-[10px] p-[17px] bg-light-primary-1 text-center">
                  <p className="text-dark-grey-2 text-sm mb-5">
                    Estimated Task Budget
                  </p>
                  <h2 className="text-[2rem] font-semibold text-black-2 mb-5">
                    {formatCurrency({ value: task.budget, noFraction: true })}
                  </h2>
                  <FormButton
                    handleClick={handleButtonClick}
                    btnStyle="min-h-[39px] min-w-40 text-base font-normal"
                    disabled={task.status !== "open"}
                  >
                    {buttonText}
                  </FormButton>
                </div>
                {isAuth && (
                  <div className="mt-2">
                    <Button
                      ref={moreOptionsRef}
                      onClick={handleToggleMoreOptions}
                      className="!bg-light-grey w-full text-black-2"
                    >
                      More Options
                    </Button>
                    <Popper
                      open={openMoreOptions}
                      anchorEl={moreOptionsRef.current}
                      placement="bottom-start"
                      transition
                      disablePortal
                      className="max-w-[194px] w-full bg-white border border-light-grey"
                    >
                      {({ TransitionProps }) => (
                        <Grow
                          {...TransitionProps}
                          style={{ transformOrigin: "left top" }}
                        >
                          <Paper elevation={0} className="w-full">
                            <ClickAwayListener
                              onClickAway={handleCloseMoreOptions}
                            >
                              <MenuList
                                autoFocusItem={openMoreOptions}
                                disablePadding
                              >
                                <MenuItem component={Link} href="/profile">
                                  Profile
                                </MenuItem>
                                <MenuItem component={Link} href="/dashboard">
                                  My account
                                </MenuItem>
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Description & Images */}
        <div className="mb-7">
          <p className="text-xl font-semibold mb-4">Description</p>
          <p className="text-sm text-black-2">{task.description}</p>
        </div>

        <div className="mb-7">
          <p className="text-xl font-semibold mb-4">Pictures</p>
          {task.images?.length ? (
            <ImageGallery images={task.images} />
          ) : (
            <p>No images available for this task.</p>
          )}
        </div>

        <CustomTab tabs={["Offers", "Questions"]}>
          <Offer offers={task.offers} />
          <Question />
        </CustomTab>
      </div>

      <VerificationModal
        open={verifyModalOpen}
        handleClose={() => setVerifyModalOpen(false)}
        verifications={verifications}
      />
      <MakeOfferModal
        open={offerModalOpen}
        handleClose={closeOfferModal}
        handleOpen={openOfferModal}
      />
      <ShareTaskModal
        open={shareModalOpen}
        handleClose={closeShareModal}
        handleOpen={openShareModal}
      />
    </Paper>
  );
};

export default TaskDetails;
