import React from 'react';

const SearchBox = ({ value, onChange }) => {
  return (
    <div className="flex lg:justify-end justify-start mb-2">
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={onChange}
        className="p-2 border border-gray-300 rounded lg:w-full w-52 text-gray-700"
      />
    </div>
  );
};

export default SearchBox;
