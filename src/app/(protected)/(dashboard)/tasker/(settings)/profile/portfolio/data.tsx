import ProfileEditor from "@/components/shared/dashboard/profile/ProfileEditor";
import EditPorfolio from "./EditPorfolio";
import FAQContainer from "../faq/FAQContainer";

export const tabs = [
  {
    label: "Profile",
    value: "profile",
    render: () => <ProfileEditor />,
  },
  {
    label: "Porfolio",
    value: "portfolio",
    render: () => <EditPorfolio />,
  },
  {
    label: "FAQ",
    value: "faq",
    render: () => <FAQContainer />,
  },
];
