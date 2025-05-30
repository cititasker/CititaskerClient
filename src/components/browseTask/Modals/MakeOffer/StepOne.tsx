import FormButton from "@/components/forms/FormButton";
import { connectionFee } from "@/constant";
import { offerSchema } from "@/schema/offer";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setOfferData, setTaskDetails } from "@/store/slices/task";
import { formatCurrency } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormHelperText } from "@mui/material";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { z } from "zod";

interface ModalType {
  nextStep: () => void;
}

const schema = offerSchema.pick({ task_id: true, offer_amount: true });

type schemaType = z.infer<typeof schema>;

const StepOne = ({ nextStep }: ModalType) => {
  const dispatch = useAppDispatch();
  const { id }: { id: string } = useParams();

  const { offer, taskersOffer, taskDetails } = useAppSelector(
    (state) => state.task
  );

  const [inputWidth, setInputWidth] = useState(180);
  const maxWidth = 400;

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<schemaType>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      task_id: +id,
      offer_amount: taskersOffer?.offer_amount
        ? String(taskersOffer.offer_amount)
        : "0",
    },
  });

  const offerAmount = watch("offer_amount");

  // ✅ Ensure Redux has task details
  useEffect(() => {
    if (!taskDetails || Object.keys(taskDetails).length === 0) {
      console.log("Fetching and setting task details in Redux...");
      dispatch(setTaskDetails({ id: +id, budget: 1000 }));
    }
  }, [taskDetails, dispatch, id]);

  useEffect(() => {
    if (taskersOffer?.offer_amount) {
      setValue("task_id", taskersOffer.id);
      setValue("offer_amount", String(taskersOffer.offer_amount));
    } else if (taskDetails?.budget) {
      setValue("offer_amount", String(taskDetails.budget));
    }
  }, [taskersOffer, taskDetails, setValue]);

  useEffect(() => {
    const baseWidth = 180;
    const additionalWidth = offerAmount?.length * 10;
    const newWidth = baseWidth + additionalWidth;
    setInputWidth(newWidth > maxWidth ? maxWidth : newWidth);
  }, [offerAmount]);

  const connectionFeeTotal = offerAmount
    ? (connectionFee / 100) * Number(offerAmount)
    : "0";

  const onSubmit: SubmitHandler<schemaType> = (data) => {
    dispatch(setOfferData({ ...offer, ...data }));
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="text-black-2 font-[600] text-2xl">Make Offer</p>
      <p className="mt-9 text-dark-grey-2 text-base font-normal text-center ">
        Add your Offer
      </p>

      <div
        className="mt-2 mx-auto bg-light-blue rounded-20 px-[12px] py-[20px]"
        style={{ width: `${inputWidth}px`, maxWidth: `${maxWidth}px` }}
      >
        <NumericFormat
          value={offerAmount}
          onValueChange={(values) => {
            setValue("offer_amount", values.value);
          }}
          thousandSeparator={true}
          prefix="₦"
          className="text-[32px] text-black-2 font-semibold bg-transparent outline-none text-center w-full"
          style={{
            border: "none",
            background: "transparent",
            width: "100%",
          }}
          allowNegative={false}
        />
      </div>
      {errors.offer_amount && (
        <FormHelperText className="form__error text-center">
          {errors?.offer_amount.message}
        </FormHelperText>
      )}

      <div className="grid gap-10 mt-10">
        <div className="w-full flex justify-between">
          <div className="flex flex-col">
            <p className="text-[16px] font-normal text-black-2">
              Total offer for the task{" "}
            </p>
            <p className="text-dark-grey-2 text-[10px] font-normal">
              Note: This is the amount the job poster will see.
            </p>
          </div>
          <p className="text-[16px] font-normal text-black-2">
            {formatCurrency({ value: offerAmount })}
          </p>
        </div>
        <div className="w-full flex justify-between">
          <p className="text-[16px] font-normal text-black-2">
            10% Connection Fee
          </p>

          <p className="text-[16px] font-normal text-black-2">
            - {formatCurrency({ value: `${connectionFeeTotal}` })}
          </p>
        </div>
        <div className="w-full flex justify-between">
          <div className="flex items-center gap-1">
            <p className="text-[16px] font-normal text-black-2">
              You’ll Receive
            </p>
            <Image
              src="/icons/circle_notice.svg"
              alt="notice"
              width={14}
              height={14}
            />
          </div>
          <p className="text-[16px] font-normal text-black-2">
            {formatCurrency({
              value: Number(offerAmount) - Number(connectionFeeTotal),
            })}
          </p>
        </div>
      </div>

      <FormButton
        type="submit"
        className="text-white mt-[58px] w-full font-normal"
      >
        Next
      </FormButton>
    </form>
  );
};

export default StepOne;
