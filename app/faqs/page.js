import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    question: "What is Propertier?",
    answer:
      "Propertier is a platform that allows users to list properties for sale or rent and connect with independent dealers and service providers. We offer a comprehensive service for real estate transactions and home maintenance, including a range of services such as plumbing, electrical work, and more.",
  },
  {
    question: "How do I create an account on Propertier?",
    answer:
      "To create an account, visit our website or download our app. Click on the “Sign Up” button and provide your personal details, including your name, email address, and phone number. You will receive a confirmation email to verify your account. Once verified, you can log in and start using our services.",
  },
  {
    question: "How can I list a property on Propertier?",
    answer:
      "After logging in, go to the “List a Property” section. Fill out the form with details about your property, including the address, description, photos, and pricing. Once submitted, your property will be reviewed and published on our platform.",
  },
  {
    question: "How do I search for properties on Propertier?",
    answer:
      "Use the search bar on our homepage to enter keywords, location, and other criteria related to the properties you are looking for. You can filter results based on various factors such as price, type of property, and more.",
  },
  {
    question: "What should I do if I can't find what I'm looking for?",
    answer:
      "If you don’t find relevant properties or services, you can use the “What Are You Searching For” form on our website. Provide details about what you’re looking for, and we will connect you with the appropriate independent dealers or service providers in your area.",
  },
  {
    question: "How can I request a service?",
    answer:
      "Go to the “Request a Service” section on our website or app. Select the type of service you need, provide your location and any specific details, and submit your request. We will match you with available service providers who can fulfill your request.",
  },
  {
    question: "How do I contact a service provider?",
    answer:
      "After you request a service, we will forward your details to relevant service providers. They will contact you directly to discuss your needs and arrange a service appointment.",
  },
  {
    question: "How can I update or delete my account information?",
    answer:
      "To update your account information, log in to your account and go to the “Account Settings” section. You can edit your personal details, change your password, or update other information. To delete your account, please contact our support team at support@propertier.com.pk for assistance.",
  },
  {
    question:
      "What should I do if I encounter a problem with a service provider?",
    answer:
      "If you have an issue with a service provider, please contact our support team immediately at support@propertier.com.pk. We will assist you in resolving the issue and ensure that appropriate actions are taken.",
  },
  {
    question: "How can I request a refund?",
    answer:
      "Refund requests should be submitted through our support team. Provide details about the issue and any relevant transaction information. We will review your request and respond with instructions on how to proceed.",
  },
  {
    question: "How do you protect my personal information?",
    answer:
      "We use a variety of security measures to protect your personal information, including encryption, secure servers, and access controls. For more details on how we handle and protect your data, please review our Privacy Policy.",
  },
  {
    question: "Can I opt-out of receiving marketing communications?",
    answer:
      "Yes, you can opt-out of receiving marketing emails by following the unsubscribe link included in each email. You can also contact our support team to request removal from our marketing lists.",
  },
  {
    question: "What should I do if I forget my password?",
    answer:
      "If you forget your password, go to the login page and click on the “Forgot Password” link. Follow the instructions to reset your password using your email address.",
  },
  {
    question: "How can I contact Propertier for support?",
    answer:
      "You can contact our support team via the email support button. Our team is available to assist you with any questions or issues you may have.",
  },
  {
    question: "Are there any fees for using Propertier’s services?",
    answer:
      "While creating an account and listing properties is generally free, there may be fees associated with certain services or premium features. Please refer to our Pricing Page/Terms and Conditions for detailed information on any applicable fees.",
  },
  {
    question: "How often do you update your Privacy Policy?",
    answer:
      "We may update our Privacy Policy periodically to reflect changes in our practices or legal requirements. We encourage you to review the policy regularly to stay informed about how we protect your information. The effective date of the policy is listed at the top of the document.",
  },
];

export default function Page() {
  return (
    <div className="text-black p-5 flex flex-col items-center justify-center mt-20 mb-10">
      <div className="text-3xl font-semibold text-[#ffce58]">
        Frequently Asked Questions (FAQs)
      </div>
      <div className="w-[90%] md:w-[70%] flex flex-col gap-3 mt-10">
        {faqs.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="text-white" />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              style={{ background: "#111827", color: "white" }}>
              {faq.question}
            </AccordionSummary>
            <AccordionDetails>{faq.answer}</AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
