import { useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import "./ImageSlider.css";

const ImageSlider = ({ children }) => {
  console.log(children);
  const [selectedSlide, setSelectedSlide] = useState(0);

  const showNextSlide = () => {
    setSelectedSlide((old) => (old === children.length - 1 ? 0 : old + 1));
  };

  const showPrevSlide = () => {
    setSelectedSlide((old) => (old === 0 ? children.length - 1 : old - 1));
  };

  return (
    <div className="image-slider">
      <div className="slider-btn slider-left" onClick={showPrevSlide}>
        <FaArrowAltCircleLeft />
      </div>
      <div className="slider-btn slider-right" onClick={showNextSlide}>
        <FaArrowAltCircleRight />
      </div>
      <div className="slider-window">{children[selectedSlide]}</div>
    </div>
  );
};

export default ImageSlider;
