import axios from "axios";
import { useMutation} from "react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const loginUser = async (credentials) => {
  try {
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

const signupUser = async (credentials) => {
  console.log("Received in signupUser:", credentials);
  try {
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

const logoutUser = async () => {
  try {
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
  const loginMutation = useMutation(loginUser, {
    onSuccess: (data) => {
      // Store the user data in local storage upon successful login
      localStorage.setItem("userData", JSON.stringify(data));
      navigate('/')
    },
    onError: (error) => {
    },
  });

  const signupMutation = useMutation(signupUser, {
    onSuccess: (data) => {
      // Store the user data in local storage upon successful sign up
      localStorage.setItem("userData", JSON.stringify(data));
      navigate('/')
    },
    onError: (error) => {
    },
  });

  const isLoggedIn = Boolean(localStorage.getItem("userData"));

  const logout = async () => {
    try {
      await logoutUser();
      // Clear the user data from local storage upon successful logout
      localStorage.removeItem("userData");
      navigate('/')
    } catch (error) {}
  };

  return {
    login: loginMutation.mutate,
    signup: signupMutation.mutate,
    logout,
    isLoggedIn,
  };
};
