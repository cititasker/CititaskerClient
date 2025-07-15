import React from "react";
import { billingColumns, IDataBilling } from "./columns";
import { CustomTable } from "@/components/reusables/CustomTable";

const BillingTab = () => {
  const rows: IDataBilling[] = [
    {
      reference: "542218754332295r",
      name: "Michael O.",
      email: "judith.cynthia@gmail.com",
      amount: "NGN 100,000",
      method: "Transfer",
      date: "Jan 22, 2024 11:36 am",
      status: "successful",
    },
    {
      reference: "542218754332295r",
      name: "Michael O.",
      email: "judith.cynthia@gmail.com",
      amount: "NGN 100,000",
      method: "Transfer",
      date: "Jan 22, 2024 11:36 am",
      status: "on_hold",
    },
  ];
  return (
    <CustomTable title="Billing History" data={rows} columns={billingColumns} />
  );
};

export default BillingTab;
