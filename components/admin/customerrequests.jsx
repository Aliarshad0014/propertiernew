// components/CustomerRequests.js
import React from 'react';
import GenericTable from './GenericTable';
import ExportButtons from './buttons';

const CustomerRequests = () => {
  // Sample data
  const requestsData = [
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

  const headers = ['SL.', 'Full Name', 'Email', 'Phone Number', 'City', 'Size', 'Type', 'Price', 'Note', 'Date'];

  const renderRow = (request) => (
    <tr key={request.id} className='text-gray-700 text-sm'>
      <td className="py-2 px-4 border-b">{request.id}</td>
      <td className="py-2 px-4 border-b">{request.fullName}</td>
      <td className="py-2 px-4 border-b">{request.email}</td>
      <td className="py-2 px-4 border-b">{request.phoneNumber}</td>
      <td className="py-2 px-4 border-b">{request.city}</td>
      <td className="py-2 px-4 border-b">{request.size}</td>
      <td className="py-2 px-4 border-b">{request.type}</td>
      <td className="py-2 px-4 border-b">{request.price}</td>
      <td className="py-2 px-4 border-b">{request.note}</td>
      <td className="py-2 px-4 border-b">{request.date}</td>
    </tr>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-gray-700">Customer Requests</h2>
      </div>
      <ExportButtons />
      <GenericTable headers={headers} data={requestsData} renderRow={renderRow} />
    </div>
  );
};

export default CustomerRequests;
