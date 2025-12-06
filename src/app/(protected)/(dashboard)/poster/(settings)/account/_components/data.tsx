import Security from "@/components/shared/dashboard/account/Security";
import Notification from "@/components/shared/dashboard/account/Notification";
import Account from "@/components/shared/dashboard/account/Account";

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
