"use client";

import { createTodo, updateTodo } from "@/features/todo/fetchers";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useForm } from "@tanstack/react-form";
import dayjs from "dayjs";
import { useState } from "react";
import { z } from "zod";

interface TodoFormProps {
  todoId: string;
  onSubmitSuccessAction: () => void;
  initialData?: {
    title: string;
    description?: string;
    completed: boolean;
    dueDate?: string | null;
  };
}

export const TodoForm: React.FC<TodoFormProps> = ({
  todoId,
  onSubmitSuccessAction,
  initialData,
}) => {
  const [error, setError] = useState<string | null>(null);
  // TanStack Form でフォーム状態を管理
  const form = useForm({
    defaultValues: initialData,
    onSubmit: async ({ value }) => {
      const submitData = {
        ...value,
        dueDate: value.dueDate || undefined,
      };

      const result = todoId
        ? await updateTodo(todoId, submitData) // 更新
        : await createTodo(submitData); // 作成

      if (result.ok) {
        onSubmitSuccessAction();
      } else {
        setError("処理に失敗しました");
      }
    },
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <Stack spacing={3} sx={{ mt: 2 }}>
          <form.Field
            name="title"
            validators={{
              onChange: z.string().min(1, "タイトルは必須です"),
            }}
          >
            {(field) => (
              <TextField
                label="タイトル"
                fullWidth
                required
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                error={field.state.meta.errors.length > 0}
                helperText={field.state.meta.errors[0]?.message}
              />
            )}
          </form.Field>

          <form.Field
            name="description"
            validators={{
              onChange: z.string().max(500, "500文字以内で入力してください"),
            }}
          >
            {(field) => (
              <TextField
                label="説明"
                fullWidth
                multiline
                rows={3}
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value)}
                error={field.state.meta.errors.length > 0}
                helperText={field.state.meta.errors[0]?.message}
              />
            )}
          </form.Field>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form.Field name="dueDate">
              {(field) => (
                <DateTimePicker
                  label="期限"
                  value={field.state.value ? dayjs(field.state.value) : null}
                  onChange={(date) =>
                    field.handleChange(date ? date.toISOString() : null)
                  }
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: field.state.meta.errors.length > 0,
                      helperText: field.state.meta.errors[0],
                    },
                  }}
                />
              )}
            </form.Field>
          </LocalizationProvider>

          <form.Field name="completed">
            {(field) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field.state.value}
                    onChange={(e) => field.handleChange(e.target.checked)}
                  />
                }
                label="完了"
              />
            )}
          </form.Field>

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={onSubmitSuccessAction}>キャンセル</Button>
            <Button type="submit" variant="contained" color="primary">
              {todoId ? "更新する" : "作成する"}
            </Button>
          </Box>
        </Stack>
      </form>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};
