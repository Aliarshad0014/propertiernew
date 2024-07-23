import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const LogoCarousel = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    const logos = [
        'https://propertier.com.pk/assets/gallery/jabeali.jpg',
        'https://propertier.com.pk/assets/gallery/forest.jpg',
        'https://propertier.com.pk/assets/gallery/gobalvillage.jpg',
        'https://propertier.com.pk/assets/gallery/sadar-enclave.jpg',
        'https://propertier.com.pk/assets/gallery/jabeali.jpg',
        'https://propertier.com.pk/assets/gallery/forest.jpg',
        'https://propertier.com.pk/assets/gallery/gobalvillage.jpg',
        'https://propertier.com.pk/assets/gallery/sadar-enclave.jpg',
    ];

    return (
        <div className="container mx-auto py-10 bg-yellow-50">
            <Slider {...settings}>
                {logos.map((logo, index) => (
                    <div key={index} className="px-2">
                        <img className="w-full h-auto max-h-24 mx-auto" src={logo} alt={`Company Logo ${index + 1}`} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default LogoCarousel;
