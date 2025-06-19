import BillingTab from "./BillingTab";
import PaymentTab from "./PaymentTab";
import WalletTab from "./WalletTab";

export const tabs = [
  {
    label: "Payment",
    value: "payment",
    render: () => <PaymentTab />,
  },
  {
    label: "Billing",
    value: "billing",
    render: () => <BillingTab />,
  },
  {
    label: "Wallet",
    value: "wallet",
    render: () => <WalletTab />,
  },
];
