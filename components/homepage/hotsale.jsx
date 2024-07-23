import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HotSale = ({ data }) => {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center mb-40">
      <div className="flex flex-col items-center">
        <div className="p-8 text-start">
          <h2 className="text-3xl font-bold mb-10 text-start text-black">Blazing Deals!</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl">
            {data.slice(0, 4).map((property, index) => (
              <Link key={index} href={`/properties/${property.id}`} passHref>
                <div className="relative cursor-pointer h-96 bg-white rounded-md shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                  <div className="relative">
                    <Image
                      src={property.image_url}
                      alt={property.title}
                      width={100}
                      height={100}
                      className="h-48 w-full object-cover"
                    />                    <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-regular p-1">{property.purpose}</div>
                    <div className="absolute bottom-2 bg-black text-white text-xs font-bold p-1 rounded-sm">{property.type}</div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between mb-10">
                      <span className=""></span>
                      <span className="text-yellow-500 font-bold text-xl">${property.price}</span>
                    </div>
                    <div className="flex flex-col justify-end bg-gray">
                      <h3 className="text-md font-semibold text-black mb-2">{property.title}</h3>
                      <p className="text-sm text-gray-600">{property.city}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-16 z-10">
          <a
            href="/properties"
            className="bg-yellow-400 hover:bg-black transition-all text-black hover:text-white py-2 px-4 rounded-md shadow-lg"
          >
            View More
          </a>
        </div>
      </div>
    </div>
  );
};

export default HotSale;
