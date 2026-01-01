# 🧠 Todo AI – Smart Task Manager

A full-stack **To-Do List Web App** with **AI-powered task suggestions** based on user behavior.  
Includes JWT authentication, task CRUD, subtasks, reminders, and a Kanban-style dashboard.

This repo contains the **Frontend (React + Vite)**.

---

## 🚀 Live Demo

Frontend: https://your-frontend.vercel.app  
Backend API: [https://your-backend.onrender.com](https://ai-powered-to-do-app-backend-api-node-js.onrender.com)  

> ⚠️ Replace your URLs after deployment

---

## 🎨 Features

### 👤 Authentication
- Signup / Login / Logout
- Token stored in LocalStorage
- Automatic redirect on expired token

### 📝 Task System
- Add tasks (title, description, reminder)
- View tasks in: **To-Start**, **In-Progress**, **Completed**
- Add subtasks (user or AI suggested)
- Toggle subtask progress
- Complete All / Delete All operations

### 🤖 AI Suggestions
- When creating a task → AI suggests subtasks
- Example:
  - Added *Workout* → Suggests *Post-Workout Stretch*
  - Added *Study* → Suggests *Review Notes*

---

## 🧰 Tech Stack

**Frontend**
- React.js (Vite)
- TailwindCSS
- React Router DOM

**Backend**
- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT Auth
- AI (Gemini / Groq / Custom)

---

## 📂 Folder Structure
frontend/ \
      ├── src/ \
      │   ├── Pages/ \
      │   │   ├── Dashboard.jsx \
      │   │   ├── Login.jsx  \
      │   │   ├── Signup.jsx  \
      │
      │   ├── Components/  \
      │   │   ├── Column.jsx  \
      │   │   ├── Modal.jsx  \
      │
      ├── public/  \
      ├── vite.config.js  \
      ├── package.json  \
      ├── .env

