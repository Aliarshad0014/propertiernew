import React from 'react';

const ExportButtons = () => {
  return (
    <div className="lg:flex lg:flex-nowrap flex-wrap space-x-2  space-y-2 sm:space-y-0 mb-2">
      <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 lg:w-full w-1/4">Copy</button>
      <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 lg:w-full w-1/4">CSV</button>
      <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 lg:w-full w-1/4">Excel</button>
      <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 lg:w-full w-1/4">PDF</button>
      <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 lg:w-full w-1/4">Print</button>
    </div>
  );
};

export default ExportButtons;
