import React from "react";
import CustomTab from "../../CustomTab";
import PaymentTab from "./PaymentTab";

const Payment = () => {
  const tabs = ["Payment", "Billing", "Wallet"];

  return (
    <div>
      <CustomTab tabs={tabs}>
        <>
          <PaymentTab />
        </>
      </CustomTab>
    </div>
  );
};

export default Payment;
