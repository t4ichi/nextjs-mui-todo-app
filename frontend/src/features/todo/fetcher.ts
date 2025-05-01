import type { z } from "zod";
import {
  createTodo as orvalCreateTodo,
  deleteTodo as orvalDeleteTodo,
  getTodo as orvalGetTodo,
  getTodos as orvalGetTodos,
  updateTodo as orvalUpdateTodo,
} from "../../libs/orval/fetcher/todos/todos.fetcher";
import {
  getTodoResponse as todoSchema,
  getTodosResponse as todosSchema,
  updateTodoResponse as updateTodoSchema,
} from "../../libs/orval/schemas/todos/todos.zod";

type Result<T, E = unknown> = { ok: true; value: T } | { ok: false; error: E };

export const getTodos = async (
  ...args: Parameters<typeof orvalGetTodos>
): Promise<Result<z.infer<typeof todosSchema>, unknown>> => {
  try {
    const res = await orvalGetTodos(...args);
    const todos = todosSchema.safeParse(res.data);
    console.log(todos);
    return { ok: true, value: todosSchema.parse(res.data) };
  } catch (error) {
    return { ok: false, error };
  }
};

export const createTodo = async (
  ...args: Parameters<typeof orvalCreateTodo>
): Promise<Result<z.infer<typeof todoSchema>, unknown>> => {
  try {
    const res = await orvalCreateTodo(...args);
    return { ok: true, value: todoSchema.parse(res.data) };
  } catch (error) {
    return { ok: false, error };
  }
};

export const getTodo = async (
  ...args: Parameters<typeof orvalGetTodo>
): Promise<Result<z.infer<typeof todoSchema>, unknown>> => {
  try {
    const res = await orvalGetTodo(...args);
    return { ok: true, value: todoSchema.parse(res.data) };
  } catch (error) {
    return { ok: false, error };
  }
};

export const updateTodo = async (
  ...args: Parameters<typeof orvalUpdateTodo>
): Promise<Result<z.infer<typeof updateTodoSchema>, unknown>> => {
  try {
    const res = await orvalUpdateTodo(...args);
    return { ok: true, value: updateTodoSchema.parse(res.data) };
  } catch (error) {
    return { ok: false, error };
  }
};

export const deleteTodo = async (
  ...args: Parameters<typeof orvalDeleteTodo>
): Promise<Result<void, unknown>> => {
  try {
    await orvalDeleteTodo(...args);
    return { ok: true, value: undefined };
  } catch (error) {
    return { ok: false, error };
  }
};
