# TaskWiz

## Overview

This is a simple **Task Management Application** built using **Next.js** with **Server Actions** and **MongoDB**. It allows users to:

✅ **Create** tasks\
✅ **View** a list of tasks\
✅ **Edit** tasks\
✅ **Delete** tasks\
✅ **Mark tasks as complete/incomplete**

## Features

- **Next.js 14** with App Router
- **Server Actions** for database operations
- **MongoDB** for persistent data storage
- **Tailwind CSS** for styling
- **Dynamic state updates** without page refresh
- **Error handling & loading states**

---

## 🛠️ Installation & Setup

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/Algoture/TaskWhiz.git
cd TaskWhiz
```

### **2️⃣ Install Dependencies**

```sh
npm install 
```

### **3️⃣ Set Up Environment Variables**

Create a `.env` file in the project root and add:

```env
MONGODB_URI=your_mongodb_connection_string
```

### **4️⃣ Start the Development Server**

```sh
npm run dev
```

The app will be available at **[http://localhost:3000](http://localhost:3000)**.

---


---

## 🚀 Usage

### **Create a Task**

1. Fill in the **title, description, and due date**.
2. Click **Add Task**.
3. The new task will appear in the list immediately.

### **Mark a Task as Complete**

- Click on the **checkbox** next to the task.

### **Edit a Task**

- Click **Edit**, update the details, and save.

### **Delete a Task**

- Click the **Delete** button to remove the task.

---

## 🔧 Technologies Used

- **Next.js 14** (Server Actions, App Router)
- **MongoDB & Mongoose**
- **Tailwind CSS** (UI Styling)
- **React Hooks** (`useState`, `useEffect`)

---

## 🛠️ Future Improvements

- ✅ Authentication (Login & Register)
- ✅ User-specific task management
- ✅ Drag-and-drop task reordering
- ✅ Task priority levels
