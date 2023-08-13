// Importing necessary React functionalities and dependencies
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useAuth } from "./useAuth";  // Custom hook for authentication

const Header = ({ isHighRes }) => {
  // Destructure methods and properties from the useAuth custom hook
  const { isLoggedIn, logout } = useAuth();

  // Define the style object based on the isHighRes prop
  const style = isHighRes ? { zIndex: 2 } : {};

  return (
    <>
      <Navbar
        // Apply the style object
        style={style}

        // Set the background to transparent
        bg="transparent"

        // Use the 'lg' breakpoint for the Navbar collapse
        expand="lg"

        // Add custom classes to the Navbar
        className="rounded-top-2 navbar-text-dark"
      >
        <div className="container-fluid my-3 mx-5">
          <Navbar.Brand 
            className="text-white opacity-75 home-link" 
            href="/"
          >
            Home
          </Navbar.Brand>
          <Navbar.Toggle 
            className="custom-toggle" 
            aria-controls="basic-navbar-nav" 
          />
          <Navbar.Collapse 
            id="basic-navbar-nav" 
            className="justify-content-end"
          >
            <Nav className="navbar-nav">
              <Nav.Item className="pe-3">
                <Nav.Link
                  className="text-white opacity-75 contact-link"
                  href="/contact"
                >
                  Contact
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                {/* Show the favourites link if the user is logged in */}
                {isLoggedIn && (
                  <Nav.Link as={Link} to="/favourites">
                    <img
                      className="favourites-nav-link"
                      src="heart.png"
                      alt="favourites heart"
                    />
                  </Nav.Link>
                )}
              </Nav.Item>
              <NavDropdown
                title={
                  <img
                    className="avatar home-link"
                    src="user.png"
                    alt="contact"
                  />
                }
                id="nav-dropdown"
              >
                {/* Conditionally render logout or login/signup based on isLoggedIn */}
                {isLoggedIn ? (
                  <NavDropdown.Item 
                    className="dropdown-text" 
                    onClick={logout}
                  >
                    Logout
                  </NavDropdown.Item>
                ) : (
                  <>
                    <NavDropdown.Item
                      className="dropdown-text"
                      as={Link}
                      to="/login"
                    >
                      Login
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="dropdown-text"
                      as={Link}
                      to="/signup"
                    >
                      Signup
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  );
};

// Export the component for use in other parts of the app
export default Header;
