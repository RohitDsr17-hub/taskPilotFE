import React from "react";

const TaskFilters = ({
  searchQuery,
  setSearchQuery,
  priorityFilter,
  setPriorityFilter,
  setSelectedCategory
}) => {
  return (
    <div className="flex gap-3 mb-4">

      <input
        className="input w-1/3"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <select
        className="select"
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value)}
      >
        <option value="all">All Priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      <button
        className="btn"
        onClick={() => {
          setSearchQuery("");
          setPriorityFilter("all");
          setSelectedCategory("all");
        }}
      >
        Clear Filters
      </button>

    </div>
  );
};

export default TaskFilters;
