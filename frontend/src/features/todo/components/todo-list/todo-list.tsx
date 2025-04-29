import type { TodoResponse } from "@/features/types";
import { Box, Pagination, Stack, Typography } from "@mui/material";
import { TodoItem } from "../todo-item/todo-item";

interface TodoListProps {
  items: TodoResponse[];
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  items,
  total,
  page,
  limit,
  onPageChange,
  onToggleComplete,
  onEdit,
  onDelete,
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
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </Box>
      {pageCount > 1 && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, value) => onPageChange(value)}
            color="primary"
          />
        </Box>
      )}
    </Stack>
  );
};
