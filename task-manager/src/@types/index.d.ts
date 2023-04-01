interface NewTask {
  title: string;
  description: string;
  completed: boolean;
}

interface Task extends NewTask {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

type TaskFormHandler = (args: {
  newTask?: NewTask;
  updatedTask?: Task;
}) => void;

interface TaskFormProps {
  task?: Task;
  handleFormSubmit: TaskFormHandler;
  closeForm: () => void;
}

type TaskHandler = (t: Task) => void;

interface BaseTaskProps {
  handleEditTask: TaskHandler;
  handleDeleteTask: TaskHandler;
  handleCompleteTask: TaskHandler;
}

interface TaskListProps extends BaseTaskProps {
  tasks: Task[];
}
interface TaskProps extends BaseTaskProps {
  task: Task;
}
