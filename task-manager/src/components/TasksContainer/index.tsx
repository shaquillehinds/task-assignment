import React from "react";
import TaskForm from "../TaskForm";
import TaskList from "../TaskList";
import tasksController from "./tasksContainer.controller";

export default function Tasks(): JSX.Element {
  const controller = tasksController();

  return (
    <div className="mx-auto bg-white max-w-lg rounded-lg -mt-8 p-4 drop-shadow-2xl flex flex-col">
      {controller.showTaskForm ? (
        <TaskForm
          handleFormSubmit={controller.handleFormSubmit}
          closeForm={controller.closeForm}
          task={controller.selectedTask}
        />
      ) : (
        <>
          <button
            className="bg-green-500 px-4 py-1 text-white rounded-sm drop-shadow-md self-center"
            onClick={controller.handleNewTask}
          >
            New Task
          </button>
          <TaskList
            tasks={controller.tasks}
            handleEditTask={controller.handleEditTask}
            handleDeleteTask={controller.handleDeleteTask}
            handleCompleteTask={controller.handleCompleteTask}
          />
        </>
      )}
    </div>
  );
}
