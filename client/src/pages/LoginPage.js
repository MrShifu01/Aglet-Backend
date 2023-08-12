import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="main-container w-custom-90 h-custom-90 bg-dark rounded-3 overflow-hidden overflow-y-auto">
          <h2 className="text-center text-white mt-5 pt-5">Login</h2>
          <form className="container mt-5 text-white"> {/* Added 'text-white' class here */}
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
              <h5 className="me-2 text-white">Don't have an account?</h5>
                <Link to={"/signup"}>Sign Up</Link>
          </div>
        </div>
      </div>
    );
  };
  

export default LoginPage;
