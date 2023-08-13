// Importing the CategoryCard component
import CategoryCard from "./CategoryCard";

// A static array containing data about different video categories
const categoriesData = [
  {
    video: "video/action.mp4",
    thumbnail: "thumbnails/action.png",
    title: "Action",
  },
  {
    video: "video/comedy.mp4",
    thumbnail: "thumbnails/comedy.png",
    title: "Comedy",
  },
  {
    video: "video/drama.mp4",
    thumbnail: "thumbnails/drama.png",
    title: "Drama",
  },
  {
    video: "video/scifi.mp4",
    thumbnail: "thumbnails/scifi.png",
    title: "scifi",
  },
];

// Define the Categories component
const Categories = () => {
  return (
    // The fragment (<></>) is a shorthand for React.Fragment, allowing multiple elements without adding extra nodes to the DOM.
    <>
      <div className="category-container d-flex flex-wrap gap-2 justify-content-center">
        {/* 
          Mapping over the categoriesData array to render each category. 
          For each category, a CategoryCard component is rendered.
        */}
        {categoriesData.map((category, index) => (
          <div
            // Styling and positioning the container for each category image
            className="category-image-container position-relative"
            
            // Using index as a key is not always recommended in dynamic lists, 
            // but is okay in this static context where the list doesn't change.
            key={index}
          >
            {/* Passing the current category data as a prop to the CategoryCard component */}
            <CategoryCard category={category} />
          </div>
        ))}
      </div>
    </>
  );
};

// Export the component for use in other parts of the app
export default Categories;
