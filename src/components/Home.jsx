import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const t = await axios.get(BASE_URL + "/fetchTasks", { withCredentials: true });
      const c = await axios.get(BASE_URL + "/fetchCategory", { withCredentials: true });

      setTasks(t.data || []);
      setCategories(c.data || []);
    } catch (err) {
      console.error("Dashboard error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <span className="loading loading-lg"></span>
      </div>
    );
  }

  const completed = tasks.filter(t => t.isCompleted).length;
  const pending = tasks.filter(t => !t.isCompleted).length;
  const dueToday = tasks.filter(t => {
    if (!t.dueDate) return false;
    const today = new Date().toISOString().slice(0, 10);
    return t.dueDate.slice(0, 10) === today;
  }).length;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to TaskPilot 🎉</h1>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="card bg-base-200 p-4">
          <h2 className="text-lg font-semibold">Total Tasks</h2>
          <p className="text-3xl font-bold">{tasks.length}</p>
        </div>

        <div className="card bg-base-200 p-4">
          <h2 className="text-lg font-semibold">Completed</h2>
          <p className="text-3xl font-bold text-green-500">{completed}</p>
        </div>

        <div className="card bg-base-200 p-4">
          <h2 className="text-lg font-semibold">Pending</h2>
          <p className="text-3xl font-bold text-yellow-500">{pending}</p>
        </div>

        <div className="card bg-base-200 p-4">
          <h2 className="text-lg font-semibold">Due Today</h2>
          <p className="text-3xl font-bold text-red-500">{dueToday}</p>
        </div>
      </div>

      <div className="card bg-base-300 p-6">
        <h2 className="text-xl font-semibold mb-3">Categories</h2>
        <p className="text-2xl font-bold">{categories.length}</p>
      </div>

      <div className="mt-8 flex gap-4">
        <a href="/tasks" className="btn btn-primary">View Tasks</a>
        <a href="/categories" className="btn">Manage Categories</a>
      </div>
    </div>
  );
};

export default Home;
