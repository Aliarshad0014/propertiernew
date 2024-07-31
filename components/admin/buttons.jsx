// components/ExportButtons.js
import React from 'react';

const ExportButtons = () => {
  return (
    <div className="flex space-x-2 mb-2">
      <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">Copy</button>
      <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">CSV</button>
      <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">Excel</button>
      <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">PDF</button>
      <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">Print</button>
    </div>
  );
};

export default ExportButtons;
