import {
  Box,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useForm } from "@tanstack/react-form";
import type { Todo } from "../../types";
import { TodoItem } from "../todo-item";

interface TodoListProps {
  items: Todo[];
  total: number;
  page: number;
  limit: number;
  isLoading?: boolean;
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
  isLoading = false,
  onPageChange,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  const pageCount = Math.ceil(total / limit);

  // ページネーションフォーム（TanStack Form）
  const paginationForm = useForm({
    defaultValues: {
      currentPage: page,
    },
    onSubmit: async ({ value }) => {
      onPageChange(value.currentPage);
    },
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

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
          <paginationForm.Field name="currentPage">
            {(field) => (
              <Pagination
                count={pageCount}
                page={field.state.value}
                onChange={(_, value) => {
                  field.handleChange(value);
                  paginationForm.handleSubmit();
                }}
                color="primary"
                disabled={isLoading}
              />
            )}
          </paginationForm.Field>
        </Box>
      )}
    </Stack>
  );
};
