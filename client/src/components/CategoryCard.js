import React from "react";

const CategoryCard = ({ category }) => {
  let videoRef = React.createRef();

  const handleMouseOver = () => {
    // Using Promise-based approach for play()
    videoRef.current.play().catch((error) => {
      console.error("Video play failed:", error);
    });
  };

  const handleMouseOut = () => {
    videoRef.current.pause();
    videoRef.current.currentTime = 0; // reset video to start
  };

  return (
    <>
      <div
        className="category-image-container position-relative"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <video
          ref={videoRef}
          src={category.video}
          width="300px"
          poster={category.thumbnail}
          muted
        >
          Your browser does not support the video tag.
        </video>
        <h2 className="category-heading">{category.title}</h2>
      </div>
    </>
  );
};

export default CategoryCard;
