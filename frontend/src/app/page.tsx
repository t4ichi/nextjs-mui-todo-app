import { TodoList } from "@/features/todo/components/todo-list/todo-list";
import { getTodos } from "@/features/todo/fetcher";

export default async function Home() {
  const page = 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const result = await getTodos({ limit, offset });

  if (!result.ok) {
    return (
      <div>
        <p>タスクの取得に失敗しました</p>
      </div>
    );
  }

  return (
    <TodoList
      items={result.value.items}
      total={result.value.total}
      page={page}
      limit={limit}
    />
  );
}
