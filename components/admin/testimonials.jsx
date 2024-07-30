// components/Testimonials.js
import React from 'react';
import GenericTable from './GenericTable';
import ExportButtons from './buttons';

const Testimonials = () => {
  // Sample data
  const testimonialsData = [
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

  const headers = ['SL.', 'Image', 'Name', 'Testimonial', 'Action'];

  const renderRow = (testimonial) => (
    <tr key={testimonial.id} className='text-gray-700 text-sm'>
      <td className="py-2 px-4 border-b">{testimonial.id}</td>
      <td className="py-2 px-4 border-b">
        <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full" />
      </td>
      <td className="py-2 px-4 border-b">{testimonial.name}</td>
      <td className="py-2 px-4 border-b">{testimonial.testimonial}</td>
      <td className="py-2 px-4 border-b">
        <button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600">Edit</button>
        <button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 ml-2">Delete</button>
      </td>
    </tr>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-gray-700">Testimonials</h2>
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">+ Create</button>
      </div>
      <ExportButtons />
      <GenericTable headers={headers} data={testimonialsData} renderRow={renderRow} />
    </div>
  );
};

export default Testimonials;
