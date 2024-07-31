import React, { useState } from 'react';
import GenericTable from './generictable';
import ExportButtons from './buttons';
import SearchBox from './searchbox';

const Companies = () => {
  // Sample data
  const initialCompaniesData = [
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

  const [searchTerm, setSearchTerm] = useState('');
  const [companiesData, setCompaniesData] = useState(initialCompaniesData);

  const headers = ['SL.', 'Type', 'Image', 'Company', 'Description', 'Action'];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === '') {
      setCompaniesData(initialCompaniesData);
    } else {
      setCompaniesData(
        initialCompaniesData.filter((company) =>
          company.company.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const renderRow = (company) => (
    <tr key={company.id} className="text-gray-700 hover:bg-gray-50 cursor-pointer">
      <td className="py-2 px-4 border border-gray-300">{company.id}</td>
      <td className="py-2 px-4 border border-gray-300">{company.type}</td>
      <td className="py-2 px-4 border border-gray-300">
        <img src={company.image} alt={company.company} className="w-24 h-auto" />
      </td>
      <td className="py-2 px-4 border border-gray-300">{company.company}</td>
      <td className="py-2 px-4 border border-gray-300">{company.description}</td>
      <td className="py-2 px-4 border border-gray-300">
        <div className="flex space-x-2">
          <button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600">Edit</button>
          <button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">Delete</button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="p-2 py-10">
      <div className="flex justify-between items-center bg-blue-100 p-4 rounded-none">
        <h2 className="text-xl font-semibold text-gray-700">Companies List</h2>
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">+ Create</button>
      </div>
      <div className="bg-white p-4">
        <div className="flex justify-between items-center">
          <ExportButtons />
          <div className="ml-4 w-64">
            <SearchBox value={searchTerm} onChange={handleSearchChange} />
          </div>
        </div>
        <GenericTable headers={headers} data={companiesData} renderRow={renderRow} />
      </div>
    </div>
  );
};

export default Companies;
