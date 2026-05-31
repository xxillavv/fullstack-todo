import { useUsers } from "../../hooks/useUsers";
import { taskApi } from "../../store/api/task.api";
import { EmptyPage } from "../EmptyPage/EmptyPage";
import { NotLoginPage } from "../NotLoginPage/NotLoginPage";
import { TasksSection } from "../TasksSection/TasksSection";
import "./Tasks.scss";

export const Tasks = () => {
  const { user } = useUsers();

  const { data, isLoading: isTasksLoading } = taskApi.useGetTasksByIdQuery(
    user.id,
    { skip: !user.id || user.id === null },
  );

  if (isTasksLoading) {
    return <p className="loading__title">Loading...</p>;
  }

  if(user.id === null) {
    return <NotLoginPage />
  }

  if (!data || data.length === 0) {
    return <EmptyPage />;
  }

  return (
    <>
      <section className="tasks__info">
        <div className="container">
          <div className="tasks__info-inner">
            <p className="tasks__info-inner-total">
              Total tasks <span>{data?.length || 0}</span>
            </p>
            <p className="tasks__info-inner-completed">
              Completed tasks
              <span>
                {data?.filter((task) => task.completed).length || 0} of{" "}
                {data?.length || 0}
              </span>
            </p>
          </div>
        </div>
      </section>
      <TasksSection taskList={data} />
    </>
  );
};
