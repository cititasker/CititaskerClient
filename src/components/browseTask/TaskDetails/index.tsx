"use client";
import {
  Button,
  Chip,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { styles } from "./styles";
import FormButton from "@/components/forms/FormButton";
import MakeOfferModal from "../Modals";
import ShareTaskModal from "../Modals/ShareTaskModal";
import useModal from "@/hooks/useModal";
import Icons from "@/components/Icons";
import { getSingleTaskQuery } from "@/queries/task";
import { useParams } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  cn,
  convertDate,
  formatCurrency,
  formatDateAgo,
  initializeName,
  truncate,
} from "@/utils";
import CustomTab from "@/components/reusables/CustomTab";
import Offer from "../Offer";
import Question from "../Question";
import { defaultProfile } from "@/constant/images";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setTaskDetails, setUserTaskOffer } from "@/store/slices/task";

const TaskDetails = () => {
  const { isAuth, user } = useAppSelector((state) => state.user);
  const [open, setOpen] = React.useState(false);
  const prevOpen = React.useRef(open);
  const dispatch = useAppDispatch();
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const {
    isOpen,
    openModal: openShareModal,
    closeModal: closeShareModal,
  } = useModal();
  const {
    isOpen: nextModalOpen,
    openModal: openNextModal,
    closeModal: closeNextModal,
  } = useModal();

  const { id } = useParams() as any;

  const { data } = useSuspenseQuery(getSingleTaskQuery(id));

  const task: ITask = data.data;

  useEffect(() => {
    if (task) {
      dispatch(setTaskDetails(task));
    }
  }, [task]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleShareTaskAction = () => {
    openShareModal();
  };

  const hasMadeOffer = useMemo(
    () => task.offers.some((el) => el.tasker.id === user?.id),
    [task, user]
  );

  const buttonText = useMemo(() => {
    if (task.status == "open" && !hasMadeOffer) return "Make an offer";
    else if (task.status == "open" && hasMadeOffer) return "Update Offer";
    else if (task.status == "assigned") return "Assigned";
  }, [task, hasMadeOffer]);

  useEffect(() => {
    const taskersOffer =
      task.offers.find((el) => el.tasker.id == user.id) ?? null;
    dispatch(setUserTaskOffer(taskersOffer));
  }, [hasMadeOffer]);

  const headerMenu = [
    { icon: Icons.share, name: "Share task", action: handleShareTaskAction },
    { icon: Icons.flag, name: "Report task" },
    { icon: Icons.bookmark, name: "Save task" },
  ];

  return (
    <Paper
      sx={styles.container}
      elevation={0}
      className="hide-scrollbar relative"
    >
      <div className="px-[48px] h-[65px] flex justify-between items-center border-b sticky top-0 z-[20] bg-white">
        <Link
          href="/browse-task"
          className="flex items-center gap-2 text-base text-primary font-normal"
        >
          <Icons.arrowLeft />
          Back to Map
        </Link>
        <div className="flex items-center gap-5">
          {headerMenu.map((el) => (
            <button
              key={el.name}
              onClick={el.action}
              className="flex items-center gap-2 cursor-pointer"
            >
              <el.icon fill="red" />

              <p className="text-dark-grey-2 text-[0.875rem] font-normal">
                {el.name}
              </p>
            </button>
          ))}
        </div>
      </div>
      <div className="px-[30px] pt-[28px] mb-10">
        <div className="flex gap-7 mb-[48px] w-full">
          <div className="shrink-0 h-fit">
            <Image
              src={task.poster_profile_image ?? defaultProfile}
              alt="poster image"
              width={60}
              height={60}
              className="w-[60px] h-[60px] object-cover rounded-full"
            />
            <div className="w-fit mx-auto mt-2">
              <p className="text-black-2 text-xs font-semibold mb-1">
                Posted by
              </p>
              <p className="text-dark-grey-2 font-normal text-xs text-center">
                {initializeName({
                  first_name: task.poster?.profile?.first_name,
                  last_name: task.poster?.profile?.last_name,
                })}
              </p>
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-center gap-5 mb-5">
              <Chip
                label="Open"
                className={cn(
                  " text-[0.625rem] font-normal h-[26px]",
                  task.status == "open" ? "bg-light-primary-2" : "bg-light-grey"
                )}
              />
              <Chip
                label="Assigned"
                className={cn(
                  " text-[0.625rem] font-normal h-[26px]",
                  task.status == "assigned"
                    ? "bg-light-primary-2"
                    : "bg-light-grey"
                )}
              />
              <Chip
                label="Completed"
                className={cn(
                  " text-[0.625rem] font-normal h-[26px]",
                  task.status == "completed"
                    ? "bg-light-primary-2"
                    : "bg-light-grey"
                )}
              />
            </div>
            <div className="flex justify-between gap-5 w-full">
              <div className="max-w-[250px] w-full">
                <h1 className="text-2xl font-semibold text-black-2">
                  {task.name}
                </h1>
                <div className="mt-5 flex flex-col gap-4">
                  <div className="flex items-center gap-x-4">
                    <Icons.distance width={20} height={20} />
                    <div>
                      <p className="text-black-2 text-xs font-semibold mb-0.5">
                        Location
                      </p>
                      <p
                        className="text-dark-grey-2 text-xs font-normal"
                        title={task.address}
                      >
                        {truncate(task.address, 20)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-4">
                    <Icons.calendar width={18} height={18} />
                    <div>
                      <p className="text-black-2 text-xs font-semibold mb-0.5">
                        Due Date
                      </p>
                      <p className="text-dark-grey-2 text-xs font-normal">
                        {convertDate(task.date, "MMM DD, YYYY")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-4">
                    <Icons.avTimer />
                    <div>
                      <p className="text-black-2 text-xs font-semibold mb-0.5">
                        Posted
                      </p>
                      <p className="text-dark-grey-2 text-xs font-normal">
                        {formatDateAgo(task.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="rounded-[10px] p-[17px] bg-light-primary-1 text-center flex flex-col items-center">
                  <p className="text-dark-grey-2 text-sm font-normal mb-5">
                    Estimated Task Budget
                  </p>
                  <h2 className="font-semibold text-[2rem] text-black-2 mb-[20px]">
                    {formatCurrency({ value: task.budget, noFraction: true })}
                  </h2>
                  <FormButton
                    handleClick={openNextModal}
                    btnStyle="min-h-[39px] text-base font-normal"
                    disabled={task.status !== "open"}
                  >
                    {buttonText}
                  </FormButton>
                </div>
                {isAuth && (
                  <div className="menu">
                    <Button
                      ref={anchorRef}
                      id="composition-button"
                      aria-controls={open ? "composition-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={handleToggle}
                      // endIcon={<KeyboardArrowDownIcon />}
                      className="!bg-light-grey mt-2 w-full text-black-2"
                    >
                      More Options
                    </Button>
                    <Popper
                      open={open}
                      anchorEl={anchorRef.current}
                      role={undefined}
                      placement="bottom-start"
                      transition
                      disablePortal
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin:
                              placement === "bottom-start"
                                ? "left top"
                                : "left bottom",
                          }}
                        >
                          <Paper elevation={0} className="paper">
                            <ClickAwayListener onClickAway={handleClose}>
                              <MenuList
                                disablePadding
                                autoFocusItem={open}
                                id="composition-menu"
                                aria-labelledby="composition-button"
                                onKeyDown={handleListKeyDown}
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
        <div>
          <div className="mb-7">
            <p className="mb-4 text-xl font-semibold text-black-2">
              Description
            </p>
            <p className="text-sm font-normal text-black-2">
              {task.description}
            </p>
          </div>
          <div className="mb-7">
            <p className="mb-4 text-xl font-semibold text-black-2">Pictures</p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-3 items-center">
              {task.images.map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt=""
                  width={100}
                  height={90}
                  className="h-[90px] object-cover rounded-[10px] border border-dark-grey-1 overflow-hidden"
                />
              ))}
            </div>
          </div>
          <CustomTab tabs={["Offers", "Questions"]}>
            <Offer offers={task.offers} />
            <Question />
          </CustomTab>
        </div>
      </div>

      {nextModalOpen && (
        <MakeOfferModal
          open={nextModalOpen}
          handleClose={closeNextModal}
          handleOpen={openNextModal}
        />
      )}
      <ShareTaskModal
        open={isOpen}
        handleClose={closeShareModal}
        handleOpen={openShareModal}
      />
    </Paper>
  );
};

export default TaskDetails;
