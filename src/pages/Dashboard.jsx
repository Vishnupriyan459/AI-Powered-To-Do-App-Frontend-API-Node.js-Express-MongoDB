import { useEffect, useState } from "react";
import Column from "../Components/Column";
import Modal from "../Components/Modal";
import { useNavigate } from "react-router-dom";

function getTaskStatus(task) {
  const total = task.subtasks.length;
  const done = task.subtasks.filter((s) => s.completed).length;
  if (total === 0 || done === 0) return "todo";
  if (done > 0 && done < total) return "inprogress";
  if (done === total) return "completed";
}
const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem("authToken");
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {})
    }
  });
   // Logout on unauthorized
    if (res.status === 401) {
    localStorage.removeItem("authToken");
    navigate("/login");
    return null;
  }

  const data = await res.json().catch(() => ({}));

  // Show backend messages
  if (!res.ok) {
    if (data?.msg) alert(data.msg);
    return null;
  }
  return data;
};


export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState("details");
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    reminder: "",
    subtasks: [],
  });
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [subtaskInput, setSubtaskInput] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_Backend_API_URL ;

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`${API_URL}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/login");
        return;
      }

      const data = await res.json();
      if (data?.msg === "No token") {
        localStorage.removeItem("authToken");
        navigate("/login");
        return;
      }

      setTasks(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleComplete = async (task) => {
  const result = await authFetch(`${API_URL}/api/tasks/${task._id}/toggle`, {
    method: "PUT",
    body: JSON.stringify({ completed: true })
  });

  if (result) fetchTasks();
};

  const handleDelete = async (task) => {
  await authFetch(`${API_URL}/api/tasks/${task._id}`, {
    method: "DELETE"
  });
  fetchTasks();
};

 const handleToggleSubtask = async (taskId, index, subtaskText) => {
  console.log("Toggle:", subtaskText);
  const result =await authFetch(`${API_URL}/api/tasks/${taskId}/subtasks/${index}/toggle`, {
    method: "PUT"
  });
  if (result) fetchTasks();
};


  const handleCompleteAll = async () => {
  const result =await authFetch(`${API_URL}/api/tasks/complete/all`, {
    method: "PUT"
  });
  if (result) fetchTasks();
};


  const handleDeleteAll = async () => {
  for (const task of tasks) {
    await authFetch(`${API_URL}/api/tasks/${task._id}`, {
      method: "DELETE"
    });
  }
  fetchTasks();
};
const handleOpenModal = (task = null) => {
  setModalOpen(true);
  if (task) {
    // editing existing task
    setCurrentTaskId(task._id);
    setStep("subtasks");
    setNewTask({
      title: task.title,
      description: task.description,
      reminder: task.reminder,
      subtasks: task.subtasks.map(s => ({ text: s.text, selected: !s.completed }))
    });
  } else {
    // creating new task
    setStep("details");
    setNewTask({ title: "", description: "", reminder: "", subtasks: [] });
    setCurrentTaskId(null);
  }
  setSubtaskInput("");
};


  const handleSubmitDetails = async (e) => {
    e.preventDefault();
    setLoadingAI(true);

    const token = localStorage.getItem("authToken");
    const res = await fetch(`${API_URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: newTask.title,
        description: newTask.description,
        reminder: newTask.reminder,
      }),
    });

    const data = await res.json();

    // attach suggestions in selectable form
    const suggestionObjects =
      data.suggestions?.map((t) => ({ text: t, selected: false })) || [];

    setCurrentTaskId(data.task._id);
    setNewTask((prev) => ({ ...prev, subtasks: suggestionObjects }));
    setLoadingAI(false);
    setStep("subtasks");
  };

  const handleAddSubtask = () => {
    if (!subtaskInput.trim()) return;
    setNewTask({
      ...newTask,
      subtasks: [
        ...newTask.subtasks,
        { text: subtaskInput.trim(), selected: true },
      ],
    });
    setSubtaskInput("");
  };

 const handleSubmitSubtasks = async () => {
  const token = localStorage.getItem("authToken");
  const selected = newTask.subtasks
    .filter((s) => s.selected)
    .map((s) => s.text);

  if (selected.length > 0) {
    await fetch(`${API_URL}/api/tasks/${currentTaskId}/subtasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ subtasks: selected }),
    });
  }

  setModalOpen(false);
  fetchTasks();
};


  // FILTER UI SECTION
  let filteredTasks = tasks;
  if (filter === "completed")
    filteredTasks = tasks.filter((t) => t.completed);
  else if (filter === "subcompleted")
    filteredTasks = tasks.filter(
      (t) => t.subtasks.length > 0 && t.subtasks.every((s) => s.completed)
    );
  else if (filter === "uncompleted")
    filteredTasks = tasks.filter((t) => !t.completed);

  const todo = filteredTasks.filter((t) => getTaskStatus(t) === "todo");
  const inprogress = filteredTasks.filter(
    (t) => getTaskStatus(t) === "inprogress"
  );
  const completed = filteredTasks.filter(
    (t) => getTaskStatus(t) === "completed"
  );

  return (
    <div className="min-h-screen bg-gray-50 md:p-6 max-sm:pt-20">
      {/* FILTER & ACTIONS */}
      <div className="max-md:ms-3 mb-4 md:flex gap-4 items-center">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border max-md:p-1 md:p-2 max-md:text-xs rounded"
        >
          <option value="all">All</option>
          <option value="completed">Completed Tasks</option>
          <option value="subcompleted">Subtasks Completed</option>
          <option value="uncompleted">Uncompleted Tasks</option>
        </select>
        <div className="flex gap-2 md:justify-between items-center mt-4 md:mt-0">
        <button
          onClick={handleCompleteAll}
          className="bg-green-500 text-white max-sm:text-[15px] max-md:text-sm px-2 py-1 md:px-4 md:py-2 rounded"
        >
          Read All
        </button>
        <button
          onClick={handleDeleteAll}
          className="bg-red-500 text-white max-sm:text-[15px] max-md:text-sm px-2 py-1 md:px-4 md:py-2 rounded"
        >
          Delete All
        </button>
        <button
          onClick={() => handleOpenModal(null)}
          className="bg-blue-500 text-white max-sm:text-[15px] max-md:text-sm px-2 py-1 md:px-4 md:py-2 rounded"
        >
          + Add New Task
        </button>
        </div>
      </div>

      {/* KANBAN COLUMNS */}
      <div className="flex md:gap-6 max-md:flex-col max-md:items-center max-md:w-screen">
        <Column
          title="To Start"
          tasks={todo}
          color="text-blue-600"
          bgColor="bg-blue-600"
          onComplete={handleComplete}
          onDelete={handleDelete}
          onToggleSubtask={handleToggleSubtask}
          
        />
        <Column
          title="In Progress"
          tasks={inprogress}
          color="text-yellow-500"
          bgColor="bg-yellow-500"
          onComplete={handleComplete}
          onDelete={handleDelete}
          onToggleSubtask={handleToggleSubtask}
      
        />
        <Column
          title="Completed"
          tasks={completed}
          color="text-green-600"
          bgColor="bg-green-600"
          onComplete={handleComplete}
          onDelete={handleDelete}
          onToggleSubtask={handleToggleSubtask}
          
        />
      </div>

      {/* MODAL */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {step === "details" ? (
          <form onSubmit={handleSubmitDetails}>
            <h2 className="max-md:text-lg text-xl mb-4">Add New Task</h2>
            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              className="w-full mb-2 max-md:p-1 md:p-2 border rounded"
              required
            />
            <textarea
              placeholder="Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="w-full mb-2 max-md:p-1 md:p-2 border rounded"
            />
            <input
              type="datetime-local"
              value={newTask.reminder}
              onChange={(e) =>
                setNewTask({ ...newTask, reminder: e.target.value })
              }
              className="w-full mb-2 max-md:p-1 md:p-2 border rounded"
            />

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded max-md:w-full"
            >
              {loadingAI ? "Loading Suggestions..." : "Next: Add Subtasks"}
            </button>
          </form>
        ) : (
          <div>
            <h2 className="text-xl mb-4">AI Suggested Subtasks</h2>

            <ul className="mb-4">
              {newTask.subtasks.map((obj, i) => (
                <li key={i} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={obj.selected}
                    onChange={() => {
                      const updated = [...newTask.subtasks];
                      updated[i].selected = !updated[i].selected;
                      setNewTask({ ...newTask, subtasks: updated });
                    }}
                  />
                  <span>{obj.text}</span>
                </li>
              ))}
            </ul>

            <input
              type="text"
              placeholder="Add your own subtask"
              value={subtaskInput}
              onChange={(e) => setSubtaskInput(e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            />

            <button
              onClick={handleAddSubtask}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              + Add Subtask
            </button>

            <button
              onClick={handleSubmitSubtasks}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              Save Task
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
