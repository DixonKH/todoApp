import { TodoForm } from "./components/TodoForm"

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="border w-3xl p-10 flex flex-col items-center rounded-2xl border-green-500">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">
            Todo App
          </h1>
          <p className="">
            Manage your tasks efficiently
          </p>
        </div>
        <TodoForm />
        <div>ToDos</div>
      </div>
    </div>
  );
}
