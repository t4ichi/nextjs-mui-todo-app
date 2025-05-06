import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DialogsProvider } from "@toolpad/core/useDialogs";
import dayjs from "dayjs";
import { todoUpdateHandler } from "../../mocks";
import { TodoItem } from "./todo-item";

const queryClient = new QueryClient();
const meta: Meta<typeof TodoItem> = {
  title: "features/todo/components/todo-item",
  component: TodoItem,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <DialogsProvider>
          <Story />
        </DialogsProvider>
      </QueryClientProvider>
    ),
  ],
  parameters: {
    msw: {
      handlers: [todoUpdateHandler],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TodoItem>;

const commonProps = {
  onToggleComplete: (id: string, completed: boolean) =>
    alert(`Toggle complete: ${id}, completed: ${completed}`),
  onDelete: (id: string) => alert(`Delete: ${id}`),
};

export const Default: Story = {
  args: {
    id: "1",
    title: "買い物に行く",
    description: "牛乳、卵、パンを買う",
    completed: false,
    createdAt: dayjs().subtract(1, "day").toISOString(),
    dueDate: dayjs().add(2, "day").toISOString(),
    ...commonProps,
  },
};

export const Completed: Story = {
  args: {
    id: "2",
    title: "本を読む",
    description: "『Clean Code』の第3章まで読む",
    completed: true,
    createdAt: dayjs().subtract(3, "day").toISOString(),
    dueDate: dayjs().add(1, "day").toISOString(),
    ...commonProps,
  },
};

export const Overdue: Story = {
  args: {
    id: "3",
    title: "プロジェクト提出",
    description: "クライアントに資料を送る",
    completed: false,
    createdAt: dayjs().subtract(5, "day").toISOString(),
    dueDate: dayjs().subtract(1, "day").toISOString(),
    ...commonProps,
  },
};
