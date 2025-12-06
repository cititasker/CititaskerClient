import dynamic from "next/dynamic";

const PaymentTab = dynamic(() => import("../PaymentTab"));
const WalletTab = dynamic(() => import("./WalletTab/WalletTab"));

export const tabs = [
  {
    label: "Payment",
    value: "payment",
    render: () => <PaymentTab type="credit" />,
  },
  {
    label: "Wallet",
    value: "wallet",
    render: () => <WalletTab />,
  },
];
