import React, { useState } from 'react';
import GenericTable from './generictable';
import ExportButtons from './buttons';
import SearchBox from './searchbox';

const Tags = () => {
  // Sample data
  const initialTagsData = [
    {
      id: 1,
      name: 'JavaScript',
      postCount: 25,
      slug: 'javascript',
    },
    {
      id: 2,
      name: 'Health',
      postCount: 15,
      slug: 'health',
    },
    {
      id: 3,
      name: 'Travel',
      postCount: 20,
      slug: 'travel',
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [tagsData, setTagsData] = useState(initialTagsData);

  const headers = ['SL.', 'Name', 'Post Count', 'Slug', 'Action'];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === '') {
      setTagsData(initialTagsData);
    } else {
      setTagsData(
        initialTagsData.filter((tag) =>
          tag.name.toLowerCase().includes(value.toLowerCase()) ||
          tag.slug.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const renderRow = (tag) => (
    <tr key={tag.id} className="text-gray-700 hover:bg-gray-50 cursor-pointer text-sm">
      <td className="py-2 px-4 border border-gray-300">{tag.id}</td>
      <td className="py-2 px-4 border border-gray-300">{tag.name}</td>
      <td className="py-2 px-4 border border-gray-300">{tag.postCount}</td>
      <td className="py-2 px-4 border border-gray-300">{tag.slug}</td>
      <td className="py-2 px-4 border border-gray-300">
        <button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600">Edit</button>
        <button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 ml-2">Delete</button>
      </td>
    </tr>
  );

  return (
    <div className="p-2 py-10">
      <div className="flex justify-between items-center bg-blue-100 p-4 rounded-none">
        <h2 className="text-xl font-semibold text-gray-700">Tags</h2>
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">+ Create</button>
      </div>
      <div className="bg-white p-4">
        <div className="flex lg:flex-row flex-col justify-between lg:items-center">
          <ExportButtons />
          <div className="lg:ml-4 w-64">
            <SearchBox value={searchTerm} onChange={handleSearchChange} />
          </div>
        </div>
        <GenericTable headers={headers} data={tagsData} renderRow={renderRow} />
      </div>
    </div>
  );
};

export default Tags;
