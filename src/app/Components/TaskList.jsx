"use client";

import { useState, useEffect } from "react";
import { getTasks, deleteTask, updateTask } from "@/app/lib/actions";
import TaskForm from "./TaskForm";
import { toast } from "sonner";
import TaskEditDialog from "./TaskEditDialog";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    async function fetchTasks() {
      const data = await getTasks();
      setTasks(data);
    }
    fetchTasks();
  }, []);

  const handleTaskAdded = (updatedTasks) => {
    setTasks(updatedTasks);
    toast.success("Task added successfully");
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const handleToggleComplete = async (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    try {
      await updateTask(task._id, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t._id === task._id ? updatedTask : t))
      );
      toast.success("Task updated successfully");
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleSaveEdit = async (editValues) => {
    try {
      await updateTask(editingTask._id, { ...editingTask, ...editValues });
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t._id === editingTask._id ? { ...t, ...editValues } : t
        )
      );
      setEditingTask(null);
      toast.success("Task updated successfully");
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <TaskForm onTaskAdded={handleTaskAdded} />
      {tasks && tasks.length ? (
        tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onDelete={handleDelete}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEdit}
          />
        ))
      ) : (
        <p className="text-center">No tasks found</p>
      )}

      {editingTask && (
        <TaskEditDialog
          editingTask={editingTask}
          onSave={handleSaveEdit}
          onCancel={() => setEditingTask(null)}
        />
      )}
    </div>
  );
}
