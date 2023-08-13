import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Function to login the user
const loginUser = async (credentials) => {
  try {
    // Sending a POST request to the login endpoint
    const response = await axios.post("/api/users/login", credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("Login successful", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 2000,
    });
    return response.data;
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 2000,
    });
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

// Function to signup the user
const signupUser = async (credentials) => {
  console.log("Received in signupUser:", credentials);
  try {
    // Sending a POST request to the signup endpoint
    const response = await axios.post("/api/users/signup", credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("Sign Up successful", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 2000,
    });
    return response.data;
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 2000,
    });
    throw new Error(error.response?.data?.message || "Sign Up failed");
  }
};

// Function to logout the user
const logoutUser = async () => {
  try {
    // Sending a POST request to the logout endpoint
    const response = await axios.post(
      "/api/users/logout",
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    toast.success("Logout successful", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 2000,
    });
    return response.data;
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 2000,
    });
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};

export const useAuth = () => {
  const navigate = useNavigate();

  // Setup the login mutation with react-query
  const loginMutation = useMutation(loginUser, {
    onSuccess: (data) => {
      // Store the user data in local storage upon successful login
      localStorage.setItem("userData", JSON.stringify(data));
      navigate('/');
    },
    onError: (error) => {
      // Handle any error here if needed
    },
  });

  // Setup the signup mutation with react-query
  const signupMutation = useMutation(signupUser, {
    onSuccess: (data) => {
      // Store the user data in local storage upon successful sign up
      localStorage.setItem("userData", JSON.stringify(data));
      navigate('/');
    },
    onError: (error) => {
      // Handle any error here if needed
    },
  });

  // Check if the user is logged in based on local storage
  const isLoggedIn = Boolean(localStorage.getItem("userData"));

  const logout = async () => {
    try {
      await logoutUser();
      // Clear the user data from local storage upon successful logout
      localStorage.removeItem("userData");
      navigate('/');
    } catch (error) {
      // Handle any error here if needed
    }
  };

  return {
    login: loginMutation.mutate,
    signup: signupMutation.mutate,
    logout,
    isLoggedIn,
  };
};
