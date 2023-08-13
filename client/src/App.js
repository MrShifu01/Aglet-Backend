import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FavouritesPage from './pages/FavouritesPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ContactPage from './pages/ContactPage';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./style.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Initialize the React Query client for managing and synchronizing server state
const queryClient = new QueryClient();

// Setting axios defaults for making requests
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {
  return (
    // Wrap the app with QueryClientProvider to make React Query functions available throughout the component tree
    <QueryClientProvider client={queryClient}>

      {/* Router component to manage navigation and rendering components based on the current URL */}
      <Router>

        {/* Define the app's routes and associated components */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>

      </Router>

      {/* React Query developer tools for debugging */}
      <ReactQueryDevtools />

      {/* ToastContainer component to manage and display toast notifications throughout the app */}
      <ToastContainer />

    </QueryClientProvider>
  );
}

// Export the App component for use in other parts of the app
export default App;
