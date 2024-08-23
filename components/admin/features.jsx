// components/Slider.js
import React from 'react';

const Features = () => {
  // Sample data
  const sliderData = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: '2nd Banner',
      link: '/link-to-banner-1',
      description: 'Description for the second banner.',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Main Banner',
      link: '/link-to-banner-2',
      description: 'Description for the main banner.',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Promotional Banner',
      link: '/link-to-banner-3',
      description: 'Description for the promotional banner.',
    },
  ];

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700 text-left">Features List</h2>
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">+ Create</button>
      </div>
      <div className="flex space-x-2 mb-4">
        <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">Copy</button>
        <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">CSV</button>
        <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">Excel</button>
        <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">PDF</button>
        <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">Print</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-left text-gray-700">
          <thead className="bg-gray-200 font-normal">
            <tr>
              <th className="py-2 px-4 border-b font-medium">Sl</th>
              <th className="py-2 px-4 border-b font-medium">Name</th>
              <th className="py-2 px-4 border-b font-medium">Slug</th>
              <th className="py-2 px-4 border-b font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {sliderData.map((slider) => (
              <tr key={slider.id} className='text-gray-700 hover:bg-gray-50 cursor-pointer'>
                <td className="py-2 px-4 border-b">{slider.id}</td>
                <td className="py-2 px-4 border-b">{slider.title}</td>
                <td className="py-2 px-4 border-b">
                  <a href={slider.link} className="text-blue-500 hover:underline">
                    {slider.link}
                  </a>
                </td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600">Edit</button>
                  <button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 ml-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Features;
