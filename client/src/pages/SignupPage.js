import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { toast } from 'react-toastify';
import { useAuth } from '../components/useAuth';
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;
    const confirmPassword = event.target[2].value;

    if (password !== confirmPassword) {
        toast.error('Passwords do not match', {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 2000
        });
        return;
    }
    console.log("Submitting:", { email, password });
    signup({ email, password });
    navigate('/');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="main-container w-custom-90 h-custom-90 bg-dark rounded-3 overflow-hidden overflow-y-auto">
        <div className="auth-bg">
          <div className="auth-content">
            <Header />
            <h2 className="text-center text-white mt-5 pt-5">Sign Up</h2>
            <form className="container mt-5 text-white" onSubmit={handleSignup}>
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
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control bg-light"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>
              <div className="form-group mt-3">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control bg-light"
                  id="exampleInputPassword2"
                  placeholder="Confirm Password"
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

export default SignupPage;
