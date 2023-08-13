// Importing necessary React functionality
import React from "react";

// Define the CategoryCard component, which takes a 'category' prop
const CategoryCard = ({ category }) => {
  // Create a ref for the video element
  let videoRef = React.createRef();

  // Define the event handler for the mouse over event
  const handleMouseOver = () => {
    // Attempt to play the video when the mouse is over the card
    // Using a Promise-based approach for play() because modern browsers 
    // return a promise from the play() method which may get rejected
    videoRef.current.play().catch((error) => {
      // Log an error if the video play action fails
      console.error("Video play failed:", error);
    });
  };

  // Define the event handler for the mouse out event
  const handleMouseOut = () => {
    // Pause the video when the mouse is no longer over the card
    videoRef.current.pause();
    
    // Reset the video playback to the start
    videoRef.current.currentTime = 0; 
  };

  return (
    // Fragment to group multiple elements
    <>
      <div
        // Set classes for styling and positioning
        className="category-image-container position-relative"
        
        // Attach the mouse event handlers to the div
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <video
          // Use the videoRef for this video element
          ref={videoRef}
          
          // Set the video source to the one provided in the 'category' prop
          src={category.video}
          
          // Set the width of the video
          width="300px"
          
          // Set the thumbnail/poster for the video
          poster={category.thumbnail}
          
          // Mute the video by default
          muted
        >
          {/* Fallback text for browsers that don't support the video tag */}
          Your browser does not support the video tag.
        </video>
        
        {/* Display the title of the category */}
        <h2 className="category-heading">{category.title}</h2>
      </div>
    </>
  );
};

// Export the component for use in other parts of the app
export default CategoryCard;
