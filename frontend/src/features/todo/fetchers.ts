"use server";

import {
  createTodo as orvalCreateTodo,
  deleteTodo as orvalDeleteTodo,
  getTodo as orvalGetTodo,
  getTodos as orvalGetTodos,
  updateTodo as orvalUpdateTodo,
} from "@/libs/orval/fetcher/todos/todos.fetcher";
import {
  getTodoResponse as todoSchema,
  getTodosResponse as todosSchema,
  updateTodoResponse as updateTodoSchema,
} from "@/libs/orval/schemas/todos/todos.zod";
import type { Result } from "@/utils/result";
import type { z } from "zod";

// ログインユーザーのTodo一覧を取得
export const getTodos = async (
  ...args: Parameters<typeof orvalGetTodos>
): Promise<Result<z.infer<typeof todosSchema>, string>> => {
  try {
    const res = await orvalGetTodos(...args);
    const parsed = todosSchema.safeParse(res.data);
    if (!parsed.success) {
      return {
        ok: false,
        error: parsed.error.message,
      };
    }
    return { ok: true, value: parsed.data };
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return { ok: false, error: error.message };
    }
    throw error;
  }
};

// 新しいTodoを作成
export const createTodo = async (
  ...args: Parameters<typeof orvalCreateTodo>
): Promise<Result<z.infer<typeof todoSchema>, string>> => {
  try {
    const res = await orvalCreateTodo(...args);
    const parsed = todoSchema.safeParse(res.data);
    if (!parsed.success) {
      return {
        ok: false,
        error: parsed.error.message,
      };
    }
    return { ok: true, value: parsed.data };
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return { ok: false, error: error.message };
    }
    throw error;
  }
};

// 指定されたTodoの詳細を取得する
export const getTodo = async (
  ...args: Parameters<typeof orvalGetTodo>
): Promise<Result<z.infer<typeof todoSchema>, string>> => {
  try {
    const res = await orvalGetTodo(...args);
    const parsed = todoSchema.safeParse(res.data);
    if (!parsed.success) {
      return {
        ok: false,
        error: parsed.error.message,
      };
    }
    return { ok: true, value: parsed.data };
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return { ok: false, error: error.message };
    }
    throw error;
  }
};

// 指定されたTodoを更新する
export const updateTodo = async (
  ...args: Parameters<typeof orvalUpdateTodo>
): Promise<Result<z.infer<typeof updateTodoSchema>, string>> => {
  try {
    const res = await orvalUpdateTodo(...args);
    const parsed = updateTodoSchema.safeParse(res.data);
    if (!parsed.success) {
      return {
        ok: false,
        error: parsed.error.message,
      };
    }
    return { ok: true, value: parsed.data };
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return { ok: false, error: error.message };
    }
    throw error;
  }
};

// 指定されたTodoを削除する;
export const deleteTodo = async (
  ...args: Parameters<typeof orvalDeleteTodo>
): Promise<Result<void, string>> => {
  try {
    await orvalDeleteTodo(...args);
    return { ok: true, value: undefined };
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return { ok: false, error: error.message };
    }
    throw error;
  }
};
