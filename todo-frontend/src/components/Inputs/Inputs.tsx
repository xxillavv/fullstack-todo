import { useTasks } from "../../hooks/useTasks";
import { userApi } from "../../store/api/user.api";
import type { TTaskData } from "../../types/type";
import { Plus, Loader2, PenLine, AlignLeft, CornerDownLeft } from "lucide-react";
import "./Inputs.scss";
import { useState } from "react";
import { getErrorMessage } from "../../utils/getErrorMessage";

export const Inputs = () => {
  const { data } = userApi.useGetMeQuery();

  const {
    createTask,
    isPostTaskLoading,
    isPostTaskError,
    postTaskError,
    isGetTaskError,
    getTaskError,
  } = useTasks(data?.id);

  const [addTaskData, setAddTaskData] = useState<TTaskData>({
    title: "",
    description: "",
  });

  const handleAddTask = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!data?.id || !addTaskData.title.trim()) return;

    await createTask(addTaskData, data.id);
    setAddTaskData({ title: "", description: "" });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddTask();
    }
  };

  if (!data?.id) return null;

  return (
    <section className="inputs">
      <div className="container">
        <form className="inputs__box" onSubmit={handleAddTask}>
          <div className="inputs__row">
            <div className="inputs__field-wrapper">
              <span className="inputs__icon">
                <PenLine size={15} />
              </span>
              <input
                type="text"
                id="task-title"
                value={addTaskData.title}
                onChange={(e) =>
                  setAddTaskData({ ...addTaskData, title: e.target.value })
                }
                onKeyDown={handleKeyDown}
                className="inputs__input inputs__input--title"
                placeholder="What needs to be done? (e.g. refactor auth flow)"
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              className="inputs__submit"
              disabled={isPostTaskLoading || !addTaskData.title.trim()}
            >
              {isPostTaskLoading ? (
                <Loader2 size={16} className="inputs__spinner" />
              ) : (
                <Plus size={16} />
              )}
              <span>Create</span>
              <kbd className="inputs__kbd">
                <CornerDownLeft size={10} />
              </kbd>
            </button>
          </div>

          <div className="inputs__divider" />

          <div className="inputs__field-wrapper inputs__field-wrapper--desc">
            <span className="inputs__icon inputs__icon--desc">
              <AlignLeft size={15} />
            </span>
            <input
              type="text"
              id="task-description"
              value={addTaskData.description}
              onChange={(e) =>
                setAddTaskData({
                  ...addTaskData,
                  description: e.target.value,
                })
              }
              onKeyDown={handleKeyDown}
              className="inputs__input inputs__input--desc"
              placeholder="Add optional notes, links, or flags..."
              autoComplete="off"
            />
          </div>

          {(isGetTaskError || isPostTaskError) && (
            <div className="inputs__error">
              {getErrorMessage(getTaskError || postTaskError)}
            </div>
          )}
        </form>
      </div>
    </section>
  );
};
