// components/Sliders.js
import React, { useState } from 'react';
import GenericTable from './generictable';
import ExportButtons from './buttons';
import SearchBox from './searchbox';

const Sliders = () => {
  // Sample data
  const initialSliderData = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: '1st Banner',
      link: '/link-to-banner-1',
      description: 'Description for the first banner.',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: '2nd Banner',
      link: '/link-to-banner-2',
      description: 'Description for the second banner.',
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [sliderData, setSliderData] = useState(initialSliderData);

  const headers = ['SL.', 'Image', 'Title', 'Link', 'Description', 'Action'];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === '') {
      setSliderData(initialSliderData);
    } else {
      setSliderData(
        initialSliderData.filter((slider) =>
          slider.title.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const renderRow = (slider) => (
    <tr key={slider.id} className="text-gray-700 hover:bg-gray-50 cursor-pointer">
      <td className="py-2 px-4 border border-gray-300">{slider.id}</td>
      <td className="py-2 px-4 border border-gray-300">
        <img src={slider.image} alt={slider.title} className="w-24 h-auto" />
      </td>
      <td className="py-2 px-4 border border-gray-300">{slider.title}</td>
      <td className="py-2 px-4 border border-gray-300">
        <a href={slider.link} className="text-blue-500 hover:underline">
          {slider.link}
        </a>
      </td>
      <td className="py-2 px-4 border border-gray-300">{slider.description}</td>
      <td className="py-2 px-4 border border-gray-300">
        <div className="flex space-x-2">
          <button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600">Edit</button>
          <button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">Delete</button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="p-2 py-10 w-full">
      <div className="flex justify-between items-center bg-blue-100 p-4 rounded-none">
        <h2 className="text-xl font-semibold text-gray-700">Slider List</h2>
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">+ Create</button>
      </div>
      <div className="bg-white p-4 ">
        <div className="flex lg:justify-between lg:items-center items-start flex-col lg:flex-row">
          <ExportButtons />
          <div className="lg:ml-4 w-64">
            <SearchBox value={searchTerm} onChange={handleSearchChange} />
          </div>
        </div>
        <GenericTable headers={headers} data={sliderData} renderRow={renderRow} />
      </div>
    </div>
  );
};

export default Sliders;
