const Slide = ({ img, text }) => {
  return (
    <div className="slide">
      <img src={img} alt="image" />
      <span className="slide-text">{text}</span>
    </div>
  );
};

export default Slide;