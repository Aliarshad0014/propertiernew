import React, { useState } from 'react';
import GenericTable from './generictable';
import ExportButtons from './buttons';
import SearchBox from './searchbox';

const Testimonials = () => {
  // Sample data
  const initialTestimonialsData = [
    {
      id: 1,
      image: 'https://via.placeholder.com/150',
      name: 'John Doe',
      testimonial: 'This service was excellent and exceeded my expectations.',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/150',
      name: 'Jane Smith',
      testimonial: 'The team was professional and delivered great results.',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/150',
      name: 'Alice Johnson',
      testimonial: 'Highly recommend this company for their outstanding service.',
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [testimonialsData, setTestimonialsData] = useState(initialTestimonialsData);

  const headers = ['SL.', 'Image', 'Name', 'Testimonial', 'Action'];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === '') {
      setTestimonialsData(initialTestimonialsData);
    } else {
      setTestimonialsData(
        initialTestimonialsData.filter((testimonial) =>
          testimonial.name.toLowerCase().includes(value.toLowerCase()) ||
          testimonial.testimonial.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const renderRow = (testimonial) => (
    <tr key={testimonial.id} className="text-gray-700 hover:bg-gray-50 cursor-pointer text-sm">
      <td className="py-2 px-4 border border-gray-300">{testimonial.id}</td>
      <td className="py-2 px-4 border border-gray-300">
        <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full" />
      </td>
      <td className="py-2 px-4 border border-gray-300">{testimonial.name}</td>
      <td className="py-2 px-4 border border-gray-300">{testimonial.testimonial}</td>
      <td className="py-2 px-4 border border-gray-300">
        <button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600">Edit</button>
        <button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 ml-2">Delete</button>
      </td>
    </tr>
  );

  return (
    <div className="p-2 py-10">
      <div className="flex justify-between items-center bg-blue-100 p-4 rounded-none">
        <h2 className="text-xl font-semibold text-gray-700">Testimonials</h2>
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">+ Create</button>
      </div>
      <div className="bg-white p-4">
        <div className="flex justify-between items-center">
          <ExportButtons />
          <div className="ml-4 w-64">
            <SearchBox value={searchTerm} onChange={handleSearchChange} />
          </div>
        </div>
        <GenericTable headers={headers} data={testimonialsData} renderRow={renderRow} />
      </div>
    </div>
  );
};

export default Testimonials;
