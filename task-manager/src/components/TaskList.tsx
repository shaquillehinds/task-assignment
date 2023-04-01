import React from "react";
import Task from "./Task";

export default function TaskList({
  tasks,
  handleCompleteTask,
  handleDeleteTask,
  handleEditTask,
}: TaskListProps) {
  return (
    <ul className={"mt-4"}>
      {tasks.map((task) => (
        <Task
          key={task._id}
          task={task}
          handleCompleteTask={handleCompleteTask}
          handleDeleteTask={handleDeleteTask}
          handleEditTask={handleEditTask}
        />
      ))}
    </ul>
  );
}
