"use client";

import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import Icons from "@/components/Icons";
import ShareTaskModal from "../Modals/ShareTaskModal";
import ImageGallery from "../Modals/ImageGalleryModal/ImageGallery";
import CustomTab from "@/components/reusables/CustomTab";
import Offer from "../Offer";
import useModal from "@/hooks/useModal";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setTaskDetails, setUserTaskOffer } from "@/store/slices/task";
import PosterInfo from "./PosterInfo";
import { useFetchTaskById } from "@/services/tasks/tasks.hook";
import { Card } from "@/components/ui/card";

const TaskDetails = () => {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const { data } = useFetchTaskById({ id });
  const task: ITask = data?.data;

  const {
    isOpen: shareModalOpen,
    openModal: openShareModal,
    closeModal: closeShareModal,
  } = useModal();

  useEffect(() => {
    if (task) {
      dispatch(setTaskDetails(task));

      const taskerOffer = task.offers.find(
        (offer) => offer.tasker.id === user?.id
      );
      dispatch(setUserTaskOffer(taskerOffer ?? null));
    }
  }, [task, user?.id, dispatch]);

  const headerMenu = useMemo(
    () => [
      { icon: Icons.share, name: "Share task", action: openShareModal },
      { icon: Icons.flag, name: "Report task", action: () => {} },
      { icon: Icons.bookmark, name: "Save task", action: () => {} },
    ],
    [openShareModal]
  );

  const tabs = task
    ? [
        {
          label: `Offers (${task.offer_count})`,
          value: "offers",
          render: () => <Offer offers={task.offers} />,
        },
      ]
    : [];

  console.log(77, task.offers);

  if (!task) return null;

  return (
    <Card className="hide-scrollbar relative">
      <div className="px-12 h-[65px] flex justify-between items-center border-b sticky top-0 z-[20] bg-white">
        <Link
          href="#"
          onClick={router.back}
          className="flex items-center gap-2 text-base text-primary font-normal"
        >
          <Icons.arrowLeft /> Back to Map
        </Link>
        <div className="flex items-center gap-5">
          {headerMenu.map(({ icon: Icon, name, action }) => (
            <button
              key={name}
              onClick={action}
              className="flex items-center gap-2"
            >
              <Icon fill="red" />
              <p className="text-dark-grey-2 text-sm font-normal">{name}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="px-[30px] pt-[28px] mb-10">
        <PosterInfo task={task} />

        <section className="mb-7">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="text-sm text-black-2">{task.description}</p>
        </section>

        <section className="mb-7">
          <h2 className="text-xl font-semibold mb-4">Pictures</h2>
          {task.images?.length ? (
            <ImageGallery images={task.images} />
          ) : (
            <p>No images available for this task.</p>
          )}
        </section>

        <CustomTab items={tabs} listClassName="mb-7" />
      </div>

      <ShareTaskModal open={shareModalOpen} onClose={closeShareModal} />
    </Card>
  );
};

export default TaskDetails;
