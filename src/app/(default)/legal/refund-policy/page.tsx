// app/legal/refund-policy/page.tsx
import React from "react";
import { Separator } from "@/components/ui/separator";

export default function RefundPolicyPage() {
  return (
    <article className="prose prose-sm max-w-none">
      {/* Header */}
      <header className="mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4 sm:mb-6">
          Refund Policy
        </h1>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
          This Refund Policy was last updated on <strong>21/12/2025</strong>.
        </p>
      </header>

      <Separator className="my-8 sm:my-10" />

      {/* Overview Section */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
          Overview
        </h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
          CitiTasker is committed to providing a secure, transparent, and
          reliable marketplace where Posters and Taskers can collaborate with
          confidence. This Refund Policy explains when refunds may apply, how
          refunds are processed, and the responsibilities of all parties
          involved. All payments on CitiTasker are securely held in escrow until
          tasks are completed or otherwise resolved.
        </p>
      </section>

      {/* Eligibility for Refunds */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
          Eligibility for Refunds
        </h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
          Refunds may be approved under the following circumstances:
        </p>
        <ul className="space-y-3 ml-4 sm:ml-6 list-disc">
          <li className="text-sm sm:text-base text-text-secondary">
            <strong>Non-Completion of Task:</strong> Where a Tasker fails to
            commence or complete a task as agreed.
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            <strong>Incomplete or Unsatisfactory Work:</strong> Where the work
            delivered does not reasonably meet the agreed task requirements and
            cannot be resolved through communication.
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            <strong>Violation of CitiTasker Policies:</strong> Where a Tasker
            breaches CitiTasker's platform rules or code of conduct.
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            <strong>Mutual Agreement:</strong> Where both the Poster and Tasker
            mutually agree to cancel the task before completion.
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            <strong>Dispute Resolution Outcome:</strong> Where CitiTasker
            determines, after reviewing evidence, that a refund is justified.
          </li>
        </ul>
      </section>

      {/* Non-Refundable Situations */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
          Non-Refundable Situations
        </h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
          Refunds will generally not be granted in the following cases:
        </p>
        <ul className="space-y-3 ml-4 sm:ml-6 list-disc">
          <li className="text-sm sm:text-base text-text-secondary">
            The Poster changes their mind after the task has commenced.
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            Dissatisfaction based on personal preference where the Tasker has
            delivered the task as agreed.
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            Delays or issues caused by the Poster, including unavailability or
            failure to provide required information.
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            Tasks marked as completed and payment already released.
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            Any other situation where CitiTasker reasonably determines that a
            refund is not warranted.
          </li>
        </ul>
      </section>

      {/* Refund and Dispute Process */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
          Refund and Dispute Process
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-2">
              Step 1: Attempt Resolution
            </h3>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Posters and Taskers are encouraged to resolve issues directly
              using CitiTasker's private messaging system.
            </p>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-2">
              Step 2: Open a Dispute
            </h3>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-3">
              If unresolved, the affected party may open a dispute via the task
              page by selecting Help &gt; Open Dispute, providing:
            </p>
            <ul className="space-y-2 ml-4 sm:ml-6 list-disc">
              <li className="text-sm sm:text-base text-text-secondary">
                Reason for dispute
              </li>
              <li className="text-sm sm:text-base text-text-secondary">
                Task details
              </li>
              <li className="text-sm sm:text-base text-text-secondary">
                Supporting evidence (messages, images, or documents)
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-2">
              Step 3: Review and Mediation
            </h3>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              CitiTasker will review all submitted evidence and mediate between
              both parties. If no agreement is reached, CitiTasker will make a
              final decision.
            </p>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-2">
              Step 4: Final Decision
            </h3>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              CitiTasker's decision is final and binding on all parties.
            </p>
          </div>
        </div>
      </section>

      {/* Refund Method and Timeline */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
          Refund Method and Timeline
        </h2>
        <ul className="space-y-3 ml-4 sm:ml-6 list-disc">
          <li className="text-sm sm:text-base text-text-secondary">
            Approved refunds are credited to the Poster's CitiTasker Wallet.
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            Funds can be withdrawn from the wallet to the Poster's bank account.
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            Refunds are typically processed within 24 hours after dispute
            resolution or successful cancellation.
          </li>
        </ul>
      </section>

      {/* Abuse of Refund Policy */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
          Abuse of Refund Policy
        </h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
          CitiTasker takes misuse of the refund system seriously. Abuse may
          result in:
        </p>
        <ul className="space-y-3 ml-4 sm:ml-6 list-disc">
          <li className="text-sm sm:text-base text-text-secondary">
            Account review or temporary suspension
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            Limitation of platform privileges
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            Permanent account removal
          </li>
          <li className="text-sm sm:text-base text-text-secondary">
            Further investigation where necessary
          </li>
        </ul>
      </section>

      {/* Contact and Support */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
          Contact and Support
        </h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
          For questions or assistance related to refunds or disputes, users are
          encouraged to contact CitiTasker Support through the Help Centre.
        </p>
      </section>
    </article>
  );
}
