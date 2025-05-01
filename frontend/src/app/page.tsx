import { TodoListContainer } from "@/features/todo/components/todo-list/todo-list-container";
import { getTodos } from "@/features/todo/fetchers";
import { Suspense } from "react";

type TodoProps = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};
export default async function TodosPage({ searchParams }: TodoProps) {
  const params = (await searchParams) ?? {};
  const page = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 10;

  const result = await getTodos({
    offset: (page - 1) * limit,
    limit,
  });

  if (!result.ok) {
    return <div>データの取得に失敗しました: {result.error}</div>;
  }

  return (
    <main>
      <h1>Todo一覧</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <TodoListContainer
          initialData={{ ...result.value, page }}
          initialPage={page}
          initialLimit={limit}
        />
      </Suspense>
    </main>
  );
}
