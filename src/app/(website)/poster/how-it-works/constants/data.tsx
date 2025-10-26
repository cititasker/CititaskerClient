import { IPeople, IShieldTick, ISignPost } from "@/constant/icons";
import Section1Main from "@/assets/images/how_it_works/section_1_main_poster.svg?url";
import Section1MainBR from "@/assets/images/how_it_works/section_1_main_poster_br.svg?url";

import Section2Main from "@/assets/images/how_it_works/section_2_main_poster.svg?url";
import Section2MainBR from "@/assets/images/how_it_works/section_2_main_br.svg?url";

import Section3Main from "@/assets/images/how_it_works/section_3_main_poster.svg?url";
import Section3MainBR from "@/assets/images/how_it_works/section_3_main_poster_br.svg?url";

import ShapeBg1 from "@/../public/images/shape_bg/bg_shape_1.png";
import ShapeBg2 from "@/../public/images/shape_bg/bg_shape_2.png";
import ShapeBg3 from "@/../public/images/shape_bg/bg_shape_3.png";

export const steps = [
  {
    title: "Post your task",
    text: "Describe what you need done, include details like location and timeframe, and suggest a budget. Posting is completely free!",
    icon: ISignPost,
  },
  {
    title: "Pick a Tasker",
    text: "Receive quotes from verified Taskers in minutes. Check their profiles, reviews, and skills to select the best fit for your job.",
    icon: IPeople,
  },
  {
    title: "Get it done",
    text: "Collaborate with your Tasker to complete the job. Communicate via private messaging to manage all details.",
    icon: IShieldTick,
  },
];

export const sections = [
  {
    title: "Set your own price",
    description:
      "You have the freedom to set a budget that works for you. By setting your own price, you stay in control while getting help with your task.",
    details: [
      "Budget Flexibility: Set a price that aligns with your budget and task complexity",
      "Fair Pricing: Our Taskers provide who provide value for money and justify their quotes",
      "Complete Control: You decide the worth of the task while ensuring quality outcomes",
    ],
    image: Section1Main,
    shapeBg: ShapeBg1,
    bottomRight: Section1MainBR,
    imageAlt: "Person working on laptop setting task budget",
    buttonText: "Get Started",
    buttonHref: "/post-task",
  },
  {
    title: "Private messaging",
    description:
      "Have seamless communication between you and your Tasker on CitiTasker, making it easy to discuss task details and stay updated throughout the process.",
    details: [
      "Start Messaging: Once you assign a Tasker, the private messaging feature is automatically enabled",
      "Discuss Task Details: Use the chat to confirm logistics, timing, location, and specific requirements",
      "Stay Connected: Exchange real-time updates with your Tasker to ensure the task is completed as planned",
    ],
    image: Section2Main,
    shapeBg: ShapeBg2,
    bottomRight: Section2MainBR,
    imageAlt: "Person using private messaging feature",
    buttonText: "Get Started",
    buttonHref: "/post-task",
  },
  {
    title: "Secure payments",
    description:
      "CitiTasker Escrow ensures a seamless and secure payment experience for every task. When you accept an offer, the agreed amount is securely held in CitiTasker Escrow until completion.",
    details: [
      "Once the task is done to your satisfaction, simply release the payment, and we'll transfer the funds directly to the Tasker's verified bank account",
      "Enjoy peace of mind with CitiTasker Pay, where security and ease come first",
    ],
    image: Section3Main,
    shapeBg: ShapeBg3,
    bottomRight: Section3MainBR,
    imageAlt: "Person completing secure payment on mobile",
    buttonText: "Get Started",
    buttonHref: "/post-task",
  },
];

export const posterFeatures = [
  {
    title: "Earn More on Your Terms",
    desc: "With CitiTasker, you have the freedom to choose tasks that match your skills, location, and schedule",
  },
  {
    title: "Secure Payments",
    desc: "We secure your payments in CitiTasker escrow and released directly to your bank account once the task is completed, ensuring peace of mind",
  },
  {
    title: "Free to join",
    desc: "Signing up as a Tasker is completely free. Start earning without any upfront costs.",
  },
];
