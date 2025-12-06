import React from "react";

const CategorySidebar = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="w-60 bg-base-200 p-4 rounded-xl h-fit">

      <h2 className="text-lg font-semibold mb-3">Categories</h2>

      <ul className="flex flex-col gap-2">

        <li
          className={`cursor-pointer p-2 rounded ${
            selectedCategory === "all" ? "bg-primary text-white" : "hover:bg-base-300"
          }`}
          onClick={() => setSelectedCategory("all")}
        >
          All Tasks
        </li>

        {categories.map(c => (
          <li
            key={c._id}
            className={`cursor-pointer p-2 rounded ${
              selectedCategory === c._id ? "bg-primary text-white" : "hover:bg-base-300"
            }`}
            onClick={() => setSelectedCategory(c._id)}
          >
            {c.name}
          </li>
        ))}

      </ul>
    </div>
  );
};

export default CategorySidebar;
