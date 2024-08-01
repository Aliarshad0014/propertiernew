import React, { useState } from 'react';
import GenericTable from './generictable';
import ExportButtons from './buttons';
import SearchBox from './searchbox';

const CustomerRequests = () => {
  // Sample data
  const initialRequestsData = [
    {
      id: 1,
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phoneNumber: '123-456-7890',
      city: 'New York',
      size: 'Large',
      type: 'Order',
      price: '$150',
      note: 'Urgent delivery requested.',
      date: '2023-07-25',
    },
    {
      id: 2,
      fullName: 'Jane Smith',
      email: 'jane.smith@example.com',
      phoneNumber: '098-765-4321',
      city: 'Los Angeles',
      size: 'Medium',
      type: 'Inquiry',
      price: '$100',
      note: 'Inquiring about availability.',
      date: '2023-07-24',
    },
    {
      id: 3,
      fullName: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      phoneNumber: '555-123-4567',
      city: 'Chicago',
      size: 'Small',
      type: 'Order',
      price: '$50',
      note: 'Gift wrap requested.',
      date: '2023-07-23',
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [requestsData, setRequestsData] = useState(initialRequestsData);

  const headers = ['SL.', 'Full Name', 'Email', 'Phone Number', 'City', 'Size', 'Type', 'Price', 'Note', 'Date'];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === '') {
      setRequestsData(initialRequestsData);
    } else {
      setRequestsData(
        initialRequestsData.filter((request) =>
          request.fullName.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const renderRow = (request) => (
    <tr key={request.id} className="text-gray-700 hover:bg-gray-50 cursor-pointer text-sm">
      <td className="py-2 px-4 border border-gray-300">{request.id}</td>
      <td className="py-2 px-4 border border-gray-300">{request.fullName}</td>
      <td className="py-2 px-4 border border-gray-300">{request.email}</td>
      <td className="py-2 px-4 border border-gray-300">{request.phoneNumber}</td>
      <td className="py-2 px-4 border border-gray-300">{request.city}</td>
      <td className="py-2 px-4 border border-gray-300">{request.size}</td>
      <td className="py-2 px-4 border border-gray-300">{request.type}</td>
      <td className="py-2 px-4 border border-gray-300">{request.price}</td>
      <td className="py-2 px-4 border border-gray-300">{request.note}</td>
      <td className="py-2 px-4 border border-gray-300">{request.date}</td>
    </tr>
  );

  return (
    <div className="p-2 py-10">
      <div className="flex justify-between items-center bg-blue-100 p-4 rounded-none">
        <h2 className="text-xl font-semibold text-gray-700">Customer Requests</h2>
              </div>
      <div className="bg-white p-4">
        <div className="flex lg:flex-row flex-col justify-between lg:items-center">
          <ExportButtons />
          <div className="lg:ml-4 w-64">
            <SearchBox value={searchTerm} onChange={handleSearchChange} />
          </div>
        </div>
        <GenericTable headers={headers} data={requestsData} renderRow={renderRow} />
      </div>
    </div>
  );
};

export default CustomerRequests;
