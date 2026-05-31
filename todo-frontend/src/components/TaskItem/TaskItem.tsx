import { type JSX } from "react";
import type { TTask } from "../../types/type";
import doneButton from "../../assets/done-button.svg";
import inProgressButton from "../../assets/in-progress-button.svg";
import taskDelete from "../../assets/tasl-delete.svg";
import "./TaskItem.scss";

type TTaskItemProps = {
  task: TTask
}
export const TaskItem = ({ task }: TTaskItemProps): JSX.Element => {
  const handleTaskComplete = () => {

  }

  const handleTaskDelete = () => {

  }

  return (
    <>
      <div className="task__item">
        <div className="task__item-inner">
          <div className="task__left">
            <button className="task__left-checkbox" onClick={handleTaskComplete}>
              <img
                src={task.completed ? doneButton : inProgressButton}
                alt={task.completed ? "Done" : "In Progress"}
              />
            </button>
            <div className="task__left-info">
              <h3
                className={
                  task.completed
                    ? "task__left-info-title completed"
                    : "task__left-info-title"
                }
              >
                {task.title}
              </h3>
              <p
                className={
                  task.completed
                    ? "task__left-info-description completed"
                    : "task__left-info-description"
                }
              >
                {task.description}
              </p>
            </div>
          </div>
          <button className="task__delete-button" onClick={handleTaskDelete}>
            <img src={taskDelete} alt="Delete" />
          </button>
        </div>
      </div>
    </>
  );
};
