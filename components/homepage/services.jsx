import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../../app/globals.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const CustomLeftArrow = ({ onClick }) => (
  <button className="arrow-btn left-arrow" onClick={onClick}>
    ←
  </button>
);

const CustomRightArrow = ({ onClick }) => (
  <button className="arrow-btn right-arrow bg-black" onClick={onClick}>
    →
  </button>
);

const ServicesCarousel = () => {
  return (
    <div className='w-screen min-h-screen bg-gray-100 flex items-center justify-center'>
      <div className="services-carousel-container">
        <h2 className='text-black mb-4'>Professional Services</h2>
        <Carousel
          responsive={responsive}
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
          infinite
          autoPlay
          autoPlaySpeed={4000}
          renderButtonGroupOutside
        >
          {[
            { name: 'Exterior Designer', title: '', img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
            { name: 'Electrician', title: '', img: 'https://img.freepik.com/free-photo/male-electrician-works-switchboard-with-electrical-connecting-cable_169016-15204.jpg' },
            { name: 'Plumber', title: '', img: 'https://t3.ftcdn.net/jpg/00/54/34/54/360_F_54345414_dETkGQ7zMBUgbB8Le9b9oYf9DJ4cYZH2.jpg' },
            { name: 'Document Verification', title: '', img: 'https://media.istockphoto.com/id/1349390515/photo/paperless-workplace-idea-e-signing-electronic-signature-document-management-businessman-signs.jpg?s=612x612&w=0&k=20&c=EyQl13diegNV5DVLnb0krcAcRDhL7NiSA7IEVImZs6Q=' }
          ].map((member, index) => (
            <div key={index} className="service-card text-black mb-12">
              <img src={member.img} alt={member.name} />
              <div className="service-info">
                <h3 className='text-white'>{member.name}</h3>
                <p>{member.title}</p>
              </div>
            </div>
          ))}
        </Carousel>
        <div className="mt- text-center">
        <a href="/" className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-black transition-all">
          View All Services
        </a>
      </div>
      </div>
    </div>
  );
};

export default ServicesCarousel;
