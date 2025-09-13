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
import Image from "next/image";

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
    id: "earn-more",
    data: {
      title: "Earn More on Your Terms",
      list: [
        "With CitiTasker, you’re the boss of your work life. You have the freedom to take control of your income. Choose the tasks that match your skills, set your own rates, and work on your own schedule.",
      ],
    },
    shapeBg: ShapeBg1,
    mainImage: Section1Main,
    bottomRight: (
      <Image
        src={Section1MainBR}
        alt=""
        className="absolute bottom-5 -right-5 h-auto max-w-[50%]"
      />
    ),
  },
  {
    id: "private-messaging",
    data: {
      title: "Private messaging",
      list: [
        "Have a seamless and productive interactions with Posters via private message. Communicate directly with Posters to ensure clarity and smooth collaboration from start to finish.",
      ],
    },
    shapeBg: ShapeBg2,
    mainImage: Section2Main,
    bottomRight: (
      <Image
        src={Section2MainBR}
        alt=""
        className="absolute bottom-5 -right-5 max-w-[50%]"
      />
    ),
  },
  {
    id: "secure-payments",
    data: {
      title: "Secure payments",
      list: [
        "You can focus on delivering great work knowing your payments are safe and secure. No need to worry about chasing payments. Our platform ensures a smooth and worry-free payment process from start to finish.",
      ],
    },
    shapeBg: ShapeBg3,
    mainImage: Section3Main,
    bottomRight: (
      <Image
        src={Section3MainBR}
        alt=""
        className="absolute bottom-5 -right-5 max-w-[50%]"
      />
    ),
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
