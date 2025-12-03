"use client";

import { useState, useTransition } from "react";
import { toggleToDo, updateToDo, deleteToDo } from "../actions/action";
import { Todo } from "@prisma/client";

export const TodoItem = ({ todo }: { todo: Todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");
  const [isPending, startTransition] = useTransition();

  const handleToogle = () => {
    startTransition(async () => {
      try {
        await toggleToDo(todo.id);
      } catch (error) {
        console.error("Error toggling todo:", error);
      }
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this todo?")) {
      startTransition(async () => {
        try {
          await deleteToDo(todo.id);
        } catch (error) {
          console.error("Error deleting todo:", error);
        }
      });
    }
  };

  const handleSave = () => {
    if (!title.trim()) return;
    startTransition(async () => {
      try {
        await updateToDo(todo.id, title.trim(), description.trim() || "");
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTitle(todo.title);
    setDescription(todo.description || "");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.altKey || e.metaKey || e.ctrlKey)) {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <div
      className={`bg-white border dark:bg-gray-900 rounded-lg shadow-lg p-4 mb-3 border-l-5 ${
        todo.isDone ? "border-green-500 opacity-75" : "border-blue-500"
      }`}
    >
      {isEditing ? (
        <div className="space-x-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isPending}
            onKeyDown={handleKeyDown}
            className="w-full px-3 mb-2 py-2 border dark:border-green-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            placeholder="Todo title..."
            aria-label="Edit todo title"
            autoFocus
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isPending || !title}
            placeholder="Todo description..."
            rows={2}
            aria-label="Edit todo description"
            className="w-full px-3 py-2 border dark:border-green-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isPending || !title.trim()}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
              aria-label="Save changes"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              disabled={isPending}
              className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-red-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
              aria-label="Cancel editing"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={todo.isDone}
            onChange={handleToogle}
            disabled={isPending}
            arial-label={`Mark ${todo.title} as ${
              todo.isDone ? "uncompleted" : "completed"
            }`}
            className="mt-1 w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
          />
          <div className="flex-1">
            <h3
              className={`text-lg font-semibold ${
                todo.isDone ? "line-through dark:text-gray-500" : ""
              }`}
            >
              {todo.title}
            </h3>
            {todo.description && (
              <p
                className={`dark:text-gray-300 ${
                  todo.isDone ? "line-through " : ""
                }`}
              >
                {todo.description}
              </p>
            )}
            <p className="mt-2 text-xs text-gray-500">
              {new Date(todo.createdAt).toDateString()}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              disabled={isPending}
              arial-label="Edit todo"
              className="text-green-600 cursor-pointer hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 font-medium text-sm px-3 py-1 rounded transition-colors duration-200"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={isPending}
              arial-label="Edit todo"
              className="text-red-600 cursor-pointer hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium text-sm px-3 py-1 rounded transition-colors duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
