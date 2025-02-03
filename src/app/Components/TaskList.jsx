"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Trash2 } from "lucide-react";
import { getTasks, deleteTask, updateTask } from "@/app/lib/actions";
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
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
  };

  const handleToggleComplete = async (task) => {
    const updatedTask = { ...task, completed: !task.completed };

    await updateTask(task._id, {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      completed: updatedTask.completed,
    });

    setTasks((prevTasks) =>
      prevTasks.map((t) => (t._id === task._id ? updatedTask : t))
    );
  };

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <TaskForm onTaskAdded={handleTaskAdded} />
      {tasks.map((task) => (
        <div
          key={task._id}
          className="p-4 flex justify-between items-center border border-gray-200 rounded-lg shadow-md bg-white">
          <div className="flex items-center space-x-3">
            <CheckCircle
              className={`w-6 h-6 cursor-pointer transition-all ${
                task.completed ? "text-green-500" : "text-gray-400"
              }`}
              onClick={() => handleToggleComplete(task)}
            />
            <div>
              <h2
                className={`text-lg font-semibold ${
                  task.completed
                    ? "line-through text-gray-400"
                    : "text-gray-900"
                }`}>
                {task.title}
              </h2>
              {task.description && (
                <p className="text-gray-600 text-sm">{task.description}</p>
              )}
              <p className="text-xs text-gray-500">
                Due: {new Date(task.dueDate).toDateString()}
              </p>
            </div>
          </div>
          <Trash2
            className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-600 transition"
            onClick={() => handleDelete(task._id)}
          />
        </div>
      ))}
    </div>
  );
}
