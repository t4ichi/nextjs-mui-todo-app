import type { TodoResponse } from "@/features/todo/types";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";

type TodoItemProps = Pick<
  TodoResponse,
  "id" | "title" | "description" | "completed" | "dueDate" | "createdAt"
> & {
  onToggleComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  id,
  title,
  description,
  completed,
  dueDate,
  createdAt,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  const formatDate = (date: string) => {
    return dayjs(date).format("YYYY/MM/DD HH:mm");
  };

  const isDueDatePassed = dueDate ? dayjs(dueDate).isBefore(dayjs()) : false;

  return (
    <Card
      sx={{
        mb: 2,
        opacity: completed ? 0.7 : 1,
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
            <Checkbox
              checked={completed}
              onChange={() => onToggleComplete(id)}
              sx={{ mt: -0.5 }}
            />
            <Box>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  textDecoration: completed ? "line-through" : "none",
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
            <IconButton size="small" onClick={() => onEdit(id)}>
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
