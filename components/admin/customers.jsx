// components/Customers.js
import React from 'react';
import GenericTable from './GenericTable';
import ExportButtons from './buttons';

const Customers = () => {
  // Sample data
  const customersData = [
    {
      id: 1,
      image: 'https://via.placeholder.com/150',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phoneNumber: '123-456-7890',
      address: '123 Main St, New York, NY',
      createdAt: '2023-07-01',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/150',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phoneNumber: '098-765-4321',
      address: '456 Oak St, Los Angeles, CA',
      createdAt: '2023-06-15',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/150',
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      phoneNumber: '555-123-4567',
      address: '789 Pine St, Chicago, IL',
      createdAt: '2023-05-20',
    },
  ];

  const headers = ['SL.', 'Image', 'Name', 'Email', 'Phone Number', 'Address', 'Created at'];

  const renderRow = (customer) => (
    <tr key={customer.id} className='text-gray-700 text-sm'>
      <td className="py-2 px-4 border-b">{customer.id}</td>
      <td className="py-2 px-4 border-b">
        <img src={customer.image} alt={customer.name} className="w-16 h-16 rounded-full" />
      </td>
      <td className="py-2 px-4 border-b">{customer.name}</td>
      <td className="py-2 px-4 border-b">{customer.email}</td>
      <td className="py-2 px-4 border-b">{customer.phoneNumber}</td>
      <td className="py-2 px-4 border-b">{customer.address}</td>
      <td className="py-2 px-4 border-b">{customer.createdAt}</td>
    </tr>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-gray-700">Customers</h2>
      </div>
      <ExportButtons />
      <GenericTable headers={headers} data={customersData} renderRow={renderRow} />
    </div>
  );
};

export default Customers;
