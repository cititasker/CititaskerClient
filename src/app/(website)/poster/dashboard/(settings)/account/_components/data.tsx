import Account from "../_components/Account";
import Notification from "../_components/Notification";
import Security from "../_components/Security";
import FAQ from "./FAQ";
import Verifications from "./Verifications";

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
  {
    label: `Verifications`,
    value: "verifications",
    render: () => <Verifications />,
  },
  {
    label: `FAQ`,
    value: "faq",
    render: () => <FAQ />,
  },
];
