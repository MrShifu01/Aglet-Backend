import FavouriteMovies from "../components/FavouriteMovies";
import Header from "../components/Header";

const FavouritesPage = () => {
  return (
    // A flex container to center its children both horizontally and vertically
    <div className="d-flex justify-content-center align-items-center vh-100">
      {/* Main container for the favourites page content */}
      <div className="main-container w-custom-90 h-custom-90 bg-dark rounded-3 overflow-hidden overflow-y-auto">
        <div className="favourites-bg">
          {/* The header component for the page */}
          <Header className="position-relative" />
          
          {/* Container for the list of favourite movies */}
          <div className="favourites-content">
            {/* Component displaying the user's favourite movies */}
            <FavouriteMovies />
          </div>
        </div>
      </div>
    </div>
  );
};

// Exporting the FavouritesPage component for use in other parts of the app
export default FavouritesPage;
