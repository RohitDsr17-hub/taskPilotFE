import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

import TaskForm from "./TaskForm";
import TaskFilters from "./TaskFilters";
import CategorySidebar from "../CategorySidebar";
import TaskList from "./TaskList";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    categoryId: "",
    priority: "low",
    dueDate: "",
    reminder: false,
  });

  // Fetch tasks
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(BASE_URL + "/fetchTasks", { withCredentials: true });
      setTasks(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    const res = await axios.get(BASE_URL + "/fetchCategory", { withCredentials: true });
    setCategories(res.data || []);
  };

  useEffect(() => {
    fetchTasks();
    fetchCategories();
  }, []);

  // Create task
  const handleCreate = async (e) => {
    e.preventDefault();

    const payload = {
      title: form.title,
      description: form.description,
      priority: form.priority,
      dueDate: form.dueDate ? new Date(form.dueDate) : null,
      reminder: form.reminder,
      status: "todo",
    };

    if (form.categoryId && form.categoryId.trim() !== "") {
      payload.categoryId = form.categoryId;
    }

    const res = await axios.post(BASE_URL + "/createtask", payload, { withCredentials: true });

    setTasks(prev => [res.data.data, ...prev]);

    setForm({
      title: "",
      description: "",
      categoryId: "",
      priority: "low",
      dueDate: "",
      reminder: false,
    });
  };

  // Delete task
  const handleDelete = async (id) => {
    await axios.delete(BASE_URL + `/fetchTasks/${id}`, { withCredentials: true });
    setTasks(prev => prev.filter(t => t._id !== id));
  };

  // Toggle complete (backward compatibility)
  const handleToggleComplete = async (task) => {
    const newStatus = task.status === "completed" ? "todo" : "completed";

    const res = await axios.put(
      BASE_URL + `/fetchTasks/${task._id}`,
      { status: newStatus },
      { withCredentials: true }
    );

    setTasks(prev => prev.map(t => (t._id === res.data.data._id ? res.data.data : t)));
  };

  // Update task
  const handleUpdate = async (id, updates) => {
    if (updates.categoryId === "") delete updates.categoryId;

    const res = await axios.put(BASE_URL + `/fetchTasks/${id}`, updates, { withCredentials: true });

    setTasks(prev => prev.map(t => (t._id === res.data.data._id ? res.data.data : t)));
  };

  // 🔍 FILTERS
  const filteredTasks = tasks
    .filter(t => selectedCategory === "all" || t.categoryId === selectedCategory)
    .filter(t =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(t => priorityFilter === "all" || t.priority === priorityFilter);

  // KANBAN SPLIT
  const todoTasks = filteredTasks.filter(t => t.status === "todo");
  const inProgressTasks = filteredTasks.filter(t => t.status === "in-progress");
  const completedTasks = filteredTasks.filter(t => t.status === "completed");

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Tasks</h1>

      <TaskForm form={form} setForm={setForm} categories={categories} onCreate={handleCreate} />

      <TaskFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="flex gap-6">

        <CategorySidebar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* ---- KANBAN BOARD ---- */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* TODO */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Todo</h2>
              <TaskList
                tasks={todoTasks}
                loading={loading}
                categories={categories}
                handleDelete={handleDelete}
                handleToggleComplete={handleToggleComplete}
                handleUpdate={handleUpdate}
              />
            </div>

            {/* IN PROGRESS */}
            <div>
              <h2 className="text-xl font-semibold mb-3">In Progress</h2>
              <TaskList
                tasks={inProgressTasks}
                loading={loading}
                categories={categories}
                handleDelete={handleDelete}
                handleToggleComplete={handleToggleComplete}
                handleUpdate={handleUpdate}
              />
            </div>

            {/* COMPLETED */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Completed</h2>
              <TaskList
                tasks={completedTasks}
                loading={loading}
                categories={categories}
                handleDelete={handleDelete}
                handleToggleComplete={handleToggleComplete}
                handleUpdate={handleUpdate}
              />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default TasksPage;
