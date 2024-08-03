import React from "react";

export default function OtherServices({ allService }) {
  // console.log(allService);
  return (
    <div>
      <div className="container mx-auto px-4 py-16 text-black">
        <h2 className="text-3xl font-bold mb-8 text-center">Other Services</h2>
        <div className="grid grid-cols-3 gap-4">
          {allService?.slice(0, 12)?.map((service, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-yellow-500">✔️</span>
              <p>{service?.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
