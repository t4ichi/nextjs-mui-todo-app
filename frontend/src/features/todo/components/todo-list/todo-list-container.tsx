"use client";

import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteTodo } from "../../actions";
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

  // ページ変更時のURL更新
  const handlePageChange = (newPage: number) => {
    startTransition(() => {
      const params = new URLSearchParams();
      params.set("page", newPage.toString());
      params.set("limit", initialLimit.toString());
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
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

  return (
    <TodoList
      items={initialData.items}
      total={initialData.total}
      page={initialPage}
      limit={initialLimit}
      isLoading={isPending || deleteMutation.isPending}
      onPageChange={handlePageChange}
      onDelete={handleDelete}
    />
  );
};
