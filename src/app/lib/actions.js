"use server";

import connectDB from "../lib/mongodb";
import Task from "../models/Task";

export async function getTasks() {
  await connectDB();
  const tasks = await Task.find({}).lean();

  return tasks.map((task) => ({
    ...task,
    _id: task._id.toString(),
    dueDate: task.dueDate ? task.dueDate.toISOString() : null,
    createdAt: task.createdAt ? task.createdAt.toISOString() : null,
    updatedAt: task.updatedAt ? task.updatedAt.toISOString() : null,
  }));
}

export async function addTask(formData) {
  await connectDB();
  const newTask = new Task({
    title: formData.get("title"),
    description: formData.get("description"),
    dueDate: formData.get("dueDate") ? new Date(formData.get("dueDate")) : null, // Ensure valid date
  });
  await newTask.save();
}

export async function updateTask(id, updatedData) {
  await connectDB();
  await Task.findByIdAndUpdate(id, updatedData, { new: true });
}

export async function deleteTask(id) {
  await connectDB();
  await Task.findByIdAndDelete(id);
}
