import React, { useState } from 'react';
import GenericTable from './generictable';
import ExportButtons from './buttons';
import SearchBox from './searchbox';

const ProjectQueries = () => {
  // Sample data
  const initialQueriesData = [
    {
      id: 1,
      project: 'Project Alpha',
      name: 'John Doe',
      phoneNumber: '123-456-7890',
      detail: 'Interested in project details and timeline.',
      requestTime: '2023-07-25 10:00 AM',
    },
    {
      id: 2,
      project: 'Project Beta',
      name: 'Jane Smith',
      phoneNumber: '098-765-4321',
      detail: 'Requesting a meeting to discuss project scope.',
      requestTime: '2023-07-24 02:00 PM',
    },
    {
      id: 3,
      project: 'Project Gamma',
      name: 'Alice Johnson',
      phoneNumber: '555-123-4567',
      detail: 'Inquiring about project costs and timelines.',
      requestTime: '2023-07-23 11:30 AM',
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [queriesData, setQueriesData] = useState(initialQueriesData);

  const headers = ['SL.', 'Project', 'Name', 'Phone Number', 'Detail', 'Request Time'];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === '') {
      setQueriesData(initialQueriesData);
    } else {
      setQueriesData(
        initialQueriesData.filter((query) =>
          query.project.toLowerCase().includes(value.toLowerCase()) ||
          query.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const renderRow = (query) => (
    <tr key={query.id} className="text-gray-700 hover:bg-gray-50 cursor-pointer text-sm">
      <td className="py-2 px-4 border border-gray-300">{query.id}</td>
      <td className="py-2 px-4 border border-gray-300">{query.project}</td>
      <td className="py-2 px-4 border border-gray-300">{query.name}</td>
      <td className="py-2 px-4 border border-gray-300">{query.phoneNumber}</td>
      <td className="py-2 px-4 border border-gray-300">{query.detail}</td>
      <td className="py-2 px-4 border border-gray-300">{query.requestTime}</td>
    </tr>
  );

  return (
    <div className="p-2 py-10">
      <div className="flex justify-between items-center bg-blue-100 p-4 rounded-none">
        <h2 className="text-xl font-semibold text-gray-700">Project Queries</h2>
      </div>
      <div className="bg-white p-4">
        <div className="flex justify-between items-center">
          <ExportButtons />
          <div className="ml-4 w-64">
            <SearchBox value={searchTerm} onChange={handleSearchChange} />
          </div>
        </div>
        <GenericTable headers={headers} data={queriesData} renderRow={renderRow} />
      </div>
    </div>
  );
};

export default ProjectQueries;
