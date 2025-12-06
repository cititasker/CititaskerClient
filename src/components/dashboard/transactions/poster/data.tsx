import dynamic from "next/dynamic";

const PaymentTab = dynamic(() => import("../PaymentTab"), { ssr: false });
const WalletTab = dynamic(() => import("./WalletTab"), { ssr: false });

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
