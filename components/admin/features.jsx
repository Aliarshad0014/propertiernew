import React, { useState } from 'react';
import GenericTable from './generictable';
import ExportButtons from './buttons';
import SearchBox from './searchbox';

const Features = () => {
  // Sample data
  const initialFeaturesData = [
    { id: 1, name: 'Feature A', slug: '/feature-a' },
    { id: 2, name: 'Feature B', slug: '/feature-b' },
    { id: 3, name: 'Feature C', slug: '/feature-c' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [featuresData, setFeaturesData] = useState(initialFeaturesData);

  const headers = ['SL.', 'Name', 'Slug', 'Action'];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === '') {
      setFeaturesData(initialFeaturesData);
    } else {
      setFeaturesData(
        initialFeaturesData.filter((feature) =>
          feature.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const renderRow = (feature) => (
    <tr key={feature.id} className="text-gray-700 hover:bg-gray-50 cursor-pointer">
      <td className="py-2 px-4 border border-gray-300">{feature.id}</td>
      <td className="py-2 px-4 border border-gray-300">{feature.name}</td>
      <td className="py-2 px-4 border border-gray-300">
        <a href={feature.slug} className="text-blue-500 hover:underline">
          {feature.slug}
        </a>
      </td>
      <td className="py-2 px-4 border border-gray-300">
        <div className="flex space-x-2 justify-center">
          <button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600">Edit</button>
          <button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">Delete</button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="p-2 py-10">
      <div className="flex justify-between items-center bg-blue-100 p-4 rounded-none">
        <h2 className="text-xl font-semibold text-gray-700">Features List</h2>
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">+ Create</button>
      </div>
      <div className="bg-white p-4">
        <div className="flex lg:flex-row flex-col justify-between lg:items-center">
          <ExportButtons />
          <div className="lg:ml-4 w-64">
            <SearchBox value={searchTerm} onChange={handleSearchChange} />
          </div>
        </div>
        <GenericTable headers={headers} data={featuresData} renderRow={renderRow} />
      </div>
    </div>
  );
};

export default Features;
