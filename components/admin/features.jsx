// components/Features.js
import React from 'react';
import GenericTable from './GenericTable';
import ExportButtons from './buttons';

const Features = () => {
  // Sample data
  const featuresData = [
    {
      id: 1,
      name: 'Feature A',
      slug: '/feature-a',
    },
    {
      id: 2,
      name: 'Feature B',
      slug: '/feature-b',
    },
    {
      id: 3,
      name: 'Feature C',
      slug: '/feature-c',
    },
  ];

  const headers = ['SL', 'Name', 'Slug', 'Action'];

  const renderRow = (feature) => (
    <tr key={feature.id} className="text-gray-700 hover:bg-gray-50 cursor-pointer">
      <td className="py-2 px-4 border-b">{feature.id}</td>
      <td className="py-2 px-4 border-b">{feature.name}</td>
      <td className="py-2 px-4 border-b">
        <a href={feature.slug} className="text-blue-500 hover:underline">
          {feature.slug}
        </a>
      </td>
      <td className="py-2 px-4 border-b">
        <button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600">Edit</button>
        <button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 ml-2">Delete</button>
      </td>
    </tr>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Features List</h2>
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">+ Create</button>
      </div>
      <ExportButtons />
      <GenericTable headers={headers} data={featuresData} renderRow={renderRow} />
    </div>
  );
};

export default Features;
