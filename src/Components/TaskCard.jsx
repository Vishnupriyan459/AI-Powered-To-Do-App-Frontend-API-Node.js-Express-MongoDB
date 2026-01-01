import { useState } from "react";

export default function TaskCard({ task, onComplete, onDelete, onToggleSubtask }) {
  const [showAll, setShowAll] = useState(false);

  const total = task.subtasks.length;
  const done = task.subtasks.filter(s => s.completed).length;

  const visibleSubtasks = showAll ? task.subtasks : task.subtasks.slice(0, 5);

  return (
    <div className="rounded-lg border bg-white shadow-sm p-4 relative">

      {/* TITLE + COMPLETE */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">{task.title}</h3>

        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onComplete(task)}
          className="w-4 h-4 cursor-pointer"
        />
      </div>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{task.description}</p>

      {/* Subtask Progress */}
      {total > 0 && (
        <p className="text-xs text-gray-500 mt-2">
          {done} / {total} subtasks done
        </p>
      )}

      {/* Reminder */}
      <p className="text-xs mt-2 text-gray-400">
        {task.reminder ? new Date(task.reminder).toLocaleDateString() : ""}
      </p>

      {/* SUBTASK CHECKBOX LIST */}
      {total > 0 && (
        <div className="mt-3 text-sm border-t pt-3">
          {visibleSubtasks.map((s, index) => (
            <label
              key={s._id}
              className="flex items-center gap-2 mb-1 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={!!s.completed}
                onChange={() => onToggleSubtask(task._id, index, s.text)}
              />
              <span className={s.completed ? "line-through text-gray-400" : ""}>
                {s.text}
              </span>
            </label>
          ))}

          {/* "+ More" toggle only when > 5 */}
          {task.subtasks.length > 5 && (
            <button
              className="text-blue-600 text-xs mt-1"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less ▲" : `+ ${task.subtasks.length - 5} More`}
            </button>
          )}
        </div>
      )}

      {/* ACTIONS */}
      <div className="flex justify-between mt-4">
        {!task.completed && (
          <button
            onClick={() => onComplete(task)}
            className="text-green-600 hover:text-green-700 text-sm"
          >
            ✔ Complete
          </button>
        )}

        <button
          onClick={() => onDelete(task)}
          className="text-red-600 hover:text-red-700 text-sm"
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}
