import dynamic from "next/dynamic";

const PaymentTab = dynamic(() => import("../PaymentTab"));
const WalletTab = dynamic(() => import("../WalletTab/WalletTab"));

export const tabs = [
  {
    label: "Billing",
    value: "payment",
    render: () => <PaymentTab />,
  },
  {
    label: "Wallet",
    value: "wallet",
    render: () => <WalletTab />,
  },
];
