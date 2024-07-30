// components/ProjectQueries.js
import React from 'react';
import GenericTable from './GenericTable';
import ExportButtons from './buttons';

const ProjectQueries = () => {
  // Sample data
  const queriesData = [
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

  const headers = ['SL.', 'Project', 'Name', 'Phone Number', 'Detail', 'Request Time'];

  const renderRow = (query) => (
    <tr key={query.id} className='text-gray-700 text-sm'>
      <td className="py-2 px-4 border-b">{query.id}</td>
      <td className="py-2 px-4 border-b">{query.project}</td>
      <td className="py-2 px-4 border-b">{query.name}</td>
      <td className="py-2 px-4 border-b">{query.phoneNumber}</td>
      <td className="py-2 px-4 border-b">{query.detail}</td>
      <td className="py-2 px-4 border-b">{query.requestTime}</td>
    </tr>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-gray-700">Project Queries</h2>
      </div>
      <ExportButtons />
      <GenericTable headers={headers} data={queriesData} renderRow={renderRow} />
    </div>
  );
};

export default ProjectQueries;
