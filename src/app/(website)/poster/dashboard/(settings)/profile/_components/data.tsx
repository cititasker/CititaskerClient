import PersonalDetails from "@/app/(website)/_components/dashboard/personal-details/PersonalDetails";

export const tabs = [
  {
    label: "Profile",
    value: "profile",
    render: () => <PersonalDetails />,
  },
];
