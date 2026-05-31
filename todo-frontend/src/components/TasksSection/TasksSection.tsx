import { type JSX } from "react";
import type { TTask } from "../../types/type";
import { TaskItem } from "../TaskItem/TaskItem";

type TTaskProps = {
  taskList: TTask[] | undefined
};
export const TasksSection = ({ taskList }: TTaskProps): JSX.Element => {
  return (
    <>
      <section className="tasks__list">
        <div className="container">
          <div className="tasks__list-inner">
            {taskList?.map((task, index) => {
              return <TaskItem key={index} task={task} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
};
