import React, { useState } from 'react';
import GenericTable from './generictable';
import ExportButtons from './buttons';
import SearchBox from './searchbox';

const Categories = () => {
  // Sample data
  const initialCategoriesData = [
    {
      id: 1,
      image: 'https://via.placeholder.com/150',
      name: 'Technology',
      postNum: 45,
      slug: 'technology',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/150',
      name: 'Health',
      postNum: 30,
      slug: 'health',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/150',
      name: 'Lifestyle',
      postNum: 50,
      slug: 'lifestyle',
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [categoriesData, setCategoriesData] = useState(initialCategoriesData);

  const headers = ['SL.', 'Image', 'Name', 'Post Num', 'Slug', 'Action'];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === '') {
      setCategoriesData(initialCategoriesData);
    } else {
      setCategoriesData(
        initialCategoriesData.filter((category) =>
          category.name.toLowerCase().includes(value.toLowerCase()) ||
          category.slug.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const renderRow = (category) => (
    <tr key={category.id} className="text-gray-700 hover:bg-gray-50 cursor-pointer text-sm">
      <td className="py-2 px-4 border border-gray-300">{category.id}</td>
      <td className="py-2 px-4 border border-gray-300">
        <img src={category.image} alt={category.name} className="w-16 h-16 rounded" />
      </td>
      <td className="py-2 px-4 border border-gray-300">{category.name}</td>
      <td className="py-2 px-4 border border-gray-300">{category.postNum}</td>
      <td className="py-2 px-4 border border-gray-300">{category.slug}</td>
      <td className="py-2 px-4 border border-gray-300">
        <button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600">Edit</button>
        <button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 ml-2">Delete</button>
      </td>
    </tr>
  );

  return (
    <div className="p-2 py-10">
      <div className="flex justify-between items-center bg-blue-100 p-4 rounded-none">
        <h2 className="text-xl font-semibold text-gray-700">Categories</h2>
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">+ Create</button>
      </div>
      <div className="bg-white p-4">
        <div className="flex justify-between items-center">
          <ExportButtons />
          <div className="ml-4 w-64">
            <SearchBox value={searchTerm} onChange={handleSearchChange} />
          </div>
        </div>
        <GenericTable headers={headers} data={categoriesData} renderRow={renderRow} />
      </div>
    </div>
  );
};

export default Categories;
