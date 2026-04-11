import { useContext, type JSX } from "react"
import { TaskItem } from "../TaskItem/TaskItem"
import { TaskContext } from "../../Pages/MainPage"

export const TasksSection = (): JSX.Element => {
  const tasks = useContext(TaskContext)[0]

  return (
    <>
      <section className="tasks__list">
        <div className="container">
          <div className="tasks__list-inner">
            {tasks.map(task => {
              return <TaskItem key={task.id} task={task} />
            })}
          </div>
        </div>
      </section>
    </>
  )
}
