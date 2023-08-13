import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../components/useAuth";

const LoginPage = () => {
  // State to manage the email and password input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Get the `login` method from the custom useAuth hook
  const { login } = useAuth();

  // Hook to programmatically navigate to other routes
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent the default behavior of form submission
    login({ email, password });  // Call the login function with user credentials
    navigate("/");  // Navigate to the home page after login
  };

  return (
    // A flex container to center its children both horizontally and vertically
    <div className="d-flex justify-content-center align-items-center vh-100">
      {/* Main container for the login page content */}
      <div className="main-container w-custom-90 h-custom-90 bg-dark rounded-3 overflow-hidden overflow-y-auto">
        <div className="auth-bg">
          <div className="auth-content">
            {/* Header component for the page */}
            <Header />
            
            {/* Login title */}
            <h2 className="text-center text-white mt-5 pt-5">Login</h2>
            
            {/* Login form */}
            <form className="container mt-5 text-white" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="mt-4">Email address</label>
                <input
                  type="email"
                  className="form-control bg-light"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control bg-light"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <div className="form-group form-check mt-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Remember me
                </label>
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
            </form>
            
            {/* Link to the signup page */}
            <div className="d-flex justify-content-center mt-5">
              <h5 className="me-2 text-white">Don't have an account?</h5>
              <Link to={"/signup"}>Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exporting the LoginPage component for use in other parts of the app
export default LoginPage;
