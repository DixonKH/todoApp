"use client";

import { useState, useTransition } from "react";
import { createToDo } from "../actions/action";

export const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      await createToDo(title, description);
      setTitle("");
      setDescription("");
    });
  }

  return (
    <form className="w-full rounded-lg shadow-md p-6 mb-6 border border-green-500">
      <div className="mb-4">
        <label
          className="block text-sm font-bold mb-2"
          htmlFor="title"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isPending}
          placeholder="Enter a title..."
          required
          aria-label="Todo title"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 outline-none focus:ring-green-500 focus:border-transparent dark:bg-white dark:text-black"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-bold mb-2"
          htmlFor="title"
        >
          Description
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isPending}
          placeholder="Enter a optional description..."
          required
          aria-label="Description title"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 outline-none focus:ring-green-500 focus:border-transparent dark:bg-white dark:text-black"
        />
      </div>
      <button
        type="submit"
        disabled={isPending || !title.trim()}
        aria-label="Add todo"
        className="w-full mt-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
      >
        {isPending ? "Adding" : "Add Todo"}
      </button>
    </form>
  );
};
