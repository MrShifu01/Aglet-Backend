import React, { useState, useEffect } from 'react';

const BlurUpImage = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const lowResImage = "contactblur.jpg";
  const highResImage = "contact.jpeg";

  useEffect(() => {
    const img = new Image();
    img.src = highResImage;
    img.onload = () => {
      setIsLoaded(true);
      props.onHighResLoad(true);
    };
  }, []);

  return (
    <div 
      className={`contact-bg ${isLoaded ? 'high-res-loaded' : ''}`}
      style={{
        backgroundImage: isLoaded 
          ? `url(${highResImage})` 
          : `url(${lowResImage})`,
        backgroundPosition: "center center",
        transform: "translateY(-89px)"
      }}
    />
  );
};

export default BlurUpImage;