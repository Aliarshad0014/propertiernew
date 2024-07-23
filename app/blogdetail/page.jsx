import React from 'react';

const BlogReadPage = () => {
  const blog = {
    title: 'How to Create a Responsive Blog Page with React and Tailwind CSS',
    author: 'admin',
    image: 'https://propertier.com.pk/storage/posts/unleash-the-power-of-propertier-the-best-crm-software-for-real-estate-professionals-2024-05-13-6641f03234c96.png',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. 

    Nunc congue nisi vitae suscipit tellus mauris a diam maecenas. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus. 
    In egestas erat imperdiet sed euismod nisi porta lorem mollis. 

    Lectus arcu bibendum at varius vel pharetra. Massa ultricies mi quis hendrerit dolor magna eget est lorem. 
    Scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam.`
  };

  const latestPosts = [
    'Post 1',
    'Post 2',
    'Post 3',
    'Post 4'
  ];

  const categories = [
    { name: 'Real Estate', image: 'https://propertier.com.pk/storage/posts/unleash-the-power-of-propertier-the-best-crm-software-for-real-estate-professionals-2024-05-13-6641f03234c96.png', count: 16 },
    { name: 'News', image: 'https://propertier.com.pk/storage/posts/unleash-the-power-of-propertier-the-best-crm-software-for-real-estate-professionals-2024-05-13-6641f03234c96.png', count: 2 }
  ];

  return (
    <div className="bg-white min-h-screen p-4 md:p-8">
      <div className="blog-read-page max-w-6xl mx-auto p-4 md:p-6 bg-white flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-12 text-black">
        <div className="left-content flex-1">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">{blog.title}</h1>
          <p className="text-gray-600 mb-4">by {blog.author}</p>
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-auto lg:h-1/2 object-cover rounded-lg mb-6"
          />
          <div className="blog-content text-base md:text-lg leading-relaxed">
            {blog.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <div className="right-content w-full lg:w-1/4">
          <div className="latest-posts mb-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Latest Posts</h2>
            <ul className="list-disc list-inside">
              {latestPosts.map((post, index) => (
                <li key={index} className="mb-2">
                  {post}
                </li>
              ))}
            </ul>
          </div>
          <div className="categories">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Categories</h2>
            <div className="space-y-4">
              {categories.map((category, index) => (
                <div key={index} className="relative rounded-lg overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-between items-end p-4">
                    <h3 className="text-white font-bold">{category.name}</h3>
                    <span className="text-white bg-blue-600 rounded-full px-2 py-1 text-sm">{category.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogReadPage;
