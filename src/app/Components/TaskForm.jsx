"use client";

import { useState } from "react";
import { addTask, getTasks } from "@/app/lib/actions";

export default function TaskForm({ onTaskAdded }) {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", newTask.title);
    formData.append("description", newTask.description);
    formData.append("dueDate", newTask.dueDate);
    await addTask(formData);
    const updatedTasks = await getTasks();
    onTaskAdded(updatedTasks);
    setNewTask({ title: "", description: "", dueDate: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 space-y-3 max-w-lg mx-auto bg-white shadow-md rounded-xl border border-gray-200">
      <input
        type="text"
        placeholder="Title"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />
      <textarea
        placeholder="Description"
        value={newTask.description}
        onChange={(e) =>
          setNewTask({ ...newTask, description: e.target.value })
        }
        className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <input
        type="date"
        value={newTask.dueDate}
        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        Add Task
      </button>
    </form>
  );
}
