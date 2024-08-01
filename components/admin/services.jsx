import React, { useState } from 'react';
import GenericTable from './generictable';
import ExportButtons from './buttons';
import SearchBox from './searchbox';

const AllServices = () => {
  // Sample data
  const initialServicesData = [
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

  const [searchTerm, setSearchTerm] = useState('');
  const [servicesData, setServicesData] = useState(initialServicesData);

  const headers = ['SL.', 'Image', 'Title', 'Description', 'Icon', 'Order', 'Action'];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === '') {
      setServicesData(initialServicesData);
    } else {
      setServicesData(
        initialServicesData.filter((service) =>
          service.title.toLowerCase().includes(value.toLowerCase()) ||
          service.description.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const renderRow = (service) => (
    <tr key={service.id} className="text-gray-700 hover:bg-gray-50 cursor-pointer text-sm">
      <td className="py-2 px-4 border border-gray-300">{service.id}</td>
      <td className="py-2 px-4 border border-gray-300">
        <img src={service.image} alt={service.title} className="w-16 h-16 rounded" />
      </td>
      <td className="py-2 px-4 border border-gray-300">{service.title}</td>
      <td className="py-2 px-4 border border-gray-300">{service.description}</td>
      <td className="py-2 px-4 border border-gray-300">{service.icon}</td>
      <td className="py-2 px-4 border border-gray-300">{service.order}</td>
      <td className="py-2 px-4 border border-gray-300">
        <button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600">Edit</button>
        <button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 ml-2">Delete</button>
      </td>
    </tr>
  );

  return (
    <div className="p-2 py-10">
      <div className="flex justify-between items-center bg-blue-100 p-4 rounded-none">
        <h2 className="text-xl font-semibold text-gray-700">Services</h2>
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">+ Create</button>
      </div>
      <div className="bg-white p-4">
        <div className="flex lg:flex-row flex-col justify-between lg:items-center">
          <ExportButtons />
          <div className="lg:ml-4 w-64">
            <SearchBox value={searchTerm} onChange={handleSearchChange} />
          </div>
        </div>
        <GenericTable headers={headers} data={servicesData} renderRow={renderRow} />
      </div>
    </div>
  );
};

export default AllServices;
