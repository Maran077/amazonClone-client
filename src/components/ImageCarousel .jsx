import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { Buffer } from "buffer";
import Button from "./Button";

const ImageCarousel = ({ images, divStyle, file }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToSlide = (index) => {
    setCurrentImageIndex(index);
  };

  const goToPreviousSlide = () => {
    const newIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(newIndex);
  };

  const goToNextSlide = () => {
    const newIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
  };

  return (
    <div className={divStyle}>
      <div className="h-[100%]">
        {images?.map((image, index) => (
          <img
            key={index}
            src={
              file
                ? URL.createObjectURL(image)
                : `data:image/jpg;base64,${Buffer.from(image.data).toString(
                    "base64"
                  )}`
            }
            alt={`Image ${index + 1}`}
            className={`absolute w-full h-full object-contain object-center transition-opacity duration-500 select-none ${
              currentImageIndex === index ? " opacity-100" : " opacity-0"
            }`}
          />
        ))}
      </div>
      <div className="absolute bottom-2 left-0 right-0 flex justify-center">
        {images?.map((_, index) => (
          <button
            key={index}
            className={`size-3 mx-1 rounded-full focus:outline-none ${
              index === currentImageIndex ? "bg-orange-500" : "bg-gray-300"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
      <Button
        hover={"bgStyle"}
        extraStyle={
          "absolute top-1/2 left-2 transform -translate-y-1/2 rounded-full hover:bg-yellow-200"
        }
        onClick={goToPreviousSlide}
      >
        <IoIosArrowBack className="size-[30px] text-orange-500" />
      </Button>
      <Button
        hover={"bgStyle"}
        extraStyle={
          "absolute top-1/2 right-2 transform -translate-y-1/2 rounded-full hover:bg-yellow-200 "
        }
        onClick={goToNextSlide}
      >
        <IoIosArrowForward className="size-[30px] text-orange-500 " />
      </Button>
    </div>
  );
};

export default ImageCarousel;
