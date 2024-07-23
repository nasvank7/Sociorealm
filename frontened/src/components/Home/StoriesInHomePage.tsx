import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Story {
  image: string;
  username: string;
}

interface StoriesProps {
  stories: Story[];
}

const StoriesCarousel: React.FC<StoriesProps> = ({ stories }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="mt-2">
      {stories.map((story, index) => (
        <div
          key={index}
          className="w-24 h-24 flex-shrink-0 flex flex-col items-center "
        >
          <div className="w-20 h-20 rounded-full border-2 border-blue-500 overflow-hidden">
            <img
              src={story.image}
              alt={story.username}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xs mt-1 text-center text-white">
            {story.username}
          </p>
        </div>
      ))}
    </Slider>
  );
};

export default StoriesCarousel;
