// "use client";

// import React, { useEffect } from "react";
// import { useParams } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { NumericFormat } from "react-number-format";
// import { z } from "zod";
// import { offerSchema } from "@/schema/offer";
// import { useAppDispatch, useAppSelector } from "@/store/hook";
// import { setOfferData } from "@/store/slices/task";
// import { OfferBreakdown } from "../shared/OfferBreakdown";
// import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
// import FormButton from "@/components/forms/FormButton";

// const schema = offerSchema.pick({ task_id: true, offer_amount: true });
// type FormData = z.infer<typeof schema>;

// interface Props {
//   nextStep: () => void;
//   title: string;
//   budgetLabel: string;
// }

// const StepOne = ({ nextStep, title, budgetLabel }: Props) => {
//   const { id } = useParams();
//   const dispatch = useAppDispatch();
//   const { taskDetails, taskersOffer, offer } = useAppSelector(
//     (state) => state.task
//   );

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

//   const { setValue } = form;

//   useEffect(() => {
//     if (taskersOffer?.offer_amount) {
//       setValue("offer_amount", `${taskersOffer.offer_amount}`);
//     }
//   }, [taskersOffer, setValue]);

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
//         <h2 className="text-2xl font-bold text-black mb-6">{title}</h2>

//         <div>
//           <p className="text-center text-muted-foreground text-base mb-2">
//             {budgetLabel}
//           </p>

//           <FormField
//             control={form.control}
//             name="offer_amount"
//             render={({ field }) => (
//               <FormItem>
//                 <div className="relative bg-light-blue rounded-20 px-4 py-5 w-fit mx-auto max-w-[180px]">
//                   <NumericFormat
//                     value={field.value}
//                     onValueChange={({ value }) => field.onChange(value)}
//                     thousandSeparator
//                     prefix="₦"
//                     allowNegative={false}
//                     className="text-3xl font-semibold text-center bg-transparent outline-none w-full"
//                   />
//                 </div>
//                 <FormMessage className="text-center mt-2" />
//               </FormItem>
//             )}
//           />

//           <OfferBreakdown firstRowLabel="Total offer" />
//         </div>

//         <FormButton type="submit" className="!mt-auto w-full">
//           Next
//         </FormButton>
//       </form>
//     </Form>
//   );
// };

// export default StepOne;
