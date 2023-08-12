import React from "react";
import Header from "../components/Header";

const ContactPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="main-container position-relative w-custom-90 h-custom-90 bg-dark bg-gradient rounded-3 overflow-hidden overflow-y-auto">
        <div className="contact-bg">
          <Header className="contact-nav"/>
          <h2 className="text-start contact-heading text-white mt-5 pt-5 opacity-75">
            howzit
          </h2>
          {/* <img className="contact-image" src="contact.jpeg" alt="monkey suit" /> */}
          <div className="contact-text opacity-75">
            <p>Christian Stander</p>
            <p>tel: 0632934685</p>
            <p>emial: stander.christian@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
