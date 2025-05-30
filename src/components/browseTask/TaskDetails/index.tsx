"use client";
import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Paper } from "@mui/material";

import Icons from "@/components/Icons";
import ShareTaskModal from "../Modals/ShareTaskModal";
import ImageGallery from "../Modals/ImageGalleryModal/ImageGallery";
import CustomTab from "@/components/reusables/CustomTab";
import Offer from "../Offer";
import Question from "../Question";

import useModal from "@/hooks/useModal";
import { styles } from "./styles";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getSingleTaskQuery } from "@/queries/task";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setTaskDetails, setUserTaskOffer } from "@/store/slices/task";
import PosterInfo from "./PosterInfo";

const TaskDetails = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);

  const { data } = useSuspenseQuery(getSingleTaskQuery(id));
  const task: ITask = data.data;

  const {
    isOpen: shareModalOpen,
    openModal: openShareModal,
    closeModal: closeShareModal,
  } = useModal();

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
  }, [hasMadeOffer, task]);

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
        <PosterInfo task={task} hasMadeOffer={hasMadeOffer} />

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
      <ShareTaskModal
        open={shareModalOpen}
        handleClose={closeShareModal}
        handleOpen={openShareModal}
      />
    </Paper>
  );
};

export default TaskDetails;
