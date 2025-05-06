import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useDialogs } from "@toolpad/core/useDialogs";
import dayjs from "dayjs";
import { updateTodo } from "../../actions";
import type { Todo } from "../../types";
import { TodoForm } from "../todo-form";

type TodoItemProps = Pick<
  Todo,
  "id" | "title" | "description" | "completed" | "dueDate" | "createdAt"
> & {
  onDelete: (id: string) => void;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  id,
  title,
  description,
  completed,
  dueDate,
  createdAt,
  onDelete,
}) => {
  const dialogs = useDialogs();
  const toggleComplete = useMutation({
    mutationFn: async ({
      id,
      completed,
    }: {
      id: string;
      completed: boolean;
    }) => {
      const result = await updateTodo(id, { completed });
      if (!result.ok) {
        throw new Error(result.error);
      }
      return result.value;
    },
    onSuccess: () => {},
  });

  const handleEdit = async (id: string) => {
    await dialogs.open(({ open, onClose }) => (
      <Dialog fullWidth open={open} onClose={onClose}>
        <DialogContent>
          <TodoForm
            todoId={id}
            initialData={{
              title,
              description,
              completed,
              dueDate,
            }}
            onSubmit={() => {
              onClose(false);
            }}
            onCancel={() => {
              onClose(false);
            }}
          />
        </DialogContent>
      </Dialog>
    ));
  };
  // Todo項目のフォーム状態管理
  const form = useForm({
    defaultValues: {
      completed,
    },
    onSubmit: async () => {
      await toggleComplete.mutateAsync({ id, completed: completed });
    },
  });

  const formatDate = (date: string) => {
    return dayjs(date).format("YYYY/MM/DD HH:mm");
  };

  const isDueDatePassed = dueDate ? dayjs(dueDate).isBefore(dayjs()) : false;

  return (
    <Card
      sx={{
        mb: 2,
        opacity: form.state.values.completed ? 0.7 : 1,
        transition: "opacity 0.3s",
      }}
    >
      <CardContent>
        <Box
          display="flex"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="flex-start" flex={1}>
            <form.Field name="completed">
              {(field) => (
                <Checkbox
                  checked={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.checked);
                    form.handleSubmit();
                  }}
                  sx={{ mt: -0.5 }}
                />
              )}
            </form.Field>
            <Box>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  textDecoration: form.state.values.completed
                    ? "line-through"
                    : "none",
                }}
              >
                {title}
              </Typography>
              {description && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {description}
                </Typography>
              )}
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  作成日: {formatDate(createdAt)}
                </Typography>
                {dueDate && (
                  <Chip
                    label={`期限: ${formatDate(dueDate)}`}
                    size="small"
                    color={isDueDatePassed ? "error" : "default"}
                  />
                )}
              </Stack>
            </Box>
          </Box>
          <Box>
            <IconButton size="small" onClick={() => handleEdit(id)}>
              <EditIcon />
            </IconButton>
            <IconButton size="small" onClick={() => onDelete(id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
