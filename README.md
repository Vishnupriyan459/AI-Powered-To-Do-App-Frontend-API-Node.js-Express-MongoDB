# 🧠 Todo AI – Smart Task Manager (Frontend)

This is the **Frontend** of the Todo-AI smart task management application built using **React (Vite)** and **TailwindCSS**, featuring JWT auth and an AI-powered task suggestion flow.

Users can create accounts, login, add tasks, view progress in a Kanban-style layout, complete or delete tasks, and leverage AI-suggested subtasks.

# 🚀 Live Preview (after deployment)

Frontend (Vercel): *https://ai-powered-to-do-app-frontend-6zqxw1hwo.vercel.app/*  
backend: *https://github.com/Vishnupriyan459/AI-Powered-To-Do-App-Backend-API-Node.js-Express-MongoDB-.git*

---

## 🛠️ Tech Stack

| Technology | Usage |
|-----------|--------|
| **React.js (Vite)** | UI & SPA Routing |
| **TailwindCSS** | Styling |
| **Fetch API** | Communication with backend REST APIs |
| **LocalStorage Auth** | Token-based session handling |
| **React Router DOM** | Routing & Protected Routes |

## Folder Structure:
# frontend/ \
 ├── src/  \
 │   ├── Pages/  \
 │   │   ├── Home.jsx  \
 │   │   ├── Dashboard.jsx  \
 │   │   ├── Login.jsx  \
 │   │   ├── Signup.jsx  \
 │   ├── Components/  \
 │   │   ├── Navbar.jsx  \
 │   │   ├── Column.jsx  \
 │   │   ├── TaskCard.jsx  \
 │   │   ├── Modal.jsx  \
 ├── public/  \
 ├── vite.config.js  \
 ├── package.json  \
 └── .env


## App Features:
- Login & Signup (LocalStorage token)
- Kanban Dashboard (To-Start, In-Progress, Completed)
- AI-based Subtask Suggestions
- Complete/Delete tasks
- Filters (completed, subtasks, uncompleted)


