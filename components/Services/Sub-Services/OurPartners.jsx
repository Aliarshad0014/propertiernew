import React from "react";

export default function OurPartners() {
  return (
    <div className="container mx-auto px-4 py-16 text-black">
      <h2 className="text-3xl font-bold mb-8 text-center">Our Partners</h2>
      <div className="flex justify-center space-x-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="p-8 border rounded-lg shadow-lg">
            <div className="flex items-center justify-center h-24 w-24 bg-gray-200">
              <p className="text-lg font-bold">Logo Here</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
