"use client";
import React from "react";
import FormButton from "./forms/FormButton";
import { ROLE, ROUTES } from "@/constant";
import { useAppSelector } from "@/store/hook";

// Constants for better maintainability
const HERO_CONTENT = {
  title: "Get your to-dos done  just in minutes",
  subtitle: "Find the right help for your tasks, instantly",
  posterCTA: "Post a task for free",
  taskerCTA: "Become a Tasker",
} as const;

const STYLES = {
  container: "relative w-full min-h-[100dvh] overflow-hidden",
  overlay: "absolute -translate-y-1/2 top-1/2 z-10 flex items-center",
  textBackdrop:
    "relative bg-gradient-to-br from-black/40 via-dark-secondary/20 to-transparent rounded-3xl p-8 md:p-12",
  content: "max-w-5xl mx-auto px-4 md:px-16 text-white",
  textSection: "mb-8 md:mb-12 text-center md:text-left space-y-4",
  title:
    "text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-white drop-shadow-lg",
  subtitle:
    "text-lg md:text-xl lg:text-2xl text-light-primary-1 font-light drop-shadow-md",
  buttonGroup:
    "flex flex-col sm:flex-row items-center gap-4 w-fit mx-auto md:mx-0",
  video: "absolute inset-0 w-full h-full object-cover",
} as const;

const LandingPageHero: React.FC = () => {
  const {
    user: { role },
    isAuth,
  } = useAppSelector((state) => state.user);

  const renderActionButtons = () => {
    if (isAuth) {
      const isPoster = role === ROLE.poster;
      return (
        <FormButton
          text={isPoster ? HERO_CONTENT.posterCTA : HERO_CONTENT.taskerCTA}
          className="group relative min-w-[200px]"
          href={isPoster ? ROUTES.POST_TASK : ROUTES.CREATE_ACCOUNT}
        />
      );
    }

    return (
      <>
        <FormButton
          text={HERO_CONTENT.posterCTA}
          className="group relative min-w-[200px]"
          href={ROUTES.POST_TASK}
        />
        <FormButton
          text={HERO_CONTENT.taskerCTA}
          className="group relative min-w-[200px] bg-gradient-secondary btn-animate-press"
          href={ROUTES.SIGNUP}
          variant="custom"
        />
      </>
    );
  };

  return (
    <section className={STYLES.container}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className={`${STYLES.video} hidden md:block`}
        aria-hidden="true"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>
      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.49) 0%, rgba(0, 0, 0, 0.49) 100%)",
        }}
      />
      {/* Content Overlay */}
      <div className={STYLES.overlay}>
        <div className={STYLES.content}>
          <div className={STYLES.textBackdrop}>
            <div className={STYLES.textSection}>
              <h1 className={STYLES.title}>{HERO_CONTENT.title}</h1>
              <p className={STYLES.subtitle}>{HERO_CONTENT.subtitle}</p>
            </div>

            <div className={STYLES.buttonGroup}>{renderActionButtons()}</div>
          </div>
        </div>
      </div>

      {/* Animated Background for Mobile */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-secondary via-black to-black-2 md:hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      </div>
    </section>
  );
};

export default LandingPageHero;
