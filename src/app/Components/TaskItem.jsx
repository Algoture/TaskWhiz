"use client";
import { CircleCheck, Trash, Pencil, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TaskItem({ task, onToggleComplete, onEdit, onDelete }) {
  return (
    <Card className="p-4 flex items-start justify-between rounded-xl bg-white ">
      <div className="flex items-start gap-3 w-full">
        <CircleCheck
          className={`w-7 h-7 cursor-pointer transition-all ${
            task.completed
              ? "text-green-500"
              : "text-gray-400 hover:text-gray-500"
          }`}
          onClick={() => onToggleComplete(task)}
          aria-label="Toggle task completion"
        />

        <div className="flex flex-col flex-1">
          <h2
            className={`text-lg font-semibold transition-all ${
              task.completed ? "line-through text-gray-400" : "text-gray-900"
            }`}>
            {task.title}
          </h2>

          {task.description && (
            <p className="text-gray-600 text-sm">{task.description}</p>
          )}

          {task.dueDate && (
            <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(task.dueDate).toDateString()}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onEdit(task)}
          className="hover:bg-gray-100"
          aria-label="Edit task">
          <Pencil className="w-5 h-5 text-gray-600" />
        </Button>
        <Button
          variant="ghost"
          className="hover:bg-red-100 text-red-500"
          onClick={() => onDelete(task._id)}
          aria-label="Delete task">
          <Trash className="w-5 h-5" />
        </Button>
      </div>
    </Card>
  );
}
