import React, { useState } from 'react';
import GenericTable from './generictable';
import ExportButtons from './buttons';
import SearchBox from './searchbox';

const Customers = () => {
  // Sample data
  const initialCustomersData = [
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

  const [searchTerm, setSearchTerm] = useState('');
  const [customersData, setCustomersData] = useState(initialCustomersData);

  const headers = ['SL.', 'Image', 'Name', 'Email', 'Phone Number', 'Address', 'Created at'];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === '') {
      setCustomersData(initialCustomersData);
    } else {
      setCustomersData(
        initialCustomersData.filter((customer) =>
          customer.name.toLowerCase().includes(value.toLowerCase()) ||
          customer.email.toLowerCase().includes(value.toLowerCase()) ||
          customer.phoneNumber.includes(value) ||
          customer.address.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const renderRow = (customer) => (
    <tr key={customer.id} className="text-gray-700 hover:bg-gray-50 cursor-pointer text-sm">
      <td className="py-2 px-4 border border-gray-300">{customer.id}</td>
      <td className="py-2 px-4 border border-gray-300">
        <img src={customer.image} alt={customer.name} className="w-16 h-16 rounded-full" />
      </td>
      <td className="py-2 px-4 border border-gray-300">{customer.name}</td>
      <td className="py-2 px-4 border border-gray-300">{customer.email}</td>
      <td className="py-2 px-4 border border-gray-300">{customer.phoneNumber}</td>
      <td className="py-2 px-4 border border-gray-300">{customer.address}</td>
      <td className="py-2 px-4 border border-gray-300">{customer.createdAt}</td>
    </tr>
  );

  return (
    <div className="p-2 py-10">
      <div className="flex justify-between items-center bg-blue-100 p-4 rounded-none">
        <h2 className="text-xl font-semibold text-gray-700">Customers</h2>
      </div>
      <div className="bg-white p-4">
        <div className="flex lg:flex-row flex-col justify-between lg:items-center">
          <ExportButtons />
          <div className="lg:ml-4 w-64">
            <SearchBox value={searchTerm} onChange={handleSearchChange} />
          </div>
        </div>
        <GenericTable headers={headers} data={customersData} renderRow={renderRow} />
      </div>
    </div>
  );
};

export default Customers;
