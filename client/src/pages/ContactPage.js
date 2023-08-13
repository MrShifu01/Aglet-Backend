import React, {useState} from "react";
import Header from "../components/Header";
import ContactBg from "../components/BlurUpImage";

const ContactPage = () => {
  const [isHighResLoaded, setIsHighResLoaded] = useState(false);
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="main-container position-relative w-custom-90 h-custom-90 bg-dark bg-gradient rounded-3 overflow-hidden overflow-y-auto">
        <div className="contact-bg">
          <Header className="contact-nav" isHighRes={isHighResLoaded} />
          <ContactBg onHighResLoad={setIsHighResLoaded} />
          <h2 className="text-start contact-heading text-white mt-5 pt-5 opacity-75">
            howzit
          </h2>
          <div className="contact-text opacity-75">
            <p>Christian Stander</p>
            <p>tel: 0632934685</p>
            <p>email: <a href="mailto:stander.christian@gmail.com">stander.christian@gmail.com</a></p>
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
            <a
              href="https://github.com/MrShifu01"
              target="_blank"
              rel="noreferrer"
            >
              <img className="contact-icons" src="github.png" alt="github" />
            </a>
            <a
              href="https://stander-portfolio.netlify.app"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="opacity-75 contact-icons"
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

export default ContactPage;
