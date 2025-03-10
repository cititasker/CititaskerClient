import React from "react";
import CustomTab from "../../CustomTab";
import PaymentTab from "./PaymentTab";
import WalletTab from "./WalletTab";
import BillingTab from "./BillingTab";

const Payment = () => {
  const tabs = ["Payment", "Billing", "Wallet"];

  return (
    <div>
      <CustomTab tabs={tabs}>
        <PaymentTab />
        <BillingTab />
        <WalletTab />
      </CustomTab>
    </div>
  );
};

export default Payment;
