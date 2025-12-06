import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({
  tasks,
  categories,
  handleDelete,
  handleToggleComplete,
  handleUpdate,
  loading
}) => {
  if (loading) return <p>Loading...</p>;
  if (!tasks || tasks.length === 0) return <p>No tasks found.</p>;

  return (
    <div className="grid gap-3">
      {tasks.map(task => (
        <TaskItem
          key={task._id}
          task={task}
          onDelete={() => handleDelete(task._id)}
          onToggleComplete={() => handleToggleComplete(task)}
          onUpdate={(updates) => handleUpdate(task._id, updates)}
          categories={categories}
        />
      ))}
    </div>
  );
};

export default TaskList;
