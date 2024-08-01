import React, { useState } from 'react';
import GenericTable from './generictable';
import ExportButtons from './buttons';
import SearchBox from './searchbox';

const Membership = () => {
  // Sample data
  const initialMembershipData = [
    {
      id: 1,
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phoneNumber: '123-456-7890',
      projectOrCompany: 'Project Alpha',
      package: 'Gold',
      paymentMethod: 'Credit Card',
      date: '2023-07-23',
      status: 'Active',
    },
    {
      id: 2,
      fullName: 'Jane Smith',
      email: 'jane.smith@example.com',
      phoneNumber: '098-765-4321',
      projectOrCompany: 'Company Beta',
      package: 'Silver',
      paymentMethod: 'PayPal',
      date: '2023-07-21',
      status: 'Inactive',
    },
    {
      id: 3,
      fullName: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      phoneNumber: '555-123-4567',
      projectOrCompany: 'Project Gamma',
      package: 'Platinum',
      paymentMethod: 'Bank Transfer',
      date: '2023-07-19',
      status: 'Pending',
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [membershipData, setMembershipData] = useState(initialMembershipData);

  const headers = [
    'SL.', 'Full Name', 'Email', 'Phone Number', 
    'Project/Company', 'Package', 'Payment Method', 'Date', 'Status'
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === '') {
      setMembershipData(initialMembershipData);
    } else {
      setMembershipData(
        initialMembershipData.filter((member) =>
          member.fullName.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const renderRow = (member) => (
    <tr key={member.id} className="text-gray-700 hover:bg-gray-50 cursor-pointer text-sm">
      <td className="py-2 px-4 border border-gray-300">{member.id}</td>
      <td className="py-2 px-4 border border-gray-300">{member.fullName}</td>
      <td className="py-2 px-4 border border-gray-300">{member.email}</td>
      <td className="py-2 px-4 border border-gray-300">{member.phoneNumber}</td>
      <td className="py-2 px-4 border border-gray-300">{member.projectOrCompany}</td>
      <td className="py-2 px-4 border border-gray-300">{member.package}</td>
      <td className="py-2 px-4 border border-gray-300">{member.paymentMethod}</td>
      <td className="py-2 px-4 border border-gray-300">{member.date}</td>
      <td className="py-2 px-4 border border-gray-300">{member.status}</td>
    </tr>
  );

  return (
    <div className="p-2 py-10">
      <div className="flex justify-between items-center bg-blue-100 p-4 rounded-none">
        <h2 className="text-xl font-semibold text-gray-700">All Memberships</h2>
      </div>
      <div className="bg-white p-4">
        <div className="flex lg:flex-row flex-col justify-between lg:items-center">
          <ExportButtons />
          <div className="lg:ml-4 w-64">
            <SearchBox value={searchTerm} onChange={handleSearchChange} />
          </div>
        </div>
        <GenericTable headers={headers} data={membershipData} renderRow={renderRow} />
      </div>
    </div>
  );
};

export default Membership;
