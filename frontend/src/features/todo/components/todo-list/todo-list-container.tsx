"use client";

import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import { deleteTodo, updateTodo } from "../../fetchers";
import type { Todo } from "../../types";
import { TodoList } from "./todo-list";

interface TodoListContainerProps {
  initialData: {
    items: Todo[];
    total: number;
    page: number;
    limit: number;
  };
  initialPage: number;
  initialLimit: number;
}

// Todo完了状態更新のための関数
const updateTodoStatus = async ({
  id,
  completed,
}: { id: string; completed: boolean }) => {
  const result = await updateTodo(id, { completed });

  if (!result.ok) {
    throw new Error(result.error);
  }

  return result.value;
};

// Todo削除のための関数
async function deleteTodoItem(id: string) {
  const result = await deleteTodo(id);

  if (!result.ok) {
    throw new Error(result.error);
  }

  return result.value;
}

export const TodoListContainer = ({
  initialData,
  initialPage,
  initialLimit,
}: TodoListContainerProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // 楽観的UI更新のための状態
  const [optimisticTodos, updateOptimisticTodos] = useOptimistic(
    initialData.items,
    (state, { id, completed }: { id: string; completed: boolean }) => {
      return state.map((todo) =>
        todo.id === id ? { ...todo, completed } : todo,
      );
    },
  );

  // ページ変更時のURL更新
  const handlePageChange = (newPage: number) => {
    startTransition(() => {
      const params = new URLSearchParams();
      params.set("page", newPage.toString());
      params.set("limit", initialLimit.toString());
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  // Todoの完了状態を切り替え
  const updateMutation = useMutation({
    mutationFn: updateTodoStatus,
    onSuccess: () => {
      // サーバーデータの再検証
      router.refresh();
    },
    onError: (error) => {
      // エラー時の処理
      console.error("Failed to update todo:", error);
      // 楽観的更新を元に戻す処理も追加するとよい
    },
  });

  const handleToggleComplete = (id: string) => {
    const todo = optimisticTodos.find((item) => item.id === id);
    if (todo) {
      // 楽観的UI更新
      updateOptimisticTodos({ id, completed: !todo.completed });
      // API呼び出し
      updateMutation.mutate({ id, completed: !todo.completed });
    }
  };

  // Todo削除
  const deleteMutation = useMutation({
    mutationFn: deleteTodoItem,
    onSuccess: () => {
      router.refresh();
    },
    onError: (error) => {
      console.error("Failed to delete todo:", error);
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm("このタスクを削除しますか？")) {
      deleteMutation.mutate(id);
    }
  };

  // 編集ダイアログを開く
  const handleEdit = (id: string) => {
    // 編集フォームへの遷移またはモーダル表示のロジック
    router.push(`/todos/edit/${id}`);
  };

  return (
    <TodoList
      items={optimisticTodos}
      total={initialData.total}
      page={initialPage}
      limit={initialLimit}
      isLoading={
        isPending || updateMutation.isPending || deleteMutation.isPending
      }
      onPageChange={handlePageChange}
      onToggleComplete={handleToggleComplete}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};
