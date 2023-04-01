import { useEffect, useState } from "react";
import axios from "axios";

const url = "http://localhost:4000";

export default function tasksController() {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task>();

  useEffect(() => {
    // Load all tasks from database
    (async () => {
      try {
        const t = await axios.get(`${url}/tasks`);
        if (t && t.data) setTasks(t.data);
      } catch (error) {
        console.error(error);
        alert("Sorry, unable to load tasks");
      }
    })();
  }, []);

  const handleNewTask = () => setShowTaskForm(true);

  const closeForm = () => {
    setSelectedTask(undefined);
    setShowTaskForm(false);
  };

  const handleEditTask = (t: Task) => {
    setShowTaskForm(true);
    setSelectedTask(t);
  };

  const handleDeleteTask = async (t: Task) => {
    try {
      await axios.delete(`${url}/tasks/${t._id}`);
      setTasks(tasks.filter((task) => task._id !== t._id));
    } catch (error) {
      alert("An unexpected error occurred while deleting this task.");
      console.error(error);
    }
  };

  const handleCompleteTask = async (t: Task) => {
    try {
      await axios.patch(`${url}/tasks/${t._id}/complete`, {
        completed: !t.completed,
      });
      setTasks(
        tasks.map((task) =>
          task._id === t._id ? { ...t, completed: !t.completed } : task
        )
      );
    } catch (error) {
      alert("An unexpected error occurred while updating this task.");
      console.error(error);
    }
  };

  const handleFormSubmit: TaskFormHandler = async ({
    newTask,
    updatedTask,
  }) => {
    try {
      if (newTask) {
        const response = await axios.post(`${url}/tasks`, newTask);
        const task = response.data;
        setTasks((prev) => [...prev, task]);
      } else if (updatedTask) {
        await axios.put(`${url}/tasks/${updatedTask._id}`, {
          title: updatedTask.title,
          description: updatedTask.description,
        });
        setTasks((prev) =>
          prev.map((task) =>
            task._id !== updatedTask._id ? task : updatedTask
          )
        );
      }
      setShowTaskForm(false);
      setSelectedTask(undefined);
    } catch (error) {
      alert("An unexpected error occured saving this task.");
      console.error(error);
    }
  };

  return {
    tasks,
    showTaskForm,
    selectedTask,
    handleCompleteTask,
    handleFormSubmit,
    handleDeleteTask,
    handleEditTask,
    handleNewTask,
    closeForm,
  };
}
