import { useState, type JSX } from "react";
import type { TTask } from "../../types/type";
import { taskApi } from "../../store/api/task.api";
import {
  Circle,
  CheckCircle2,
  Trash2,
  Pencil,
  Check,
  X,
  Loader2
} from "lucide-react";
import "./TaskItem.scss";

type TTaskItemProps = {
  task: TTask;
};

export const TaskItem = ({ task }: TTaskItemProps): JSX.Element => {
  const [updateTask, { isLoading: isUpdating }] = taskApi.useUpdateTaskMutation();
  const [deleteTask, { isLoading: isDeleting }] = taskApi.useDeleteTaskMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || "");

  const handleTaskComplete = async () => {
    if (!task.id) return;
    await updateTask({
      taskId: task.id,
      updateData: {
        completed: !task.completed,
      },
    });
  };

  const handleTaskDelete = async () => {
    if (!task.id) return;
    await deleteTask(task.id);
  };

  const handleSaveEdit = async () => {
    if (!task.id || !editTitle.trim()) return;
    await updateTask({
      taskId: task.id,
      updateData: {
        ...task,
        title: editTitle.trim(),
        description: editDescription.trim(),
      },
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  return (
    <div
      className={`task-item ${task.completed ? "task-item--done" : ""} ${
        isEditing ? "task-item--editing" : ""
      }`}
    >
      <button
        className="task-item__check"
        onClick={handleTaskComplete}
        disabled={isUpdating || isEditing}
        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
      >
        {isUpdating ? (
          <Loader2 size={20} className="task-item__spinner" />
        ) : task.completed ? (
          <CheckCircle2
            size={20}
            className="task-item__check-icon task-item__check-icon--done"
          />
        ) : (
          <Circle size={20} className="task-item__check-icon" />
        )}
      </button>

      <div className="task-item__content">
        {isEditing ? (
          <div className="task-item__edit-form">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              className="task-item__edit-input task-item__edit-input--title"
              placeholder="Task title..."
              autoFocus
            />
            <input
              type="text"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              onKeyDown={handleKeyDown}
              className="task-item__edit-input task-item__edit-input--desc"
              placeholder="Description (optional)..."
            />
          </div>
        ) : (
          <>
            <h3 className="task-item__title">{task.title}</h3>
            {task.description && (
              <p className="task-item__description">{task.description}</p>
            )}
          </>
        )}
      </div>

      <div className="task-item__actions">
        {isEditing ? (
          <>
            <button
              className="task-item__action-btn task-item__action-btn--save"
              onClick={handleSaveEdit}
              disabled={isUpdating || !editTitle.trim()}
              title="Save changes (Enter)"
            >
              <Check size={16} />
            </button>
            <button
              className="task-item__action-btn task-item__action-btn--cancel"
              onClick={handleCancelEdit}
              title="Cancel (Esc)"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <>
            <button
              className="task-item__action-btn task-item__action-btn--edit"
              onClick={() => setIsEditing(true)}
              title="Edit task"
            >
              <Pencil size={15} />
            </button>
            <button
              className="task-item__action-btn task-item__action-btn--delete"
              onClick={handleTaskDelete}
              disabled={isDeleting}
              title="Delete task"
            >
              {isDeleting ? (
                <Loader2 size={15} className="task-item__spinner" />
              ) : (
                <Trash2 size={15} />
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};
