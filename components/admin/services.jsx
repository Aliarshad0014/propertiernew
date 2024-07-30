// components/Services.js
import React from 'react';
import GenericTable from './GenericTable';
import ExportButtons from './buttons';

const AllServices = () => {
  // Sample data
  const servicesData = [
    {
      id: 1,
      image: 'https://via.placeholder.com/150',
      title: 'Web Development',
      description: 'Building responsive and functional websites.',
      icon: '🔧',
      order: 1,
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/150',
      title: 'Graphic Design',
      description: 'Creating visual content to communicate messages.',
      icon: '🎨',
      order: 2,
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/150',
      title: 'SEO Services',
      description: 'Optimizing websites to rank higher on search engines.',
      icon: '🔍',
      order: 3,
    },
  ];

  const headers = ['SL.', 'Image', 'Title', 'Description', 'Icon', 'Order', 'Action'];

  const renderRow = (service) => (
    <tr key={service.id} className='text-gray-700 text-sm'>
      <td className="py-2 px-4 border-b">{service.id}</td>
      <td className="py-2 px-4 border-b">
        <img src={service.image} alt={service.title} className="w-16 h-16 rounded" />
      </td>
      <td className="py-2 px-4 border-b">{service.title}</td>
      <td className="py-2 px-4 border-b">{service.description}</td>
      <td className="py-2 px-4 border-b">{service.icon}</td>
      <td className="py-2 px-4 border-b">{service.order}</td>
      <td className="py-2 px-4 border-b">
        <button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600">Edit</button>
        <button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 ml-2">Delete</button>
      </td>
    </tr>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-gray-700">Services</h2>
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">+ Create</button>
      </div>
      <ExportButtons />
      <GenericTable headers={headers} data={servicesData} renderRow={renderRow} />
    </div>
  );
};

export default AllServices;
