import React from "react";

const TaskForm = ({ form, setForm, categories, onCreate }) => {
  return (
    <div className="card bg-base-200 p-4 mb-6">
      <form onSubmit={onCreate} className="flex flex-col gap-3">

        <input
          className="input"
          placeholder="Title"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="textarea"
          placeholder="Description"
          required
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <select
          className="select"
          value={form.categoryId}
          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
        >
          <option value="">-- Select category (optional) --</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>

        <div className="flex gap-2">

          <select
            className="select"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <input
            className="input"
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.reminder}
              onChange={(e) => setForm({ ...form, reminder: e.target.checked })}
            />
            <span>Reminder</span>
          </label>
        </div>

        <button className="btn btn-primary" type="submit">
          Create Task
        </button>

      </form>
    </div>
  );
};

export default TaskForm;
