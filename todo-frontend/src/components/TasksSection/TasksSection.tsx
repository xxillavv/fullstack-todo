import { type JSX } from "react";
import type { TTask } from "../../types/type";
import { TaskItem } from "../TaskItem/TaskItem";

type TTaskProps = {
  taskList: TTask[] | undefined
};

export const TasksSection = ({ taskList }: TTaskProps): JSX.Element => {
  return (
    <section className="tasks-list">
      <div className="container">
        <div className="tasks-list__inner">
          {taskList?.map((task, index) => {
            return <TaskItem key={index} task={task} />;
          })}
        </div>
      </div>
    </section>
  );
};
