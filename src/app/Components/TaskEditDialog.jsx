"use client";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useState } from "react";
import { Calendar } from "lucide-react";

export default function TaskEditDialog({ editingTask, onSave, onCancel }) {
  const [editValues, setEditValues] = useState({
    title: editingTask?.title || "",
    description: editingTask?.description || "",
    dueDate: editingTask?.dueDate ? editingTask.dueDate.split("T")[0] : "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(editValues);
  };

  return (
    <Dialog open={!!editingTask} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input
            type="text"
            name="title"
            value={editValues.title}
            onChange={handleInputChange}
            placeholder="Title"
          />
          <Textarea
            name="description"
            value={editValues.description}
            onChange={handleInputChange}
            placeholder="Description"
          />

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal">
                <Calendar className="mr-2 h-4 w-4" />
                {editValues.dueDate ? (
                  format(new Date(editValues.dueDate), "PPP")
                ) : (
                  <span>Pick a due date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={
                  editValues.dueDate ? new Date(editValues.dueDate) : null
                }
                onSelect={(selectedDate) =>
                  setEditValues((prev) => ({
                    ...prev,
                    dueDate: selectedDate
                      ? selectedDate.getFullYear() +
                        "-" +
                        String(selectedDate.getMonth() + 1).padStart(2, "0") +
                        "-" +
                        String(selectedDate.getDate()).padStart(2, "0")
                      : "",
                  }))
                }
              />
            </PopoverContent>
          </Popover>
        </div>
        <DialogFooter>
          <Button onClick={handleSave} className="text-white">
            Update Task
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
