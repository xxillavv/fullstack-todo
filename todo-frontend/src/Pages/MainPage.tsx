import React, { useEffect, type JSX, useState, createContext } from "react";
import type { TTask } from "../types/type";
import { createTask, getTasks } from "../api/api";
import { EmptyPage } from "../components/EmptyPage/EmptyPage";
import { TasksSection } from "../components/TasksSection/TasksSection";
import "./MainPage.scss";
import logo from "../assets/logo.svg";

export const TaskContext = createContext<
  [TTask[], React.Dispatch<React.SetStateAction<TTask[]>>]
>([[], () => {}]);
export const MainPage = (): JSX.Element => {
  const [tasks, setTasks] = useState<TTask[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [buttons, setButtons] = useState<string[]>([]);

  const fetchTasks = async (page: number) => {
    try {
      const data = await getTasks(page);
      setTasks(data.tasks);

      const totalTasks = parseInt(data.total);
      const pagesCount = Math.ceil(totalTasks / 5);

      setButtons(Array.from({ length: pagesCount }, (_, i) => String(i + 1)));
    } catch {
      throw new Error("Failed to fetch tasks or count pages");
    }
  };

  useEffect(() => {
    fetchTasks(1);
  }, []);

  const handleAddTask = async () => {
    if (!title || !description) {
      alert("Please fill in both title and description");
      return;
    }

    try {
      const data = await createTask({ title, description });

      setTasks((prev) => [...prev, data]);

      setTitle("");
      setDescription("");
    } catch {
      throw new Error("Failed to create task");
    }
  };

  const changePageClick = async (page: number) => {
    fetchTasks(page);
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__inner">
            <img src={logo} alt="website_logo" className="header__logo" />
          </div>
        </div>
      </header>
      <main>
        <section className="inputs">
          <div className="container">
            <div className="inputs__inner">
              <div className="inputs__left">
                <input
                  type="text"
                  id="task-title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={!title ? "" : title}
                  className="inputs__left-title"
                  placeholder="Enter title of your task..."
                />
                <input
                  type="text"
                  id="task-description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={!description ? "" : description}
                  className="inputs__left-description"
                  placeholder="Enter description of your task..."
                />
              </div>
              <button className="inputs__button" onClick={handleAddTask}>
                Add Task
              </button>
            </div>
          </div>
        </section>
        <section className="tasks__info">
          <div className="container">
            <div className="tasks__info-inner">
              <p className="tasks__info-total">
                Total tasks <span>{tasks.length || 0}</span>{" "}
              </p>
              <p className="tasks__info-completed">
                Completed tasks{" "}
                <span>
                  {tasks.filter((task) => task.completed).length || 0} of{" "}
                  {tasks.length || 0}
                </span>{" "}
              </p>
            </div>
          </div>
        </section>
        {!tasks || tasks.length === 0 ? (
          <EmptyPage />
        ) : (
          <TaskContext.Provider value={[tasks, setTasks]}>
            <TasksSection />
          </TaskContext.Provider>
        )}

        <nav className="navigation__buttons">
          <div className="container">
            <div className="navigation__buttons-inner">
              {buttons.map((el) => {
                return (
                  <button
                    key={Number(el)}
                    onClick={() => changePageClick(parseInt(el))}
                  >
                    {el}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      </main>
    </>
  );
};
