import React from 'react';

const demoShortVideosData = [
  {
    id: 1,
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    title: 'Short Video 1',
  },
  {
    id: 2,
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    title: 'Short Video 2',
  },
  {
    id: 3,
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    title: 'Short Video 3',
  },
  {
    id: 4,
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    title: 'Short Video 4',
  },
  
];

const ShortVideosGridComponent = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="">
        <h2 className="text-2xl font-bold mb-8">Your Short Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
          {demoShortVideosData.map((video) => (
            <div key={video.id} className="p-4 rounded-sm">
              <video controls className="w-auto h-96 object-cover rounded-md mb-2" style={{width: '225px', height: '400px'}}>
                <source src={video.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShortVideosGridComponent;
