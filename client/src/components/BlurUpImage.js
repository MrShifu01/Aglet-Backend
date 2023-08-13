// Importing necessary hooks and React functionality
import { useState, useEffect } from 'react';

// Define the BlurUpImage component
const BlurUpImage = (props) => {
  // State for keeping track if the high resolution image is loaded
  const [isLoaded, setIsLoaded] = useState(false);

  // The path for the low resolution (blurred) image
  const lowResImage = "contactblur.jpg";
  
  // The path for the high resolution image
  const highResImage = "contact.jpeg";

  // The useEffect hook runs the provided function after the component mounts
  useEffect(() => {
    // Create a new image element
    const img = new Image();
    
    // Set the source of the image to the high resolution image
    img.src = highResImage;

    // Add an event listener to check when the high resolution image has loaded
    img.onload = () => {
      // Set the state to true when the image is loaded
      setIsLoaded(true);

      // Call the passed in function from props with true to signal that the high res image has loaded
      props.onHighResLoad(true);
    };
  }, []); // Empty dependency array ensures this runs only once after component mounts

  return (
    <div 
      // Add a class based on whether the high resolution image is loaded
      className={`contact-bg ${isLoaded ? 'high-res-loaded' : ''}`}
      style={{
        // Use the high resolution image if loaded, otherwise use the low resolution one
        backgroundImage: isLoaded 
          ? `url(${highResImage})` 
          : `url(${lowResImage})`,
        backgroundPosition: "center center",
        transform: "translateY(-89px)"
      }}
    />
  );
};

// Export the component for use in other parts of the app
export default BlurUpImage;
