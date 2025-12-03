import { TodoForm } from "./components/TodoForm";
import { ToDoList } from "./components/TodoList";
import { getToDos } from "./actions/action";

export default async function Home() {
  const todo = await getToDos();
  return (
    <div className="flex flex-col min-h-screen items-center justify-center gap-10">
      <div className="border w-3xl p-10 flex flex-col items-center rounded-2xl border-green-500">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Todo App</h1>
          <p className="">Manage your tasks efficiently</p>
        </div>
        <TodoForm />
      </div>
      <div>
        <h2>My Todos</h2>
        <div>
          <ToDoList todos={todo} />
        </div>
      </div>
    </div>
  );
}
