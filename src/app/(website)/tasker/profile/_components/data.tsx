import PersonalDetails from "./personal-details/PersonalDetails";
import Portfolio from "./portfolio/Portfolio";

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
