"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Loader2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useState } from "react";
import { addTask, getTasks } from "@/app/lib/actions";
import { set } from "mongoose";

export default function TaskForm({ onTaskAdded }) {
  const [loading, setLoading] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const [date, setDate] = useState(
    newTask.dueDate ? new Date(newTask.dueDate) : null
  );

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
    setDate(null);
    setLoading(false);
  };

  return (
    <Card className="p-4 space-y-3 max-w-lg mx-auto shadow-md">
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="text"
          placeholder="Title"
          value={newTask.title}
          className="focus:border-none"
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
        />
        <Textarea
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={`w-full justify-start text-left font-normal ${
                !date && "text-muted-foreground"
              }`}>
              <Calendar className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a due date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={(selectedDate) => {
                setDate(selectedDate);
                setNewTask({
                  ...newTask,
                  dueDate: selectedDate.toISOString().split("T")[0],
                });
              }}
            />
          </PopoverContent>
        </Popover>

        <Button
          type="submit"
          className="w-full"
          onClick={() => setLoading(true)}>
          {loading ? <Loader2 className="h-4 w-4" /> : "Add Task"}
        </Button>
      </form>
    </Card>
  );
}
