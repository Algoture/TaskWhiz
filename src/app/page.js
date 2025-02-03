import TaskList from "./Components/TaskList";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">Task Manager</h1>
      <TaskList />
    </div>
  );
}
