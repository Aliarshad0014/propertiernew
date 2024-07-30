// components/Sliders.js
import React from 'react';
import GenericTable from './GenericTable';
import ExportButtons from './buttons';

const Sliders = () => {
  // Sample data
  const sliderData = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: '1st Banner',
      link: '/link-to-banner-1',
      description: 'Description for the First banner.',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: '2nd Banner',
      link: '/link-to-banner-1',
      description: 'Description for the second banner.',
    },
  ];

  const headers = ['SL.', 'Image', 'Title', 'Link', 'Description', 'Action'];

  const renderRow = (slider) => (
    <tr key={slider.id} className='text-gray-700 hover:bg-gray-50 cursor-pointer'>
      <td className="py-2 px-4 border-b">{slider.id}</td>
      <td className="py-2 px-4 border-b">
        <img src={slider.image} alt={slider.title} className="w-24 h-auto" />
      </td>
      <td className="py-2 px-4 border-b">{slider.title}</td>
      <td className="py-2 px-4 border-b">
        <a href={slider.link} className="text-blue-500 hover:underline">
          {slider.link}
        </a>
      </td>
      <td className="py-2 px-4 border-b">{slider.description}</td>
      <td className="py-2 px-4 border-b">
        <button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600">Edit</button>
        <button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 ml-2">Delete</button>
      </td>
    </tr>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Slider List</h2>
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">+ Create</button>
      </div>
      <ExportButtons />
      <GenericTable headers={headers} data={sliderData} renderRow={renderRow} />
    </div>
  );
};

export default Sliders;
