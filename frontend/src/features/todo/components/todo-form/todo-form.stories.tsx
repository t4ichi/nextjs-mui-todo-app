import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Meta, StoryObj } from "@storybook/react";
import {
  todoCreateErrorHandler,
  todoCreateHandler,
  todoEditHandler,
} from "../../mocks";
import { TodoForm } from "./todo-form";

const meta = {
  title: "features/todo/components/todo-form",
  component: TodoForm,
  decorators: [
    (Story) => (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Story />
      </LocalizationProvider>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TodoForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Create: Story = {
  args: {
    todoId: "",
    onSubmit: () => alert("Submit Success!"),
    onCancel: () => alert("Cancel!"),
  },
  parameters: {
    msw: {
      handlers: [todoCreateHandler],
    },
  },
};

export const Edit: Story = {
  args: {
    todoId: "abc12345-e89b-12d3-a456-426614174000",
    onSubmit: () => alert("Submit Success!"),
    onCancel: () => alert("Cancel!"),
    initialData: {
      title: "Sample Todo",
      description: "This is a sample todo item.",
      completed: false,
      dueDate: "2023-10-01T12:00:00Z",
    },
  },
  parameters: {
    msw: {
      handlers: [todoEditHandler],
    },
  },
};

// エラーケースのストーリー
export const LoadingError: Story = {
  args: {
    todoId: "",
    onSubmit: () => alert("Submit Error!"),
    onCancel: () => alert("Cancel!"),
  },
  parameters: {
    msw: {
      handlers: [todoCreateErrorHandler],
    },
  },
};
