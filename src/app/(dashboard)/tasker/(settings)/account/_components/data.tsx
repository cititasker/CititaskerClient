import Account from "@/components/shared/dashboard/account/Account";
import Verifications from "./Verifications";
import Security from "@/components/shared/dashboard/account/Security";
import Notification from "@/components/shared/dashboard/account/Notification";

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
