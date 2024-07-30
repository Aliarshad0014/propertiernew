// components/GenericTable.js
import React from 'react';

const GenericTable = ({ headers, data, renderRow }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white text-left">
        <thead className="bg-gray-200">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="py-2 px-4 border-b text-gray-700 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {data.map((item, index) => renderRow(item, index))}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;
