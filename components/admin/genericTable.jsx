import React from 'react';

const GenericTable = ({ headers, data, renderRow }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white text-left">
        <thead className="bg-gray-200">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="py-2 px-4 border text-gray-700 font-medium"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {renderRow(item, index).props.children.map((cell, cellIndex) => (
                <td key={cellIndex} className="py-2 px-4 border border-gray-300">
                  {cell.props.children}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;
