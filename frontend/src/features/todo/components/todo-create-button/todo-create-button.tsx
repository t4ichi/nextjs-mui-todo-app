"use client";

import { Add } from "@mui/icons-material";
import { Button, Dialog, DialogContent } from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { useDialogs } from "@toolpad/core/useDialogs";
import { TodoForm } from "../todo-form";

export const TodoCreateButton: React.FC = () => {
  const dialogs = useDialogs();
  const form = useForm({
    defaultValues: {},
    onSubmit: async () => {
      await dialogs.open(({ open, onClose }) => (
        <Dialog fullWidth open={open} onClose={onClose}>
          <DialogContent>
            <TodoForm
              todoId={""}
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
    },
  });

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<Add />}
      onClick={() => form.handleSubmit()}
      type="button"
    >
      新規作成
    </Button>
  );
};
