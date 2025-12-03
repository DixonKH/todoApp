"use client";
import { Todo } from "@prisma/client";

type ToDoListProps = {
  todos: Todo[];
};

export const ToDoList = ({ todos }: ToDoListProps) => {
  if (!todos ||todos.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No todos yet. Add one to get started!
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {todos.map((todo) => (
        <div key={todo.id} className="border border-green-500 rounded-lg p-4">
          <h2 className="text-lg font-bold">{todo.title}</h2>
          <p>{todo.description}</p>
        </div>
      ))}
    </div>
  );
};
