import PersonalDetails from "@/app/(website)/tasker/profile/_components/personal-details/PersonalDetails";
import Portfolio from "@/app/(website)/tasker/profile/_components/portfolio/Portfolio";

export const tabs = [
  {
    label: "Profile",
    value: "profile",
    render: () => <PersonalDetails />,
  },
  {
    label: "Porfolio",
    value: "portfolio",
    render: () => <Portfolio />,
  },
];
