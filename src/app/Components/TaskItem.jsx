"use client";
import { CircleCheck, Trash, Pencil } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TaskItem({ task, onToggleComplete, onEdit, onDelete }) {
  return (
    <Card className="p-4 flex justify-between items-center border border-muted rounded-lg shadow-md bg-white">
      <div className="flex items-center space-x-3">
        <CircleCheck
          className={`w-6 h-6 cursor-pointer transition-all ${
            task.completed ? "text-green-500" : "text-gray-400"
          }`}
          onClick={() => onToggleComplete(task)}
        />
        <div>
          <h2
            className={`text-lg font-semibold ${
              task.completed ? "line-through text-gray-400" : "text-gray-900"
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
      <div className="flex space-x-2">
        <Button variant="link" onClick={() => onEdit(task)}>
          <Pencil className="w-5 h-5" />
        </Button>
        <Button
          variant="link"
          className="text-red-500 hover:text-red-600"
          onClick={() => onDelete(task._id)}>
          <Trash className="w-5 h-5" />
        </Button>
      </div>
    </Card>
  );
}
