// components/Membership.js
import React from 'react';
import GenericTable from './GenericTable';
import ExportButtons from './buttons';

const Membership = () => {
  // Sample data
  const membershipData = [
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

  const headers = [
    'SL.', 'Full Name', 'Email', 'Phone Number', 
    'Project/Company', 'Package', 'Payment Method', 'Date', 'Status'
  ];

  const renderRow = (member) => (
    <tr key={member.id} className='text-gray-700 text-sm'>
      <td className="py-2 px-4 border-b">{member.id}</td>
      <td className="py-2 px-4 border-b">{member.fullName}</td>
      <td className="py-2 px-4 border-b">{member.email}</td>
      <td className="py-2 px-4 border-b">{member.phoneNumber}</td>
      <td className="py-2 px-4 border-b">{member.projectOrCompany}</td>
      <td className="py-2 px-4 border-b">{member.package}</td>
      <td className="py-2 px-4 border-b">{member.paymentMethod}</td>
      <td className="py-2 px-4 border-b">{member.date}</td>
      <td className="py-2 px-4 border-b">{member.status}</td>
    </tr>
  );

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">All Memberships</h2>
      </div>
      <ExportButtons />
      <GenericTable headers={headers} data={membershipData} renderRow={renderRow} />
    </div>
  );
};

export default Membership;
