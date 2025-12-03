"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { Todo } from "@prisma/client";
export const dynamic = "force-dynamic";


export const getToDos = async (): Promise<Todo[]> => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return todos;
  } catch (error) {
    console.log("Error fetching todos", error);
    throw new Error("Error fetching todos");
  }
};

export const createToDo = async (title: string, description?: string) => {
  try {
    const todo = await prisma.todo.create({
      data: {
        title,
        description: description || "",
      },
    });
    revalidatePath("/");
    return todo;
  } catch (error) {
    console.log("Error creating todo", error);
    throw new Error("Error creating todo");
  }
};

export const updateToDo = async (
  id: string,
  title: string,
  description?: string
) => {
  try {
    const todo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        title,
        description: description || "",
      },
    });
    revalidatePath("/");
    return todo;
  } catch (error) {
    console.log("Error updating todo", error);
    throw new Error("Error updating todo");
  }
};

export const toggleToDo = async (id: string) => {
  try {
    const todo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!todo) {
      throw new Error("Todo not found!");
    }

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        isDone: !todo.isDone,
      },
    });
    revalidatePath("/");
    return updatedTodo;
  } catch (error) {
    console.log("Error updating todo", error);
    throw new Error("Error updating todo");
  }
};

export const deleteToDo = async (id: string) => {
  try {
    const todo = await prisma.todo.delete({
      where: {
        id,
      },
    });
    revalidatePath("/");
    return todo;
  } catch (error) {
    console.log("Error deleting todo", error);
    throw new Error("Error deleting todo");
  }
};
