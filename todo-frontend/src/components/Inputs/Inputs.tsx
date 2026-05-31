import { useTasks } from "../../hooks/useTasks";
import { useUsers } from "../../hooks/useUsers";
import type { TTaskData } from "../../types/type";
import "./Inputs.scss";
import { useState } from "react";

export const Inputs = () => {
  const { user } = useUsers();

  const { createTask, isPostTaskLoading, isGetTaskError, getTaskError } =
    useTasks(user.id);

  const [addTaskData, setAddTaskData] = useState<TTaskData>({
    title: "",
    description: "",
  });

  const handleAddTask = async (data: TTaskData) => {
    const result = await createTask(data, user.id);

    console.log(result);
  };

  if (isPostTaskLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="inputs">
      <div className="container">
        {user.id !== null && (
          <div className="inputs__inner">
            <div className="inputs__left">
              <input
                type="text"
                id="task-title"
                onChange={(e) =>
                  setAddTaskData({ ...addTaskData, title: e.target.value })
                }
                className="inputs__left-input"
                placeholder="Enter title of your task..."
              />
              <input
                type="text"
                id="task-description"
                onChange={(e) =>
                  setAddTaskData({
                    ...addTaskData,
                    description: e.target.value,
                  })
                }
                className="inputs__left-input"
                placeholder="Enter description of your task..."
              />

              {isGetTaskError && (
                <label htmlFor="task-description">
                  {(getTaskError as any).data.message}
                </label>
              )}
            </div>
            <button
              className="inputs__inner-button"
              onClick={() => handleAddTask(addTaskData)}
            >
              Add Task
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
