import React from 'react';

const demoPropertiesData = [
  {
    id: 1,
    image: 'https://via.placeholder.com/300x200',
    title: 'Luxury Villa with Ocean View',
    price: '$1,200,000',
    location: 'Miami Beach, FL',
    area: '4,500 sqft',
    totalLikes: 120,
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/300x200',
    title: 'Modern Apartment in City Center',
    price: '$650,000',
    location: 'New York, NY',
    area: '1,200 sqft',
    totalLikes: 80,
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/300x200',
    title: 'Spacious Family Home with Garden',
    price: '$980,000',
    location: 'Los Angeles, CA',
    area: '3,000 sqft',
    totalLikes: 150,
  },
  {
    id: 4,
    image: 'https://via.placeholder.com/300x200',
    title: 'Luxury Condo with Panoramic Views',
    price: '$1,800,000',
    location: 'San Francisco, CA',
    area: '2,800 sqft',
    totalLikes: 180,
  },
  {
    id: 5,
    image: 'https://via.placeholder.com/300x200',
    title: 'Lakefront Cabin Retreat',
    price: '$450,000',
    location: 'Seattle, WA',
    area: '1,500 sqft',
    totalLikes: 90,
  },
];

const PropertiesComponent = () => {
  return (
    <div className="bg-white min-h-full py-8">
      {/* Properties Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        {/* Map through demo data to render each property */}
        {demoPropertiesData.map((property) => (
          <div key={property.id} className="bg-white p-4 rounded-lg shadow-md relative">
            <img src={property.image} alt={property.title} className="w-full h-40 object-cover rounded-md mb-2" />
            <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
            <button className="bg-green-500 hover:bg-green-600 transition-all text-white px-2 py-2 rounded absolute top-0 right-0 mt-2 mr-2">Make Featured</button>
            <div className="flex flex-col text-right text-gray-600 mb-2">
              <p>Price: {property.price}</p>
              <p>Location: {property.location}</p>
            </div>
            <div className="flex flex-col text-right text-gray-600 mb-6">
              <p>Area: {property.area}</p>
              <p>Total Likes: {property.totalLikes}</p>
            </div>
            <div className="flex justify-end space-x-2">
              <button className="border border-yellow-500 text-black transition-all hover:bg-yellow-500 px-4 py-2 rounded">Detail</button>
              <button className="bg-yellow-500 hover:bg-black transition-all text-white px-4 py-2 rounded">Edit Price</button>
              <button className="bg-red-500 hover:bg-red-600 transition-all text-white px-4 py-2 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertiesComponent;
