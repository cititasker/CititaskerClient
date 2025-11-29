// app/legal/terms-and-conditions/page.tsx
import React from "react";
import { Separator } from "@/components/ui/separator";

export default function TermsAndConditionsPage() {
  return (
    <article className="prose prose-sm max-w-none">
      {/* Header */}
      <header className="mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4 sm:mb-6">
          Terms & Conditions
        </h1>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
          These Terms and Conditions was last updated on{" "}
          <strong>11/04/2025</strong>.
        </p>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed mt-4">
          Welcome to CitiTasker! These Terms and Conditions ("Terms") govern
          your use of CitiTasker's website, mobile app, and related services
          (collectively, the "Services"). By accessing or using the Services,
          you agree to be bound by these Terms. If you do not agree to these
          Terms, you may not use the Services.
        </p>
      </header>

      <Separator className="my-8 sm:my-10" />

      {/* Section 1 */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
          1. Acceptance of Terms
        </h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
          By creating an account or using CitiTasker's Services, you confirm
          that:
        </p>
        <ul className="space-y-2 ml-4 sm:ml-6 list-disc mt-4">
          <li className="text-sm sm:text-base text-text-secondary">
            You are at least 18 years old.
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            You have read, understood, and agree to these Terms.
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            You consent to the collection, use, and sharing of your information
            as described in our Privacy Policy.
          </li>
        </ul>
      </section>

      {/* Section 2 */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
          2. The Platform
        </h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
          CitiTasker is a platform that connects individuals and businesses
          ("Posters") who want services providers ("Taskers") to complete tasks
          ranging from cleaning and repairs to delivery and creative services.
          CitiTasker provides the platform but does not employ Posters or
          Taskers.
        </p>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
          Disputes between Posters and Taskers should first be resolved through
          direct communication.
        </p>
      </section>

      {/* Section 3 */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
          3. User Accounts
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-2">
              3.1 Account Creation
            </h3>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              To use the Services, you must create an account and provide
              accurate, complete, and up-to-date information.
            </p>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-2">
              3.2 Account Suspension or Termination
            </h3>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              CitiTasker reserves the right to suspend or terminate your account
              if you violate these Terms or engage in fraudulent, abusive, or
              illegal activities.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
          4.1 Posters
        </h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-2">
          Posters can post and accurate descriptions of tasks:
        </p>
        <ul className="space-y-2 ml-4 sm:ml-6 list-disc">
          <li className="text-sm sm:text-base text-text-secondary">
            Clear task descriptions.
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            Respond promptly through the platform.
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            Treat Taskers with respect and professionalism.
          </li>
        </ul>
      </section>

      {/* Section 4.2 */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
          4.2 Taskers
        </h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-2">
          Taskers must:
        </p>
        <ul className="space-y-2 ml-4 sm:ml-6 list-disc">
          <li className="text-sm sm:text-base text-text-secondary">
            Complete tasks based on your ability and in accordance with the
            Client's instructions.
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            Communicate clearly and professionally with Posters.
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            Ensure payment methods are up to date to complete payments.
          </li>
        </ul>
      </section>

      {/* Section 5 */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
          5. Payments and Fees
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-2">
              5.1 Payment Processing
            </h3>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Payments are processed through CitiTasker's platform using
              approved payment methods. CitiTasker may charge a service fee for
              facilitating transactions.
            </p>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-2">
              5.2 Refunds and Disputes
            </h3>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Refunds are subject to CitiTasker's discretion and the terms
              agreed upon between Posters and Taskers.
            </p>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed mt-2">
              Disputes between Posters and Taskers should be resolved first
              through CitiTasker.
            </p>
          </div>
        </div>
      </section>

      {/* Section 6 */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
          6. Prohibited Activities
        </h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
          You agree not to:
        </p>
        <ul className="space-y-2 ml-4 sm:ml-6 list-disc">
          <li className="text-sm sm:text-base text-text-secondary">
            Use the Services for illegal or unauthorized purposes.
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            Harass, defame, or harm other users.
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            Post fake, misleading, or offensive content.
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            Attempt to reverse-engineer or tamper with the platform.
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            Use automated tools to access or interact with the Services.
          </li>
        </ul>
      </section>

      {/* Section 7 */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
          7. Intellectual Property
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-2">
              7.1 Ownership
            </h3>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              CitiTasker and all intellectual property rights in the Services,
              including trademarks, logos, and software, Unless retain by
              CitiTasker or its licensors. You may not copy, modify, or create
              derivative works without prior written consent.
            </p>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-2">
              7.2 User Content
            </h3>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              You are responsible for the content you post on the platform.
              CitiTasker may remove content that violates these Terms or is
              deemed offensive or harmful.
            </p>
          </div>
        </div>
      </section>

      {/* Section 8 */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
          8. Limitation of Liability
        </h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
          CitiTasker is not responsible for the actions, conduct, or quality of
          any Posters or Taskers.
        </p>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed mt-4">
          CitiTasker is not liable for any indirect, incidental, or
          consequential damages arising from your use of the Services.
        </p>
      </section>

      {/* Section 9 */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
          9. Dispute Resolution
        </h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
          Disputes between Posters and Taskers should first be resolved through
          direct communication.
        </p>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed mt-4">
          If a resolution cannot be reached, disputes may be submitted in Lagos
          or through an applicable will be accepted the courts of Lagos or
          Nigeria. Any disputes will be subject to arbitration or litigation in
          Lagos or through applicable will be accepted the courts of Nigeria.
        </p>
      </section>

      {/* Section 10 */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
          10. Changes to These Terms
        </h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
          CitiTasker may update these Terms from time to time. We will notify
          users of significant changes constitute acceptance of the updated
          Terms.
        </p>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed mt-4">
          Continued use of the Services after changes constitutes acceptance of
          the updated Terms.
        </p>
      </section>
    </article>
  );
}
