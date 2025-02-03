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
      className="p-4  rounded-lg shadow space-y-2">
      <input
        type="text"
        placeholder="Title"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        className="border p-2 rounded w-full"
        required
      />
      <textarea
        placeholder="Description"
        value={newTask.description}
        onChange={(e) =>
          setNewTask({ ...newTask, description: e.target.value })
        }
        className="border p-2 rounded w-full"
      />
      <input
        type="date"
        value={newTask.dueDate}
        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        className="border p-2 rounded w-full"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded">
        Add Task
      </button>
    </form>
  );
}
