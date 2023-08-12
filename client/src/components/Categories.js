import React from "react";
import CategoryCard from "./CategoryCard";

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

const Categories = () => {
  return (
    <>
      <div className="category-container d-flex gap-2 justify-content-center">
        {categoriesData.map((category, index) => (
          <div
            className="category-image-container position-relative"
            key={index}
          >
            <CategoryCard category={category} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Categories;
