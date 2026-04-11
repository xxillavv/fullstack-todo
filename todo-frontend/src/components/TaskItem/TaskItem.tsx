import { useContext, type JSX } from "react";
import type { TTask } from "../../types/type";
import doneButton from "../../assets/done-button.svg";
import inProgressButton from "../../assets/in-progress-button.svg";
import taskDelete from "../../assets/tasl-delete.svg";
import { deleteTask, updateTask } from "../../api/api";
import { TaskContext } from "../../Pages/MainPage";
import "./TaskItem.scss";

export const TaskItem = ({ task }: { task: TTask }): JSX.Element => {
  const context = useContext(TaskContext);
  const setTasks = context[1];

  const onClickButtonDelete = async () => {
    try {
      setTasks((prev) => prev.filter((el) => el.id !== task.id));

      await deleteTask(task.id);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const onClickButtonComplete = async () => {
    try {
      setTasks((prev) =>
        prev.map((el) =>
          el.id === task.id ? { ...el, completed: !el.completed } : el,
        ),
      );

      await updateTask(task.id, {
        title: task.title,
        description: task.description,
        completed: !task.completed,
      });
    } catch (error) {
      setTasks((prev) =>
        prev.map((el) =>
          el.id === task.id ? { ...el, completed: el.completed } : el,
        ),
      );

      console.error("Error updating task:", error);
    }
  };

  return (
    <>
      <div className="task__item">
        <div className="task__item-inner">
          <div className="task__item-left">
            <button className="task__checkbox" onClick={onClickButtonComplete}>
              <img
                src={task.completed ? doneButton : inProgressButton}
                alt={task.completed ? "Done" : "In Progress"}
              />
            </button>
            <div className="task__item-info">
              <h3
                className={
                  task.completed
                    ? "task__item-title completed"
                    : "task__item-title"
                }
              >
                {task.title}
              </h3>
              <p
                className={
                  task.completed
                    ? "task__item-description completed"
                    : "task__item-description"
                }
              >
                {task.description}
              </p>
            </div>
          </div>
          <button className="task__delete-button" onClick={onClickButtonDelete}>
            <img src={taskDelete} alt="Delete" />
          </button>
        </div>
      </div>
    </>
  );
};
