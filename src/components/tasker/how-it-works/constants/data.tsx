import { IPeople, IShieldTick, ISignPost } from "@/constant/icons";

import Section1Main from "@/assets/images/how_it_works/section_1_main.svg?url";
import Section1MainTL from "@/assets/images/how_it_works/section_1_main_tl.svg?url";
import Section1MainBR from "@/assets/images/how_it_works/section_1_main_br.svg?url";

import Section2Main from "@/assets/images/how_it_works/section_2_main.svg?url";
import Section2MainBR from "@/assets/images/how_it_works/section_2_main_br.svg?url";

import Section3Main from "@/assets/images/how_it_works/section_3_main.svg?url";
import Section3MainTL from "@/assets/images/how_it_works/section_3_main_tl.svg?url";
import Section3MainBR from "@/assets/images/how_it_works/section_3_main_br.svg?url";

import ShapeBg1 from "@/../public/images/shape_bg/bg_shape_1.png";
import ShapeBg2 from "@/../public/images/shape_bg/bg_shape_2.png";
import ShapeBg3 from "@/../public/images/shape_bg/bg_shape_3.png";

export const steps = [
  {
    title: "Browse task",
    text: "Sign up for free and  browse for tasks that match your expertise and location. Use filters to refine your search",
    icon: ISignPost,
  },
  {
    title: "Make an offer",
    text: "Found the task that matches your skills? Set your price and make an offer. Keep your pricing competitive and fair.",
    icon: IPeople,
  },
  {
    title: "Complete the task. Get paid.",
    text: "Complete the task, mark as completed and request payment. The customer will receive the request and instantly release payment.",
    icon: IShieldTick,
  },
];

export const sections = [
  {
    title: "Earn More on Your Terms",
    description:
      "With CitiTasker, you’re the boss of your work life. You have the freedom to take control of your income. Choose the tasks that match your skills, set your own rates, and work on your own schedule.",
    details: [],
    image: Section1Main,
    shapeBg: ShapeBg1,
    topLeft: Section1MainTL,
    bottomRight: Section1MainBR,
    imageAlt: "Person working on laptop setting task budget",
    buttonText: "Get Started",
    buttonHref: "/browse-task",
  },
  {
    title: "Private messaging",
    description:
      "Have a seamless and productive interactions with Posters via private message. Communicate directly with Posters to ensure clarity and smooth collaboration from start to finish.",
    details: [
      // "Start Messaging: Once you assign a Tasker, the private messaging feature is automatically enabled",
      // "Discuss Task Details: Use the chat to confirm logistics, timing, location, and specific requirements",
      // "Stay Connected: Exchange real-time updates with your Tasker to ensure the task is completed as planned",
    ],
    image: Section2Main,
    shapeBg: ShapeBg2,
    bottomRight: Section2MainBR,
    imageAlt: "Person using private messaging feature",
    buttonText: "Get Started",
    buttonHref: "/browse-task",
  },
  {
    title: "Secure payments",
    description:
      "You can focus on delivering great work knowing your payments are safe and secure. No need to worry about chasing payments. Our platform ensures a smooth and worry-free payment process from start to finish.",
    details: [],
    image: Section3Main,
    shapeBg: ShapeBg3,
    topLeft: Section3MainTL,
    bottomRight: Section3MainBR,
    imageAlt: "Person completing secure payment on mobile",
    buttonText: "Get Started",
    buttonHref: "/browse-task",
  },
];

export const taskerFeatures = [
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
