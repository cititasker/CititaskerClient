import dynamic from "next/dynamic";
import LandingPageHero from "@/components/LandingPageHero";
import TaskCategories from "@/components/TaskCategories/TaskCategories";
import { accordionDataWithHTML } from "data";

// ✅ Lazy load components below the fold
const WhyChooseCitiTasker = dynamic(
  () => import("@/components/WhyChooseCitiTasker/WhyChooseCitiTasker"),
  { ssr: true }
);

const HowItWorks = dynamic(() => import("@/components/HowItWorks/HowItWorks"), {
  ssr: true,
});

const PopularTasks = dynamic(
  () => import("@/components/PopularTasks/PopularTasks"),
  { ssr: true }
);

const Stats = dynamic(() => import("@/components/Stats"), { ssr: true });

const Testimonies = dynamic(
  () => import("@/components/Testimonies/Testimonies"),
  { ssr: true }
);

const PosterTestimonies = dynamic(
  () => import("@/components/poster/landingPage/PosterTestimonies"),
  { ssr: true }
);

const FAQ = dynamic(() => import("@/components/shared/FAQ"), { ssr: true });

const BecomeTaskerBanner = dynamic(
  () => import("@/components/BecomeTaskerBanner"),
  { ssr: true }
);

export default function Page() {
  return (
    <div>
      {/* Above the fold - load immediately */}
      <LandingPageHero />
      <TaskCategories />

      {/* Below the fold - lazy load */}
      <WhyChooseCitiTasker />
      <HowItWorks />
      <PopularTasks />
      <Stats />
      <Testimonies />
      <PosterTestimonies showHeading={false} />
      <FAQ accordionData={accordionDataWithHTML} />
      <BecomeTaskerBanner />
    </div>
  );
}
