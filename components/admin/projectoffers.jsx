import React, { useState } from 'react';
import GenericTable from './generictable';
import ExportButtons from './buttons';
import SearchBox from './searchbox';

const ProjectOffers = () => {
  const headers = ['SL.', 'Image', 'User', 'Project', 'Discount', 'Start Date', 'End Date', 'Applied On'];

  const initialOffersData = [
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

  const [searchTerm, setSearchTerm] = useState('');
  const [offersData, setOffersData] = useState(initialOffersData);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === '') {
      setOffersData(initialOffersData);
    } else {
      setOffersData(
        initialOffersData.filter((offer) =>
          offer.user.toLowerCase().includes(value.toLowerCase()) ||
          offer.project.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const renderRow = (offer, index) => (
    <tr key={offer.id} className="text-gray-700 hover:bg-gray-50 cursor-pointer">
      <td className="py-2 px-4 border border-gray-300">{index + 1}</td>
      <td className="py-2 px-4 border border-gray-300">
        <img src={offer.image} alt={offer.project} className="w-24 h-auto" />
      </td>
      <td className="py-2 px-4 border border-gray-300">{offer.user}</td>
      <td className="py-2 px-4 border border-gray-300">{offer.project}</td>
      <td className="py-2 px-4 border border-gray-300">{offer.discount}</td>
      <td className="py-2 px-4 border border-gray-300">{offer.startDate}</td>
      <td className="py-2 px-4 border border-gray-300">{offer.endDate}</td>
      <td className="py-2 px-4 border border-gray-300">{offer.appliedOn}</td>
    </tr>
  );

  return (
    <div className="p-2 py-10">
      <div className="flex justify-between items-center bg-blue-100 p-4 rounded-none">
        <h2 className="text-xl font-semibold text-gray-700">Project Offers</h2>
      </div>
      <div className="bg-white p-4">
        <div className="flex justify-between items-center">
          <ExportButtons />
          <div className="ml-4 w-64">
            <SearchBox value={searchTerm} onChange={handleSearchChange} />
          </div>
        </div>
        <GenericTable headers={headers} data={offersData} renderRow={renderRow} />
      </div>
    </div>
  );
};

export default ProjectOffers;
