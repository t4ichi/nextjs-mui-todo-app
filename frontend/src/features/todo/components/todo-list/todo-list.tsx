"use client";

import type { TodoResponse } from "@/features/todo/types";
import { Box, Pagination, Stack, Typography } from "@mui/material";
import { TodoItem } from "../todo-item/todo-item";

interface TodoListProps {
  items: TodoResponse[];
  total: number;
  page: number;
  limit: number;
}

export const TodoList: React.FC<TodoListProps> = ({
  items,
  total,
  page,
  limit,
}) => {
  const pageCount = Math.ceil(total / limit);

  if (items.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight={200}
      >
        <Typography color="text.secondary">
          タスクが登録されていません
        </Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={2}>
      <Box>
        {items.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            description={todo.description}
            completed={todo.completed}
            dueDate={todo.dueDate}
            createdAt={todo.createdAt}
            onToggleComplete={() => {}}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        ))}
      </Box>
      {pageCount > 1 && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={() => {}}
            color="primary"
          />
        </Box>
      )}
    </Stack>
  );
};
