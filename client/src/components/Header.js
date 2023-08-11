import React from "react";

const Header = () => {
  return (
    <>
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 d-flex alig">
                <h1 className="text-white">Header</h1>
                <a href="/" className="nav-link">Home</a>
                <a href="/" className="nav-link">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
