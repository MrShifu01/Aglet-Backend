import React from "react";

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent rounded-top-2">
        <div className="container-fluid my-3 mx-5">
          <a className="navbar-brand" href="/">Home</a>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Movies</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">Contact</a>
              </li>
            </ul>
          </div>
      </nav>
    </>
  );
};

export default Header;
