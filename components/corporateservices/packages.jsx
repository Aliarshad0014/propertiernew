import React, { useState } from "react";

const Packages = () => {
  const [packageType, setPackageType] = useState("monthly");

  const packageOptions = {
    monthly: [
      {
        name: "Starter",
        price: "Pkr 5",
        per: "/mo",
        features: [
          "Automated Reporting",
          "Faster Processing",
          "Customizations",
        ],
      },
      {
        name: "Basic",
        price: "Pkr 10",
        per: "/mo",
        features: [
          "Automated Reporting",
          "Faster Processing",
          "Customizations",
          "Priority Support",
        ],
        popular: false,
      },
      {
        name: "Plus",
        price: "Pkr 20",
        per: "/mo",
        features: [
          "Automated Reporting",
          "Faster Processing",
          "Customizations",
          "Priority Support",
          "Dedicated Manager",
        ],
      },
      {
        name: "Starter",
        price: "Pkr 5",
        per: "/mo",
        features: [
          "Automated Reporting",
          "Faster Processing",
          "Customizations",
        ],
      },
      {
        name: "Basic",
        price: "Pkr 10",
        per: "/mo",
        features: [
          "Automated Reporting",
          "Faster Processing",
          "Customizations",
          "Priority Support",
        ],
        popular: true,
      },
      {
        name: "Plus",
        price: "Pkr 20",
        per: "/mo",
        features: [
          "Automated Reporting",
          "Faster Processing",
          "Customizations",
          "Priority Support",
          "Dedicated Manager",
        ],
      },
      {
        name: "Plus",
        price: "Pkr 20",
        per: "/mo",
        features: [
          "Automated Reporting",
          "Faster Processing",
          "Customizations",
          "Priority Support",
          "Dedicated Manager",
        ],
      },
    ],
    yearly: [
      {
        name: "Starter",
        price: "Pkr 50",
        per: "/yr",
        features: [
          "Automated Reporting",
          "Faster Processing",
          "Customizations",
        ],
      },
      {
        name: "Basic",
        price: "Pkr 100",
        per: "/yr",
        features: [
          "Automated Reporting",
          "Faster Processing",
          "Customizations",
          "Priority Support",
        ],
        popular: false,
      },
      {
        name: "Plus",
        price: "Pkr 200",
        per: "/yr",
        features: [
          "Automated Reporting",
          "Faster Processing",
          "Customizations",
          "Priority Support",
          "Dedicated Manager",
        ],
      },
      {
        name: "Starter",
        price: "Pkr 50",
        per: "/yr",
        features: [
          "Automated Reporting",
          "Faster Processing",
          "Customizations",
        ],
      },
      {
        name: "Basic",
        price: "Pkr 100",
        per: "/yr",
        features: [
          "Automated Reporting",
          "Faster Processing",
          "Customizations",
          "Priority Support",
        ],
        popular: true,
      },
      {
        name: "Plus",
        price: "Pkr 200",
        per: "/yr",
        features: [
          "Automated Reporting",
          "Faster Processing",
          "Customizations",
          "Priority Support",
          "Dedicated Manager",
        ],
      },
      {
        name: "Plus",
        price: "Pkr 200",
        per: "/yr",
        features: [
          "Automated Reporting",
          "Faster Processing",
          "Customizations",
          "Priority Support",
          "Dedicated Manager",
        ],
      },
    ],
    onetime: [
      {
        name: "Starter",
        price: "Pkr 100",
        per: "one-time",
        features: [
          "Automated Reporting",
          "Faster Processing",
          "Customizations",
        ],
      },
      {
        name: "Basic",
        price: "Pkr 200",
        per: "one-time",
        features: [
          "Automated Reporting",
          "Faster Processing",
          "Customizations",
          "Priority Support",
        ],
        popular: true,
      },
      {
        name: "Plus",
        price: "Pkr 400",
        per: "one-time",
        features: [
          "Automated Reporting",
          "Faster Processing",
          "Customizations",
          "Priority Support",
          "Dedicated Manager",
        ],
      },
      {
        name: "Plus",
        price: "Pkr 400",
        per: "one-time",
        features: [
          "Automated Reporting",
          "Faster Processing",
          "Customizations",
          "Priority Support",
          "Dedicated Manager",
        ],
      },
    ],
  };

  return (
    <div className="">
      <h1 className="text-4xl font-bold text-center text-yellow-500 mb-10">
        Packages
      </h1>
      <div className="flex justify-center">
        <div className="relative z-50 flex mb-10">
          <button
            className={`py-2 px-4 rounded-l-md border border-gray-200 ${
              packageType === "monthly"
                ? "bg-[#FFCE58] text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => setPackageType("monthly")}
          >
            Monthly
          </button>
          <button
            className={`py-2 px-4 border-t border-b border-gray-200 ${
              packageType === "yearly"
                ? "bg-[#FFCE58] text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => setPackageType("yearly")}
          >
            Yearly
          </button>
          <button
            className={`py-2 px-4 rounded-r-md border border-gray-200 ${
              packageType === "onetime"
                ? "bg-[#FFCE58] text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => setPackageType("onetime")}
          >
            One-Time
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 max-w-6xl gap-6 mb-20 p-4 lg:p-0">
          {packageOptions[packageType].map((packageItem, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-all cursor-pointer hover:shadow-xl w-full p-6 ${
                packageItem.popular ? "border-2 border-yellow-500" : ""
              }`}
              style={{ width: "380px", height: "429px" }}
            >
              {packageItem.popular && (
                <div className="absolute top-0 right-0 bg-[#FFCE58] text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                  Popular
                </div>
              )}
              <h2 className="text-lg font-normal text-gray-500">
                {packageItem.name}
              </h2>
              <h3 className="text-3xl font-medium text-gray-900 my-2 mb-6">
                {packageItem.price}{" "}
                <span className="text-gray-500 font-light text-lg">
                  {packageItem.per}
                </span>{" "}
              </h3>
              <ul className="flex flex-col gap-2 mb-6">
                {packageItem.features.map((feature, i) => (
                  <li key={i} className="flex items-center my-1 text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-5 h-5 text-yellow-500 mr-2"
                    >
                      <path
                        fillRule="evenodd"
                        d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="bg-[#FFCE58] text-white py-2 px-4 rounded-md hover:bg-yellow-600 w-full mt-auto">
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Packages;
