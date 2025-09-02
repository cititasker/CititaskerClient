import Security from "@/app/(website)/_components/dashboard/Security";
import Notification from "@/app/(website)/_components/dashboard/Notification";
import Account from "@/app/(website)/_components/dashboard/Account";

export const tabs = [
  {
    label: `Account`,
    value: "account",
    render: () => <Account />,
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
