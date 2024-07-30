// components/ProjectOffers.js
import React from 'react';
import GenericTable from './GenericTable';
import ExportButtons from './buttons';

const ProjectOffers = () => {
  const headers = ['SL.', 'Image', 'User', 'Project', 'Discount', 'Start Date', 'End Date', 'Applied On'];

  const offersData = [
    {
      id: 1,
      image: 'https://via.placeholder.com/150',
      user: 'John Doe',
      project: 'Alpha Project',
      discount: '10%',
      startDate: '2023-07-01',
      endDate: '2023-07-31',
      appliedOn: '2023-06-28',
    },
    // more data...
  ];

  const renderRow = (offer, index) => (
    <tr key={offer.id}>
      <td className="py-2 px-4 border-b">{index + 1}</td>
      <td className="py-2 px-4 border-b">
        <img src={offer.image} alt={offer.project} className="w-24 h-auto" />
      </td>
      <td className="py-2 px-4 border-b">{offer.user}</td>
      <td className="py-2 px-4 border-b">{offer.project}</td>
      <td className="py-2 px-4 border-b">{offer.discount}</td>
      <td className="py-2 px-4 border-b">{offer.startDate}</td>
      <td className="py-2 px-4 border-b">{offer.endDate}</td>
      <td className="py-2 px-4 border-b">{offer.appliedOn}</td>
    </tr>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-gray-700">Project Offers</h2>
      </div>
      <ExportButtons/>
      <GenericTable headers={headers} data={offersData} renderRow={renderRow} />
    </div>
  );
};

export default ProjectOffers;
