import React from 'react';

const SearchBox = ({ value, onChange }) => {
  return (
    <div className="flex justify-end mb-2">
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={onChange}
        className="p-2 border border-gray-300 rounded w-64 text-gray-700"
      />
    </div>
  );
};

export default SearchBox;
