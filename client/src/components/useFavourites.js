import { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

const userId = JSON.parse(localStorage.getItem("userData"))._id;

const useFavourites = () => {
  const queryClient = useQueryClient();

  const userData = JSON.parse(localStorage.getItem("userData"));
  const initialUserFavourites = userData?.favourites || [];

  const [userFavourites, setUserFavourites] = useState(initialUserFavourites);

  const addToFavouritesMutation = useMutation(
    (movieId) => axios.post(`/api/users/${userId}/add`, { movieId }),
    {
      onSuccess: (data, movieId) => {
        // Update the local data after mutation
        updateLocalDataAfterFavouriteToggle(movieId, true);
        toast.success("Added to favourites!", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2000,
        });
      },
      onError: (error) => {
        console.error("Failed to add to favourites:", error);
        toast.error("Failed to add to favourites", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2000,
        });
      },
    }
  );

  const removeFromFavouritesMutation = useMutation(
    (movieId) => axios.post(`/api/users/${userId}/remove`, { movieId }),
    {
      onSuccess: (data, movieId) => {
        // Update the local data after mutation
        updateLocalDataAfterFavouriteToggle(movieId, false);
        toast.success("Removed from favourites!", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2000,
        });
      },
      onError: (error) => {
        console.error("Failed to remove from favourites:", error);
        toast.error("Failed to remove from favourites", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2000,
        });
      },
    }
  );

  const updateLocalDataAfterFavouriteToggle = (movieId, isFavourite) => {
    // Update the local data after mutation
    queryClient.setQueryData(["movies"], (oldData) => {
        const newData = { ...oldData };

        // Determine if the data is structured with pages or as a flat array
        let pagesArray = [];
        if (newData.pages) {
            pagesArray = newData.pages; // If it's the typical react-query structure
        } else if (Array.isArray(newData)) {
            pagesArray = newData.flat(); // Flatten the array of arrays into a single array
        }

        // Update the movie's isFavourite status
        for (let page of pagesArray) {
            const movieToUpdate = page.movies.find(
                (movie) => movie._id === movieId
            );
            if (movieToUpdate) {
                movieToUpdate.isFavourite = isFavourite;
                break; // break out of loop since we found the movie
            }
        }

        return newData;
    });

    // Update local state using the callback method
    setUserFavourites(prevFavourites => {
        if (isFavourite) {
            return [...prevFavourites, movieId];
        } else {
            return prevFavourites.filter(id => id !== movieId);
        }
    });

    // Update local storage
    const userData = JSON.parse(localStorage.getItem("userData"));
    userData.favourites = isFavourite 
        ? [...userFavourites, movieId]
        : userFavourites.filter(id => id !== movieId);
    localStorage.setItem("userData", JSON.stringify(userData));
};


const toggleFavourite = async (movieId, isFavourite, refetch) => {
  try {
      if (isFavourite) {
          await removeFromFavouritesMutation.mutateAsync(movieId);
      } else {
          await addToFavouritesMutation.mutateAsync(movieId);
      }
      refetch({ throwOnError: true }); // Add this line here
  } catch (error) {
      console.error("Failed to update favourite:", error);
  }
};


  return {
    userFavourites,
    toggleFavourite,
  };
};

export default useFavourites;
