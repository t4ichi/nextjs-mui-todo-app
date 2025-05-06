import { getTodos } from "@/features/todo/actions";
import { TodoCreateButton } from "@/features/todo/components/todo-create-button";
import { TodoListContainer } from "@/features/todo/components/todo-list/todo-list-container";
import { Container, Typography } from "@mui/material";
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
      <Container
        maxWidth="md"
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Todoリスト
        </Typography>
        <Suspense fallback={<div>Loading...</div>}>
          <TodoCreateButton />
          <TodoListContainer
            initialData={{ ...result.value, page }}
            initialPage={page}
            initialLimit={limit}
          />
        </Suspense>
      </Container>
    </main>
  );
}
