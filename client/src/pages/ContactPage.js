import {useState} from "react";
import Header from "../components/Header";
import ContactBg from "../components/BlurUpImage";

const ContactPage = () => {
  // State to track whether the high resolution image has been loaded
  const [isHighResLoaded, setIsHighResLoaded] = useState(false);

  return (
    // A flex container to center its children both horizontally and vertically
    <div className="d-flex justify-content-center align-items-center vh-100">
      {/* Main container for the contact page content */}
      <div className="main-container position-relative w-custom-90 h-custom-90 bg-dark bg-gradient rounded-3 overflow-hidden overflow-y-auto">
        <div className="contact-bg">
          {/* The header component, with a prop indicating if the high res image has been loaded */}
          <Header className="contact-nav" isHighRes={isHighResLoaded} />

          {/* The component responsible for displaying and managing the blur-up image */}
          <ContactBg onHighResLoad={setIsHighResLoaded} />

          {/* Contact heading */}
          <h2 className="text-start contact-heading text-white mt-5 pt-5 opacity-75">
            howzit
          </h2>

          {/* Contact details and links */}
          <div className="contact-text opacity-75">
            <p><strong>Christian Stander</strong></p>
            <p><strong>tel</strong>: 0632934685</p>
            <p><strong>email</strong>: <a href="mailto:stander.christian@gmail.com">stander.christian@gmail.com</a></p>
            
            {/* LinkedIn link with associated icon */}
            <a
              href="https://www.linkedin.com/in/christian-stander-310818276/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="contact-icons"
                src="linkedin.png"
                alt="linkedin"
              />
            </a>

            {/* GitHub link with associated icon */}
            <a
              href="https://github.com/MrShifu01"
              target="_blank"
              rel="noreferrer"
            >
              <img className="contact-icons" src="github.png" alt="github" />
            </a>

            {/* Portfolio link with associated icon */}
            <a
              href="https://stander-portfolio.netlify.app"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="opacity-75 contact-icons pb-1"
                src="portfolio.png"
                alt="portfolio"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exporting the ContactPage component for use in other parts of the app
export default ContactPage;
