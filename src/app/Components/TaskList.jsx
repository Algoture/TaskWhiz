"use client";

import { useState, useEffect } from "react";
import { getTasks, deleteTask } from "@/app/lib/actions";
import TaskForm from "./TaskForm";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      const data = await getTasks();
      setTasks(data);
    }
    fetchTasks();
  }, []);

  const handleTaskAdded = (updatedTasks) => {
    setTasks(updatedTasks);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id)); // Update UI
  };

  return (
    <div className="space-y-4">
      <TaskForm onTaskAdded={handleTaskAdded} />
      {tasks.map((task) => (
        <div
          key={task._id}
          className="p-4 border rounded-lg shadow flex justify-between items-center">
          <div>
            <h2
              className={`text-lg font-semibold ${
                task.completed ? "line-through" : ""
              }`}>
              {task.title}
            </h2>
            <p className="text-gray-600">{task.description}</p>
            <p className="text-sm text-gray-500">
              Due: {new Date(task.dueDate).toDateString()}
            </p>
          </div>
          <button
            onClick={() => handleDelete(task._id)}
            className="px-2 py-1 bg-red-500 text-white rounded">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
