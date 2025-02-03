"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar, Loader2 } from "lucide-react";
import { addTask, getTasks } from "@/app/lib/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

export default function TaskForm({ onTaskAdded }) {
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState({ title: "", description: "", dueDate: "" });
  const [date, setDate] = useState(null);

  const handleInputChange = (field, value) => {
    setTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateSelect = (selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
      handleInputChange("dueDate", selectedDate.toLocaleDateString("en-CA"));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", task.title);
    formData.append("description", task.description);
    formData.append("dueDate", task.dueDate);
    await addTask(formData);
    onTaskAdded(await getTasks());
    setTask({ title: "", description: "", dueDate: "" });
    setDate(null);
    setLoading(false);
  };

  return (
    <Card className="p-4 space-y-3 max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="text"
          placeholder="Title"
          value={task.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          required
        />
        <Textarea
          placeholder="Description"
          value={task.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-full justify-start text-left font-normal ${
                !date && "text-muted-foreground"
              }`}>
              <Calendar className="mr-2" />
              {date ? format(date, "PPP") : <span>Pick a due date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
            />
          </PopoverContent>
        </Popover>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : "Add Task"}
        </Button>
      </form>
    </Card>
  );
}
