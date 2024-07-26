import React from "react";

export default function OtherServices() {
  return (
    <div>
      {" "}
      <div className="container mx-auto px-4 py-16 text-black">
        <h2 className="text-3xl font-bold mb-8 text-center">Other Services</h2>
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-yellow-500">✔️</span>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
