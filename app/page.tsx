import { TodoForm } from "./components/TodoForm";
import { ToDoList } from "./components/TodoList";
import { getToDos } from "./actions/action";
export const dynamic = "force-dynamic";


export default async function Home() {
  const todo = await getToDos();
  return (
    <div className="flex flex-col min-h-screen items-center justify-center gap-10 mt-16 px-8">
      <div className="border w-full lg:w-3xl p-10 flex flex-col items-center rounded-2xl border-blue-500">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Todo App</h1>
          <p className="">Manage your tasks efficiently</p>
        </div>
        <TodoForm />
      </div>
      <div className="mb-16 flex flex-col items-center">
        <h2 className="text-left text-xl font-medium mb-6">My Todos</h2>
        <div className="flex justify-center items-center">
          <ToDoList todos={todo} />
        </div>
      </div>
    </div>
  );
}
