import React, { useState } from 'react';

const NewListingComponent = () => {
  const [purpose, setPurpose] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState([]);
  const [videoLink, setVideoLink] = useState('');
  const [shortVideo, setShortVideo] = useState(null);
  const [featuredImage, setFeaturedImage] = useState(null);

  const handleFeatureChange = (feature) => {
    setFeatures(prevFeatures => 
      prevFeatures.includes(feature) 
        ? prevFeatures.filter(f => f !== feature) 
        : [...prevFeatures, feature]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const formData = {
      purpose,
      propertyType,
      title,
      price,
      bedrooms,
      bathrooms,
      city,
      address,
      area,
      description,
      features,
      videoLink,
      shortVideo,
      featuredImage
    };
    console.log('Form submitted:', formData);
    // Reset form fields after submission
    setPurpose('');
    setPropertyType('');
    setTitle('');
    setPrice('');
    setBedrooms('');
    setBathrooms('');
    setCity('');
    setAddress('');
    setArea('');
    setDescription('');
    setFeatures([]);
    setVideoLink('');
    setShortVideo(null);
    setFeaturedImage(null);
  };

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="container mx-auto px-4 py-8 bg-white text-black max-w-7xl">
        <h2 className="text-2xl font-bold mb-8">Create Property</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row lg:space-x-4">
            {/* Left Form Section */}
            <div className="w-full lg:w-1/2 space-y-4">
              <div>
                <label htmlFor="purpose" className="block text-gray-700">Select Purpose</label>
                <select 
                  id="purpose" 
                  value={purpose} 
                  onChange={(e) => setPurpose(e.target.value)} 
                  className="w-full px-4 py-2 border rounded-md poppins"
                >
                  <option value="">Select Purpose</option>
                  <option value="sale">Sale</option>
                  <option value="rent">Rent</option>
                </select>
              </div>
              <div>
                <label htmlFor="propertyType" className="block text-gray-700">Type of Property</label>
                <select 
                  id="propertyType" 
                  value={propertyType} 
                  onChange={(e) => setPropertyType(e.target.value)} 
                  className="w-full px-4 py-2 border rounded-md poppins"
                >
                  <option value="">Select Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                </select>
              </div>
              <div>
                <label htmlFor="title" className="block text-gray-700">Property Title</label>
                <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 border rounded-md poppins" />
              </div>
              <div>
                <label htmlFor="price" className="block text-gray-700">Price</label>
                <input id="price" type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-4 py-2 border rounded-md poppins" />
              </div>
              <div>
                <label htmlFor="bedrooms" className="block text-gray-700">Bedrooms</label>
                <input id="bedrooms" type="text" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className="w-full px-4 py-2 border rounded-md poppins" />
              </div>
              <div>
                <label htmlFor="bathrooms" className="block text-gray-700">Bathrooms</label>
                <input id="bathrooms" type="text" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} className="w-full px-4 py-2 border rounded-md poppins" />
              </div>
              <div>
                <label htmlFor="city" className="block text-gray-700">City</label>
                <select 
                  id="city" 
                  value={city} 
                  onChange={(e) => setCity(e.target.value)} 
                  className="w-full px-4 py-2 border rounded-md poppins"
                >
                  <option value="">Select City</option>
                  <option value="miami">Miami</option>
                  <option value="new-york">New York</option>
                  <option value="los-angeles">Los Angeles</option>
                </select>
              </div>
              <div>
                <label htmlFor="address" className="block text-gray-700">Address</label>
                <input id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-4 py-2 border rounded-md poppins" />
              </div>
              <div>
                <label htmlFor="area" className="block text-gray-700">Area</label>
                <input id="area" type="text" value={area} onChange={(e) => setArea(e.target.value)} className="w-full px-4 py-2 border rounded-md poppins" />
              </div>
              <div>
                <label htmlFor="description" className="block text-gray-700">Description</label>
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2 border rounded-md poppins" />
              </div>
              <div>
                <label htmlFor="images" className="block text-gray-700">Upload Images</label>
                <input id="images" type="file" multiple className="w-full px-4 py-2 border rounded-md poppins" />
              </div>
            </div>

            {/* Right Form Section */}
            <div className="w-full lg:w-1/2 space-y-4">
              <div>
                <h3 className="text-lg font-bold mb-2">Features</h3>
                {['Pool', 'Garage', 'Garden', 'Gym'].map((feature) => (
                  <div key={feature} className="flex items-center">
                    <input
                      id={feature}
                      type="checkbox"
                      checked={features.includes(feature)}
                      onChange={() => handleFeatureChange(feature)}
                      className="mr-2"
                    />
                    <label htmlFor={feature} className="text-gray-700">{feature}</label>
                  </div>
                ))}
              </div>
              <div>
                <label htmlFor="videoLink" className="block text-gray-700">Add Video Link</label>
                <input id="videoLink" type="text" value={videoLink} onChange={(e) => setVideoLink(e.target.value)} className="w-full px-4 py-2 border rounded-md poppins" />
              </div>
              <div>
                <label htmlFor="shortVideo" className="block text-gray-700">Add Short Video</label>
                <input id="shortVideo" type="file" onChange={(e) => setShortVideo(e.target.files[0])} className="w-full px-4 py-2 border rounded-md poppins" />
              </div>
              <div>
                <label htmlFor="featuredImage" className="block text-gray-700">Featured Image</label>
                <input id="featuredImage" type="file" onChange={(e) => setFeaturedImage(e.target.files[0])} className="w-full px-4 py-2 border rounded-md poppins" />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewListingComponent;
