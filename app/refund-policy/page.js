import React from "react";

export default function page() {
  return (
    <div className="text-black p-5 flex flex-col items-center justify-center mt-20 mb-10">
      <div className="text-3xl font-semibold text-[#ffce58]">Refund Policy</div>
      <div className="w-[90%] md:w-[70%] flex flex-col gap-3">
        <strong>1. Introduction</strong>
        <p>
          Thank you for using Propertier. We are dedicated to providing
          high-quality services and ensuring customer satisfaction. This Refund
          Policy specifies the terms under which you may be eligible for a
          refund and outlines the process for requesting and processing refunds.
          Our goal is to be fair and transparent while protecting both our users
          and our platform from misuse.
        </p>

        <strong>2. Refund Eligibility</strong>
        <p>
          <strong>2.1. Property Listings</strong>
        </p>
        <p>
          <strong>Listing Fees:</strong> Fees paid for listing properties are
          eligible for a refund only if the property was not successfully listed
          or there was a significant error on our part. Requests for refunds
          after the property has been listed or after modifications have been
          made are not eligible.
        </p>
        <p>
          <strong>Refund Requests:</strong> Refund requests must be submitted
          within 15 days from the date of payment. Requests made after this
          period will not be processed.
        </p>
        <p>
          <strong>2.2. Service Requests</strong>
        </p>
        <p>
          <strong>Service Fees:</strong> Fees paid for services are eligible for
          a refund if:
          <ul>
            <li>The service was not provided within the agreed timeframe.</li>
            <li>
              There was a significant issue with the service as documented.
            </li>
          </ul>
        </p>
        <p>
          <strong>Completion of Service:</strong> If the service has commenced
          or been completed, no refunds will be issued.
        </p>
        <p>
          <strong>Refund Requests:</strong> Requests must be submitted within 15
          days of payment. Documentation proving non-performance or issues must
          be provided. (Provide strong evidence for late requests; otherwise,
          immediate requests are mandatory.)
        </p>

        <strong>3. Refund Request Process</strong>
        <p>
          <strong>3.1. How to Submit a Refund Request</strong>
        </p>
        <p>
          <strong>Request Submission:</strong> To request a refund, email our
          support team at{" "}
          <a href="mailto:support@propertier.com.pk">
            support@propertier.com.pk
          </a>{" "}
          or use the “Support” button on our website or app. Include the
          following information:
        </p>
        <ul>
          <li>
            <strong>Transaction Details:</strong> Order number, transaction
            date, and amount paid.
          </li>
          <li>
            <strong>Reason for Refund:</strong> Detailed explanation of why you
            are requesting a refund.
          </li>
          <li>
            <strong>Supporting Documentation:</strong> Attach relevant documents
            such as transaction receipts, screenshots of issues, or
            communication records.
          </li>
        </ul>
        <p>
          <strong>3.2. Review and Processing</strong>
        </p>
        <p>
          <strong>Initial Review:</strong> Upon receipt, we will acknowledge
          your refund request within 3 business days. The request will undergo a
          detailed review process, which may involve additional communication
          with you or third parties.
        </p>
        <p>
          <strong>Processing Time:</strong> If approved, refunds will be
          processed within 10 business days. Refunds will be credited to the
          original payment method. Delays may occur due to banking or payment
          processor processing times.
        </p>

        <strong>4. Refund Conditions</strong>
        <p>
          <strong>4.1. Partial Refunds</strong>
        </p>
        <p>
          <strong>Eligibility:</strong> Partial refunds may be granted if a
          portion of the service was unsatisfactory. The amount of the partial
          refund will be determined based on the extent of the issue and the
          portion of the service or listing affected.
        </p>
        <p>
          <strong>4.2. Non-Refundable Items</strong>
        </p>
        <p>
          <strong>Service Fees:</strong> Fees for services that have been
          completed or commenced are non-refundable.
        </p>
        <p>
          <strong>Administrative Fees:</strong> Any administrative or processing
          fees associated with your transaction are non-refundable.
        </p>
        <p>
          <strong>Premium Features:</strong> Fees paid for premium features or
          enhancements are non-refundable once used.
        </p>

        <strong>5. Documentation and Verification</strong>
        <p>
          <strong>5.1. Required Documentation</strong>
        </p>
        <p>
          <strong>Proof of Issue:</strong> You must provide adequate evidence of
          the issue or problem that justifies a refund request. This includes
          but is not limited to screenshots, service reports, or correspondence.
        </p>
        <p>
          <strong>Verification:</strong> All refund requests are subject to
          verification. We may require additional documentation or clarification
          to process your request.
        </p>
        <p>
          <strong>5.2. Fraud Prevention</strong>
        </p>
        <p>
          <strong>Fraudulent Requests:</strong> Refund requests that appear
          fraudulent or abusive will be denied. We reserve the right to take
          legal action if necessary to protect our platform and users from
          fraudulent activities.
        </p>

        <strong>6. Exceptions and Special Circumstances</strong>
        <p>
          <strong>Exceptional Cases:</strong> In rare cases, exceptions to this
          policy may be made at our discretion. Such exceptions will be
          considered based on the specific circumstances and supporting evidence
          provided.
        </p>

        <strong>7. Contact Information</strong>
        <p>
          For any questions or to request a refund, please contact our support
          team at:{" "}
          <a href="mailto:support@propertier.com.pk">
            support@propertier.com.pk
          </a>
        </p>

        <strong>8. Changes to This Refund Policy</strong>
        <p>
          We may update this Refund Policy periodically to reflect changes in
          our practices or legal requirements. Updated policies will be posted
          on this page with an effective date. We recommend reviewing this
          policy regularly to stay informed about our refund practices.
        </p>

        <p>
          By using our website and app, you acknowledge that you have read,
          understood, and agreed to the terms of this Refund Policy.
        </p>
      </div>
    </div>
  );
}
