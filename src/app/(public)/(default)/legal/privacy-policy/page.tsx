// app/legal/privacy-policy/page.tsx
import React from "react";
import { Separator } from "@/components/ui/separator";

export default function PrivacyPolicyPage() {
  return (
    <article className="prose prose-sm max-w-none">
      {/* Header */}
      <header className="mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4 sm:mb-6">
          Privacy Policy
        </h1>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
          Welcome to CitiTasker. This Privacy Policy explains how we collect,
          use, disclose, and protect your personal information when you access
          or use our Services. By using the Services, please read this Privacy
          Policy from the CitiTasker Terms and Conditions. If you don't agree to
          the Privacy Policy, please don't use the Services.
        </p>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed mt-4">
          If you have any questions, please contact us at
          support@cititasker.com.
        </p>
      </header>

      <Separator className="my-8 sm:my-10" />

      {/* Section 1 */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
          1. Information We Collect
        </h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
          To provide, maintain, improve, and secure our Services. The types of
          information we collect include:
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-2">
              Information You Provide:
            </h3>
            <ul className="space-y-2 ml-4 sm:ml-6 list-disc">
              <li className="text-sm sm:text-base text-text-secondary">
                <strong>Account Information:</strong> Name, email address, phone
                number, location, and employment details (e.g., credit card
                numbers, expiration dates), and property payment process.
              </li>
              <li className="text-sm sm:text-base text-text-secondary">
                <strong>Profile Information:</strong> Profile picture, bio,
                skills, badges, and other information you add to your account.
              </li>
              <li className="text-sm sm:text-base text-text-secondary">
                <strong>Content You Submit:</strong> Tasks, bids, comments,
                reviews, photos, videos, and other content you post on the
                platform.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-2">
              Information We Collect Automatically:
            </h3>
            <ul className="space-y-2 ml-4 sm:ml-6 list-disc">
              <li className="text-sm sm:text-base text-text-secondary">
                <strong>Usage Data:</strong> IP address, device type, browser
                type, operating system, pages visited, time spent on the
                platform, referral source, and other interactions with our
                Services.
              </li>
              <li className="text-sm sm:text-base text-text-secondary">
                <strong>Cookies and Tracking Technologies:</strong> We use
                cookies, web beacons, and other technologies to enhance your
                experience, remember your preferences, analyze site usage, and
                provide targeted ads. For more info, see Section 5.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-2">
              Information from Third Parties:
            </h3>
            <ul className="space-y-2 ml-4 sm:ml-6 list-disc">
              <li className="text-sm sm:text-base text-text-secondary">
                <strong>Social Media:</strong> If you connect your CitiTasker
                account to social media platforms (e.g., Facebook, LinkedIn), we
                may collect information you choose to share from those accounts
                such as your profile picture, friend list, and contact
                information.
              </li>
              <li className="text-sm sm:text-base text-text-secondary">
                <strong>Payment Processors:</strong> We receive payment
                information (e.g., transaction details) when you make
                transactions, though we don't collect or publicly available
                records.
              </li>
              <li className="text-sm sm:text-base text-text-secondary">
                <strong>Marketing Partners:</strong> We may receive information
                from data or marketing partners to improve our Services.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
          2. How We Use Your Information
        </h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
          We use your information for the following purposes:
        </p>

        <ul className="space-y-3 ml-4 sm:ml-6 list-disc">
          <li className="text-sm sm:text-base text-text-secondary">
            <strong>To Provide Services:</strong> Facilitate task posting,
            bidding, communication, payment processing, and other platform
            features.
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            <strong>To Improve Services:</strong> Analyze usage patterns,
            develop new features, and personalize your experience.
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            <strong>For Security:</strong> Detect and prevent fraud, abuse, and
            protect the integrity of our platform.
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            <strong>To Communicate:</strong> Send notifications, updates,
            newsletters, and promotional offers. You can opt-out of marketing
            communications.
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            <strong>For Legal Compliance:</strong> Fulfill legal obligations,
            enforce our Terms and Conditions, and respond to legal requests.
          </li>
        </ul>
      </section>

      {/* Section 3 */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
          3. How We Share Your Information
        </h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
          We may share your information in the following circumstances:
        </p>

        <ul className="space-y-3 ml-4 sm:ml-6 list-disc">
          <li className="text-sm sm:text-base text-text-secondary">
            <strong>With Other Users:</strong> Transaction details (e.g., name,
            contact info), operating the Services (e.g., payment processors,
            analytics providers), and with your consent.
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            <strong>With Service Providers:</strong> We work with third-party
            vendors to help us operate the Services.
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            <strong>For Legal Reasons:</strong> To comply with laws,
            regulations, or legal requests, or to protect our rights and safety.
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            <strong>During Business Transfers:</strong> If CitiTasker is
            involved in a merger, acquisition, or sale of all or any portion of
            its business, your information may also be a part of that
            transaction.
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            <strong>With Your Consent:</strong> We may share information for
            other purposes with your permission.
          </li>
        </ul>
      </section>

      {/* Section 4 */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
          4. Data Security
        </h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
          We implement reasonable, standard security measures to protect your
          information, including encryption, secure connections, and regular
          security audits. However, no method of transmission over the Internet
          or method of electronic storage is 100% secure. While we strive to
          protect your information from unauthorized access, disclosure,
          alteration, or destruction, we cannot guarantee absolute security. You
          are responsible for keeping your account credentials secure.
        </p>
      </section>

      {/* Section 5 */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
          5. Cookies and Tracking Technologies
        </h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
          We use cookies and similar technologies to:
        </p>

        <ul className="space-y-2 ml-4 sm:ml-6 list-disc">
          <li className="text-sm sm:text-base text-text-secondary">
            <strong>Enhance Functionality:</strong> Remember your preferences
            and login details.
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            <strong>Analyze Usage:</strong> Understand how users interact with
            our platform.
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            <strong>Deliver Ads:</strong> Show you relevant advertisements on
            third party websites and perform analytics.
          </li>
        </ul>

        <p className="text-sm sm:text-base text-text-secondary leading-relaxed mt-4">
          You can manage your cookie settings through your browser settings.
          Disabling cookies may affect the functionality of the Services.
        </p>
      </section>

      {/* Section 6 */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
          6. Your Rights and Choices
        </h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
          Depending on your location, you may have the following rights:
        </p>

        <ul className="space-y-3 ml-4 sm:ml-6 list-disc">
          <li className="text-sm sm:text-base text-text-secondary">
            <strong>Access:</strong> Request a copy of the personal information
            we hold about you.
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            <strong>Correction:</strong> Update or correct incorrect or outdated
            information.
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            <strong>Deletion:</strong> Request the deletion of your information.
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            <strong>Opt-Out:</strong> Unsubscribe from marketing communications
            or disable cookies. To exercise these rights, contact us at
            support@cititasker.com.
          </li>
        </ul>
      </section>

      {/* Section 7 */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
          7. Retention of Information
        </h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
          We retain your information as long as necessary to fulfill the
          purposes outlined in this Privacy Policy, comply with legal
          obligations, or resolve disputes.
        </p>
      </section>

      {/* Section 8 */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
          8. Children's Privacy
        </h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
          Our Services are not intended for individuals under 18 years of age.
          We do not knowingly collect personal information from children. If we
          become aware of such data, we will delete it promptly.
        </p>
      </section>

      {/* Section 9 */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
          9. Changes to This Privacy Policy
        </h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with an updated "Last Updated" date. We
          encourage you to review this policy periodically.
        </p>
      </section>
    </article>
  );
}
