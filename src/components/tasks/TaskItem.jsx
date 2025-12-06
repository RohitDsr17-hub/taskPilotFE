import React, { useState } from "react";
import { format } from "date-fns";

const TaskItem = ({ task, onDelete, onToggleComplete, onUpdate, categories = [] }) => {
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate ? new Date(task.dueDate).toISOString().substr(0, 10) : "",
    categoryId: task.categoryId || "",
    reminder: !!task.reminder,
    status: task.status || "todo",
  });

  const submitEdit = (e) => {
    e.preventDefault();

    const payload = {
      title: form.title,
      description: form.description,
      priority: form.priority,
      reminder: form.reminder,
      status: form.status,
      categoryId: form.categoryId,
      dueDate: form.dueDate || null,
    };

    onUpdate(payload);
    setEditing(false);
  };

  return (
    <div className="card p-4 shadow-md">

      {!editing ? (
        <div className="flex justify-between items-start">

          <div>
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p className="text-sm">{task.description}</p>

            <div className="text-xs mt-2 flex gap-2 flex-wrap">
              <span className="badge">{task.priority}</span>
              {task.dueDate && <span>Due: {format(new Date(task.dueDate), "yyyy-MM-dd")}</span>}
              {task.categoryId && (
                <span>
                  Category: {(categories.find(c => c._id === task.categoryId) || {}).name}
                </span>
              )}
              <span>Status: {task.status}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-2">
              <button className="btn btn-sm" onClick={onToggleComplete}>
                {task.status === "completed" ? "Undo" : "Complete"}
              </button>
              <button className="btn btn-sm" onClick={() => setEditing(true)}>Edit</button>
              <button className="btn btn-sm btn-error" onClick={onDelete}>Delete</button>
            </div>

            <small className="text-xs opacity-60">
              {task.createdAt ? new Date(task.createdAt).toLocaleString() : ""}
            </small>
          </div>

        </div>
      ) : (
        <form onSubmit={submitEdit} className="flex flex-col gap-2">

          <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />

          <textarea className="textarea" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />

          <div className="flex gap-2 flex-wrap">

            <select className="select" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <input className="input" type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />

            <select className="select" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
              <option value="">No category</option>
              {categories.map(c => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* NEW: Status Selector */}
            <select className="select" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.reminder}
                onChange={(e) => setForm({ ...form, reminder: e.target.checked })}
              />
              Reminder
            </label>

          </div>

          <div className="flex gap-2">
            <button className="btn btn-primary btn-sm" type="submit">Save</button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setEditing(false)}>Cancel</button>
          </div>

        </form>
      )}

    </div>
  );
};

export default TaskItem;
