import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { toast } from 'react-toastify';
import { useAuth } from '../components/useAuth';
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  // Extracting the signup method from our custom authentication hook
  const { signup } = useAuth();

  // Hook to programmatically navigate to other routes
  const navigate = useNavigate();

  // Function to handle the signup form submission
  const handleSignup = (event) => {
    event.preventDefault();  // Prevent default form submission behavior

    // Extracting values from the form
    const email = event.target[0].value;
    const password = event.target[1].value;
    const confirmPassword = event.target[2].value;

    // Check if the entered passwords match
    if (password !== confirmPassword) {
        toast.error('Passwords do not match', {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 2000
        });
        return;
    }

    // Debug log of the user's email and password (this can be removed later)
    console.log("Submitting:", { email, password });

    // Call the signup function with the user's email and password
    signup({ email, password });
    navigate('/');  // Navigate to the home page after signing up
  };

  return (
    // A flex container to center its children both horizontally and vertically
    <div className="d-flex justify-content-center align-items-center vh-100">
      {/* Main container for the signup page content */}
      <div className="main-container w-custom-90 h-custom-90 bg-dark rounded-3 overflow-hidden overflow-y-auto">
        <div className="auth-bg">
          <div className="auth-content">
            {/* Header component for the page */}
            <Header />

            {/* Signup title */}
            <h2 className="text-center text-white mt-5 pt-5">Sign Up</h2>

            {/* Signup form */}
            <form className="container mt-5 text-white" onSubmit={handleSignup}>
              {/* Email input field */}
              <div className="form-group">
                <label className="mt-4">Email address</label>
                <input
                  type="email"
                  className="form-control bg-light"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>

              {/* Password input field */}
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control bg-light"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>

              {/* Confirm password input field */}
              <div className="form-group mt-3">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control bg-light"
                  id="exampleInputPassword2"
                  placeholder="Confirm Password"
                />
              </div>

              {/* Remember me checkbox */}
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

              {/* Signup button */}
              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
            </form>

            {/* Link to navigate to the login page */}
            <div className="d-flex justify-content-center mt-5">
              <h5 className="me-2 text-white">Already have an account?</h5>
              <Link to={"/login"}>Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exporting the SignupPage component for use in other parts of the app
export default SignupPage;
