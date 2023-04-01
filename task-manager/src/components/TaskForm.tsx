import React, { ChangeEventHandler, FormEventHandler, useState } from "react";

export default function TaskForm({
  task,
  handleFormSubmit,
  closeForm,
}: TaskFormProps) {
  const [title, setTitle] = useState<string>(task?.title || "");
  const [description, setDescription] = useState<string>(
    task?.description || ""
  );

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setTitle(e.target.value);

  const handleDescriptionChange: ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => setDescription(e.target.value);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!title) return;
    if (task)
      handleFormSubmit({ updatedTask: { ...task, title, description } });
    else
      handleFormSubmit({ newTask: { completed: false, description, title } });
  };

  const handleCancel = () => {
    closeForm();
  };

  return (
    <form className={"flex flex-col"} onSubmit={handleSubmit}>
      <div className={"flex flex-col mb-2"}>
        <input
          type={"text"}
          className={"mb-2"}
          value={title}
          onChange={handleTitleChange}
          placeholder="Title"
        />
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Description"
        />
      </div>
      <div className={"flex justify-between mx-auto w-48"}>
        <button
          className="bg-gray-500 px-4 py-1 text-white rounded-sm drop-shadow-md self-center"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button className="bg-green-500 px-4 py-1 text-white rounded-sm drop-shadow-md self-center">
          {task ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
}
