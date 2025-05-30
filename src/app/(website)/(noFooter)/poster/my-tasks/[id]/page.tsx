"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popper from "@mui/material/Popper";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import { styles } from "./styles";
import Icons from "@/components/Icons";
import Image from "next/image";
import FormButton from "@/components/forms/FormButton";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { getUserTaskByIdQuery } from "@/queries/task";
import {
  errorHandler,
  formatCurrency,
  formatDate,
  initializeName,
} from "@/utils";
import ConfirmationModal from "@/components/reusables/Modals/ConfirmationModal";
import { defaultProfile } from "@/constant/images";
import FormCheckbox from "@/components/forms/FormCheckbox";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Paystack from "@/utils/paystackSetup";
import CustomModal from "@/components/reusables/CustomModal";
import theme from "@/providers/theme";
import ExtraInfo from "@/components/forms/ExtraInfo";
import ActionsButtons from "@/components/reusables/ActionButtons";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { paymentReference } from "@/services/user";
import { queryClient } from "@/providers/ServerProvider";
import { USER_TASK_ID } from "@/queries/queryKeys";
import AllOffers from "@/components/myTasks/AllOffers";
import CustomTab from "@/components/reusables/CustomTab";
import Questions from "@/components/myTasks/Questions";
import Reviews from "@/components/myTasks/Reviews";

const moreOptions = [
  { text: "Cancel Task", name: "cancel" },
  { text: "Reschedule Task", name: "reschedule" },
  { text: "Post Similar Task", name: "similar-task" },
  { text: "Refund Details", name: "refund" },
  { text: "Help", name: "help" },
];

const schema = z.object({
  agreed: z
    .boolean()
    .default(false)
    .refine((value) => value, {
      message: "Please confirm you agree to the terms and condition",
    }),
});

type schemaType = z.infer<typeof schema>;

export default function Offer() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<IOffer | null>(null);
  const { id } = useParams() as any;
  const { data } = useSuspenseQuery(getUserTaskByIdQuery(id));
  const task: ITask = data.data;
  const status = task.status;
  const navigate = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  const methods = useForm<schemaType>({
    defaultValues: {
      agreed: false,
    },
    resolver: zodResolver(schema),
  });

  const { handleSubmit } = methods;

  const paymentIntentMutation = useMutation({
    mutationFn: paymentReference,
    onSuccess: (data) => {
      toggleModal();
      const { amount, hash_id } = data.data;
      Paystack.startPayment({
        email: task.poster.email,
        amount: amount * 100,
        reference: hash_id,
        handleSuccess,
      });
    },
    onError(error) {
      showSnackbar(errorHandler(error), "error");
    },
  });

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

  const toggleModal = (value?: any) => {
    setShowAcceptModal((prev) => {
      if (prev) {
        setSelectedOffer(null);
      } else {
        setSelectedOffer(value);
      }
      return !prev;
    });
  };

  const toggleSuccessModal = () => {
    setIsSuccess((prev) => !prev);
  };

  const renderTaskStatus = () => {
    switch (status) {
      case "assigned":
        return {
          title: "Task Assigned",
          content: `Wait for your task to be completed. Completion date: ${formatDate(
            task.date,
            "DD MMM, YYYY"
          )}`,
        };
      case "completed":
        return { title: "Release Payment" };
      default:
        return {
          title: `You have ${task.offer_count} offers`,
          content:
            "Discuss details with Taskers and accept an offer when you're ready.",
        };
    }
  };

  const handleSuccess = (data: any) => {
    console.log(data);
    queryClient.invalidateQueries({ queryKey: USER_TASK_ID(id) });
    toggleSuccessModal();
  };

  const handlePayment = async () => {
    paymentIntentMutation.mutateAsync({
      offer_id: selectedOffer?.id,
      task_id: task.id,
    });
  };

  const handleAction = () => {
    if (status === "open") {
      navigate.push(`/post-task/${id}`);
    }
  };

  console.log(899, task);

  const buttonText =
    status == "open"
      ? "Edit Task"
      : status == "assigned"
      ? "Pay Surcharge"
      : null;

  return (
    <Box sx={styles.container}>
      <Grid container spacing="32px" className="max-w-[1300px] mx-auto px-5">
        <Grid size={{ xs: 12, md: 5 }}>
          <div
            onClick={router.back}
            className="text-primary cursor-pointer my-6 text-[16px] underline font-bold flex gap-2 items-center"
          >
            <Icons.arrowLeft />
            Back to citiTasker
          </div>
          <Card className="bg-black rounded-[30px] text-white px-[26px] py-[34px] mb-6">
            <span className="bg-[#FB9596] px-4 py-2 rounded-[40px] inline-block mb-6 text-base">
              New Offer!
            </span>
            <Typography className="text-[2rem] font-semibold mb-1">
              {renderTaskStatus().title}
            </Typography>
            <Typography className="text-sm font-normal text-dark-grey-1">
              {renderTaskStatus().content}
            </Typography>
          </Card>

          <Card elevation={0} className="paper py-6 px-[18px]">
            <div className="flex gap-5">
              {task.images.length ? (
                <Image
                  src={task.images[0]}
                  alt=""
                  width={116}
                  height={109}
                  className="rounded-[10px] w-[116px] h-[109px] object-cover"
                />
              ) : null}
              <div className="w-full mb-7">
                <Typography className="text-black text-2xl font-semibold mb-3">
                  {task.name}
                </Typography>
                <div className="flex items-start gap-4">
                  <Icons.calendar
                    width={18}
                    height={18}
                    className="shrink-0 mt-2"
                  />
                  <div className="flex justify-between items-center gap-3 w-full">
                    <div>
                      <Typography className="text-base font-semibold text-black mb-1.5">
                        Due Date
                      </Typography>
                      <Typography className="text-sm text-dark-grey-2 font-normal leading-none">
                        {formatDate(task.date, "DD MMM YYYY")}
                      </Typography>
                    </div>
                    {task.status == "open" ? (
                      <FormButton
                        className="bg-transparent text-primary text-sm"
                        handleClick={() =>
                          navigate.push(`/post-task/${task.id}?step=3`)
                        }
                      >
                        Edit
                      </FormButton>
                    ) : null}
                  </div>
                </div>
                <div className="flex items-start gap-4 mt-2">
                  <Icons.database
                    width={17}
                    height={17}
                    className="shrink-0 mt-2"
                  />
                  <div className="flex justify-between items-center gap-3 w-full">
                    <div className="">
                      <Typography className="text-base font-semibold text-black mb-1.5">
                        Price
                      </Typography>
                      <Typography className="text-sm text-dark-grey-2 font-normal leading-none">
                        {formatCurrency({
                          value: task.budget,
                          noFraction: true,
                        })}
                      </Typography>
                    </div>
                    {task.status == "open" ? (
                      <FormButton
                        className="bg-transparent text-primary text-sm"
                        handleClick={() =>
                          navigate.push(`/post-task/${task.id}?step=4`)
                        }
                      >
                        Edit
                      </FormButton>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <Typography className="text-black text-base font-normal">
              {task.description}
            </Typography>
            <div className="flex mt-[68px] gap-[13px]">
              <div className="menu flex-1">
                <Button
                  ref={anchorRef}
                  id="composition-button"
                  aria-controls={open ? "composition-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                  endIcon={<Icons.dropdown />}
                  className="rounded-[25px] text-base bg-light-grey text-black px-[15px] h-full w-full"
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
                            {moreOptions.map((el, i) => (
                              <MenuItem key={i} onClick={handleClose}>
                                {el.text}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>

              <FormButton
                className="flex-1 text-base"
                handleClick={handleAction}
              >
                {buttonText}
              </FormButton>
            </div>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }} sx={{ minHeight: "100%" }}>
          <CustomTab
            tabs={[`Offers (${task.offer_count})`, "Questions (3)", "Reviews"]}
            sx={styles.tabs}
          >
            <AllOffers task={task} toggleModal={toggleModal} />
            <Questions />
            <Reviews />
          </CustomTab>
        </Grid>
      </Grid>
      <ConfirmationModal
        open={showAcceptModal}
        onClose={toggleModal}
        showBtnActions={false}
      >
        <div className="pt-[42px] pb-[34px]">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handlePayment)}>
              <div className="flex gap-5 items-center mb-8">
                <Image
                  src={defaultProfile}
                  alt=""
                  width={60}
                  height={60}
                  className="w-[60px] h-[60px] rounded-full object-cover"
                />
                <div>
                  <Typography className="mb-1 text-black-2 text-xl font-semibold">
                    {initializeName({
                      first_name: selectedOffer?.tasker.first_name,
                      last_name: selectedOffer?.tasker.last_name,
                    })}
                  </Typography>
                  <Typography className="text-base text-dark-grey-2">
                    {task.name}
                  </Typography>
                </div>
              </div>
              <div className="mb-10">
                <Typography className="text-xl font-semibold text-dark-grey-2 mb-6">
                  Summary
                </Typography>
                <div className="flex justify-between gap-4 pb-4 mb-4 border-b-[0.8px] border-light-grey">
                  <Typography className="font-semibold text-black">
                    Total offer for the task
                  </Typography>
                  <Typography className="font-semibold text-black">
                    {formatCurrency({ value: selectedOffer?.offer_amount })}
                  </Typography>
                </div>
                <div className="flex justify-between gap-4">
                  <Typography className="font-semibold text-black">
                    Total
                  </Typography>
                  <Typography className="font-semibold text-black">
                    {formatCurrency({ value: selectedOffer?.offer_amount })}
                  </Typography>
                </div>
              </div>
              <div className="flex gap-3 mb-4">
                <Icons.info width={32} height={32} />
                <div>
                  <p className="text-black-2 font-semibold text-base mb-1">
                    Cancellation Policy
                  </p>
                  <p className="text-sm text-black-2">
                    If you are responsible for cancelling this task, the
                    Connection fee will be non-refundable.{" "}
                    <Link href="#" className="text-sm text-primary">
                      Learn more
                    </Link>
                  </p>
                </div>
              </div>
              <FormCheckbox
                name="agreed"
                label={
                  <p className="text-black-2">
                    I accept the{" "}
                    <Link href="#" className="text-primary">
                      Terms & Conditions
                    </Link>{" "}
                    including{" "}
                    <Link href="#" className="text-primary">
                      Insurance.
                    </Link>{" "}
                    Please note that payment will be secured on CitiTasker until
                    you’re happy the task has been completed.{" "}
                  </p>
                }
              />
              <FormButton
                text="Securely hold payment"
                className="w-full mt-10"
                type="submit"
                loading={paymentIntentMutation.isPending}
              />
            </form>
          </FormProvider>
        </div>
      </ConfirmationModal>

      <CustomModal
        isOpen={isSuccess}
        onClose={toggleSuccessModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        confetti
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
        <div>
          <div className=" mt-10 w-full">
            <Image
              src="/icons/check_circle.svg"
              alt="cancel"
              width={80}
              height={80}
              className="mx-auto"
            />
            <Typography className="mt-3 text-xl text-black-2 font-semibold text-center">
              Payment Successfully Secured 🎉
            </Typography>
          </div>
          <p className="text-center text-wrap text-base font-normal my-[26px] max-w-[400px] mx-auto ">
            {`Your payment is secured and ${initializeName({
              first_name: selectedOffer?.tasker.first_name,
              last_name: selectedOffer?.tasker.last_name,
            })} has been notified to begin your task. You’ll only release the payment when the task is completed to your satisfaction.`}
          </p>
          <ExtraInfo className="px-4">
            You can now send private messages with important information like
            the task location. Message your tasker the details to get your task
            done.
          </ExtraInfo>
          <ActionsButtons
            cancelText="Go to task"
            okText={`Message ${selectedOffer?.tasker.first_name ?? ""}`}
            className="mt-10 font-medium"
            handleCancel={toggleSuccessModal}
          />
        </div>
      </CustomModal>
    </Box>
  );
}
