import React, { useState } from 'react';
import GenericTable from './generictable';
import ExportButtons from './buttons';
import SearchBox from './searchbox';

const Posts = () => {
  // Sample data
  const initialPostsData = [
    {
      id: 1,
      image: 'https://via.placeholder.com/150',
      title: 'Understanding JavaScript Closures',
      author: 'John Doe',
      category: 'Programming',
      views: 1500,
      approved: true,
      status: 'Published',
      comments: 30,
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/150',
      title: 'The Benefits of a Healthy Diet',
      author: 'Jane Smith',
      category: 'Health',
      views: 1200,
      approved: false,
      status: 'Draft',
      comments: 15,
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/150',
      title: 'Top Travel Destinations for 2023',
      author: 'Alice Johnson',
      category: 'Travel',
      views: 1800,
      approved: true,
      status: 'Published',
      comments: 45,
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [postsData, setPostsData] = useState(initialPostsData);

  const headers = ['SL.', 'Image', 'Title', 'Author', 'Category', 'Views', 'Approved?', 'Status', 'Comments', 'Action'];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === '') {
      setPostsData(initialPostsData);
    } else {
      setPostsData(
        initialPostsData.filter((post) =>
          post.title.toLowerCase().includes(value.toLowerCase()) ||
          post.author.toLowerCase().includes(value.toLowerCase()) ||
          post.category.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const renderRow = (post) => (
    <tr key={post.id} className="text-gray-700 hover:bg-gray-50 cursor-pointer text-sm">
      <td className="py-2 px-4 border border-gray-300">{post.id}</td>
      <td className="py-2 px-4 border border-gray-300">
        <img src={post.image} alt={post.title} className="w-16 h-16 rounded" />
      </td>
      <td className="py-2 px-4 border border-gray-300">{post.title}</td>
      <td className="py-2 px-4 border border-gray-300">{post.author}</td>
      <td className="py-2 px-4 border border-gray-300">{post.category}</td>
      <td className="py-2 px-4 border border-gray-300">{post.views}</td>
      <td className="py-2 px-4 border border-gray-300">{post.approved ? 'Yes' : 'No'}</td>
      <td className="py-2 px-4 border border-gray-300">{post.status}</td>
      <td className="py-2 px-4 border border-gray-300">{post.comments}</td>
      <td className="py-2 px-4 border border-gray-300">
        <div className="flex space-x-2">
          <button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600">Edit</button>
          <button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">Delete</button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="p-2 py-10">
      <div className="flex justify-between items-center bg-blue-100 p-4 rounded-none">
        <h2 className="text-xl font-semibold text-gray-700">Posts</h2>
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">+ Create</button>
      </div>
      <div className="bg-white p-4">
        <div className="flex lg:flex-row flex-col justify-between lg:items-center">
          <ExportButtons />
          <div className="lg:ml-4 w-64">
            <SearchBox value={searchTerm} onChange={handleSearchChange} />
          </div>
        </div>
        <GenericTable headers={headers} data={postsData} renderRow={renderRow} />
      </div>
    </div>
  );
};

export default Posts;
