import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const Header = () => {
  return (
    <>
      <Navbar bg="transparent" expand="lg" className="rounded-top-2">
        <div className="container-fluid my-3 mx-5">
          <Navbar.Brand className="text-white opacity-75 home-link" href="/">Home</Navbar.Brand>
          <Nav className="navbar-nav">
            <Nav.Item className="pe-3">
              <Nav.Link className="text-white opacity-75 contact-link" href="/">Contact</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/favourites">
                <img
                  className="favourites-nav-link"
                  src="heart.png"
                  alt="favourites heart"
                />
              </Nav.Link>
            </Nav.Item>
            <NavDropdown
              title={<img className="avatar home-link" src="user.png" alt="contact" />}
              id="nav-dropdown"
            >
              <NavDropdown.Item className="dropdown-text" as={Link} to="/login">
                Login
              </NavDropdown.Item>
              <NavDropdown.Item className="dropdown-text" as={Link} to="/signup">
                Signup
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </div>
      </Navbar>
    </>
  );
};

export default Header;
