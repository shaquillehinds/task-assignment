import React from "react";

export default function Task({
  task,
  handleCompleteTask,
  handleDeleteTask,
  handleEditTask,
}: TaskProps) {
  const editTask = () => handleEditTask(task);
  const deleteTask = () => handleDeleteTask(task);
  const completeTask = () => handleCompleteTask(task);

  return (
    <li className={"flex w-full justify-between py-2 border-b-2"}>
      <div className="flex">
        <input
          onChange={completeTask}
          type="checkbox"
          className="mr-4"
          checked={task.completed}
        />
        <h2 className={task.completed ? "line-through text-gray-300" : ""}>
          {task.title}
        </h2>
      </div>
      <div>
        <i
          onClick={editTask}
          className="fa-regular fa-pen-to-square text-purple-600 font-lg text-xl"
        ></i>
        <i
          onClick={deleteTask}
          className="fa-solid fa-trash ml-4 text-red-400 text-xl"
        ></i>
      </div>
    </li>
  );
}
