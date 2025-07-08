import PersonalDetails from "@/app/(website)/_components/dashboard/personal-details/PersonalDetails";
import Faq from "./Faq";
import EditPorfolio from "@/app/(website)/_components/dashboard/portfolio/EditPorfolio";

export const tabs = [
  {
    label: "Profile",
    value: "profile",
    render: () => <PersonalDetails />,
  },
  {
    label: "Porfolio",
    value: "portfolio",
    render: () => <EditPorfolio />,
  },
  {
    label: "FAQ",
    value: "faq",
    render: () => <Faq />,
  },
];
