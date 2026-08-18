import { skipToken } from "@reduxjs/toolkit/query";
import { taskApi } from "../../store/api/task.api";
import { userApi } from "../../store/api/user.api";
import { EmptyPage } from "../EmptyPage/EmptyPage";
import { NotLoginPage } from "../NotLoginPage/NotLoginPage";
import { TasksSection } from "../TasksSection/TasksSection";
import { ListTodo, CircleCheckBig } from "lucide-react";
import "./Tasks.scss";
import { getErrorMessage } from "../../utils/getErrorMessage";

export const Tasks = () => {
  const {
    data: getMeData,
    isLoading: isGetMeDataLoading,
    isError: isGetMeError,
  } = userApi.useGetMeQuery();

  const {
    data: userTasks,
    isLoading: isUserTasksLoading,
    isError: isUserTasksError,
    error: userTasksError,
  } = taskApi.useGetTasksByIdQuery(getMeData?.id ?? skipToken);

  if (isUserTasksLoading || isGetMeDataLoading) {
    return (
      <div className="tasks-loading">
        <div className="tasks-loading__spinner" />
      </div>
    );
  }

  if (isGetMeError || !getMeData?.id) {
    return <NotLoginPage />;
  }

  if (isUserTasksError) {
    return (
      <section className="tasks-error">
        <div className="container">
          <p className="tasks-error__message">
            {getErrorMessage(userTasksError)}
          </p>
        </div>
      </section>
    );
  }

  if (!userTasks || userTasks.length === 0) {
    return <EmptyPage />;
  }

  const completedCount = userTasks.filter((task) => task.completed).length;

  return (
    <>
      <section className="tasks-stats">
        <div className="container">
          <div className="tasks-stats__inner">
            <div className="tasks-stats__item">
              <ListTodo
                size={16}
                className="tasks-stats__icon tasks-stats__icon--total"
              />
              <span className="tasks-stats__label tasks-stats__label--total">
                Total tasks
              </span>
              <span className="tasks-stats__badge">{userTasks.length}</span>
            </div>
            <div className="tasks-stats__item">
              <CircleCheckBig
                size={16}
                className="tasks-stats__icon tasks-stats__icon--done"
              />
              <span className="tasks-stats__label tasks-stats__label--done">
                Completed
              </span>
              <span className="tasks-stats__badge">
                {completedCount} of {userTasks.length}
              </span>
            </div>
          </div>
        </div>
      </section>
      <TasksSection taskList={userTasks} />
    </>
  );
};
