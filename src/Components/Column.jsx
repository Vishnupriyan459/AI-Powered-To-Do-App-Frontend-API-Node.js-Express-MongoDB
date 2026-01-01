import TaskCard from "./TaskCard";

export default function Column({
  title,
  tasks,
  color,
  bgColor,
  onComplete,
  onDelete,
  onToggleSubtask,
  onEdit,   // 👈 added
}) {
  return (
    <div className="w-full md:w-1/3 bg-gray-100 p-2">
      <h2 className={`max-md:text-lg md:text-xl font-semibold mb-4 ${color}`}>
        {title}
      </h2>

      <div className={`space-y-4 `}>
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onComplete={onComplete}
            onDelete={onDelete}
            onToggleSubtask={onToggleSubtask}
            
          />
        ))}
      </div>
    </div>
  );
}
