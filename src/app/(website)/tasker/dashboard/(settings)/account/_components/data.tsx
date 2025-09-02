import Account from "@/app/(website)/_components/dashboard/Account";
import Verifications from "./Verifications";
import Security from "@/app/(website)/_components/dashboard/Security";
import Notification from "@/app/(website)/_components/dashboard/Notification";

export const tabs = [
  {
    label: `Account`,
    value: "account",
    render: () => <Account />,
  },
  {
    label: `Verifications`,
    value: "verifications",
    render: () => <Verifications />,
  },
  {
    label: `Notification`,
    value: "notification",
    render: () => <Notification />,
  },
  {
    label: `Security`,
    value: "security",
    render: () => <Security />,
  },
];
