// "use client";

// import React, { useEffect } from "react";
// import { useParams } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { NumericFormat } from "react-number-format";
// import { z } from "zod";
// import { baseIncreasePriceSchema } from "@/schema/offer";
// import { useAppDispatch, useAppSelector } from "@/store/hook";
// import { setOfferData } from "@/store/slices/task";
// import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
// import FormButton from "@/components/forms/FormButton";
// import { IEdit2 } from "@/constant/icons";
// import { OfferBreakdown } from "../shared/OfferBreakdown";

// // Schema for form validation
// const schema = baseIncreasePriceSchema.pick({
//   task_id: true,
//   offer_amount: true,
// });
// type FormData = z.infer<typeof schema>;

// interface Props {
//   nextStep: () => void;
// }

// const StepOne = ({ nextStep }: Props) => {
//   const { id } = useParams();
//   const dispatch = useAppDispatch();
//   const { taskDetails, taskersOffer, offer } = useAppSelector(
//     (state) => state.task
//   );

//   // Setup form using react-hook-form
//   const form = useForm<FormData>({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       task_id: Number(id),
//       offer_amount:
//         taskersOffer?.offer_amount?.toString() ||
//         taskDetails?.budget?.toString() ||
//         "0",
//     },
//   });

//   // Set offer amount when taskersOffer changes
//   useEffect(() => {
//     if (taskersOffer?.offer_amount) {
//       form.setValue("offer_amount", taskersOffer.offer_amount.toString());
//     }
//   }, [taskersOffer, form]);

//   // Handle form submission
//   const handleSubmit = (data: FormData) => {
//     dispatch(setOfferData({ ...offer, ...data }));
//     nextStep();
//   };

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(handleSubmit)}
//         className="flex flex-col min-h-[450px]"
//       >
//         <h2 className="text-2xl font-bold text-black mb-6">Increase price</h2>

//         <p className="text-center text-muted-foreground text-base mb-2">
//           Enter additional amount
//         </p>

//         {/* Offer amount field */}
//         <FormField
//           control={form.control}
//           name="offer_amount"
//           render={({ field }) => (
//             <FormItem>
//               <div className="relative bg-light-blue rounded-20 border border-secondary px-4 py-5 w-fit mx-auto max-w-[180px]">
//                 <NumericFormat
//                   value={field.value}
//                   onValueChange={({ value }) => field.onChange(value)}
//                   thousandSeparator
//                   prefix="₦"
//                   allowNegative={false}
//                   className="text-3xl font-semibold text-center bg-transparent outline-none w-full"
//                 />
//                 <IEdit2 className="absolute bottom-2 right-2" />
//               </div>
//               <FormMessage className="text-center mt-2" />
//             </FormItem>
//           )}
//         />

//         {/* Offer breakdown component */}
//         <OfferBreakdown firstRowLabel="Price increase for the task" />

//         <FormButton type="submit" className="!mt-auto w-full">
//           Next
//         </FormButton>
//       </form>
//     </Form>
//   );
// };

// export default StepOne;
