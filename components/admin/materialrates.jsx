// components/Companies.js
import React from 'react';
import GenericTable from './GenericTable';
import ExportButtons from './buttons';

const Companies = () => {
  // Sample data
  const companiesData = [
    {
      id: 1,
      type: 'Tech',
      image: 'https://via.placeholder.com/150',
      company: 'Tech Innovators Inc.',
      description: 'A leading company in tech innovation.',
    },
    {
      id: 2,
      type: 'Finance',
      image: 'https://via.placeholder.com/150',
      company: 'Finance Solutions Ltd.',
      description: 'Providing top financial solutions.',
    },
    {
      id: 3,
      type: 'Healthcare',
      image: 'https://via.placeholder.com/150',
      company: 'HealthCare Partners',
      description: 'Committed to better healthcare services.',
    },
  ];

  const headers = ['SL.', 'Type', 'Image', 'Company', 'Description', 'Action'];

  const renderRow = (company) => (
    <tr key={company.id} className="text-gray-700 hover:bg-gray-50">
      <td className="py-2 px-4 border-b">{company.id}</td>
      <td className="py-2 px-4 border-b">{company.type}</td>
      <td className="py-2 px-4 border-b">
        <img src={company.image} alt={company.company} className="w-24 h-auto" />
      </td>
      <td className="py-2 px-4 border-b">{company.company}</td>
      <td className="py-2 px-4 border-b">{company.description}</td>
      <td className="py-2 px-4 border-b">
        <button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600">Edit</button>
        <button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 ml-2">Delete</button>
      </td>
    </tr>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Companies List</h2>
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">+ Create</button>
      </div>
      <ExportButtons />
      <GenericTable headers={headers} data={companiesData} renderRow={renderRow} />
    </div>
  );
};

export default Companies;
