import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DialogsProvider } from "@toolpad/core/useDialogs";
import dayjs from "dayjs";
import { todoUpdateHandler } from "../../mocks";
import { TodoList } from "./todo-list";

const queryClient = new QueryClient();
const meta = {
  title: "features/todo/components/todo-list",
  component: TodoList,
  parameters: {
    layout: "padded",
    msw: {
      handlers: [todoUpdateHandler],
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <DialogsProvider>
          <Story />
        </DialogsProvider>
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof TodoList>;

export default meta;
type Story = StoryObj<typeof meta>;

const generateTodos = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: `todo-${index + 1}`,
    userId: "user-1",
    title: `タスク ${index + 1}`,
    description: index % 2 === 0 ? `タスク ${index + 1} の詳細説明` : undefined,
    completed: index % 3 === 0,
    dueDate:
      index % 2 === 0 ? dayjs().add(index, "day").toISOString() : undefined,
    createdAt: dayjs().subtract(index, "day").toISOString(),
    updatedAt: dayjs().subtract(index, "day").toISOString(),
  }));
};

const baseArgs = {
  onToggleComplete: (id: string, completed: boolean) =>
    alert(
      `タスクの完了状態を切り替えました\nID: ${id}\n完了状態: ${completed}`,
    ),
  onDelete: (id: string) => alert(`タスクを削除します\nID: ${id}`),
  onPageChange: (page: number) =>
    alert(`ページを変更します\nページ番号: ${page}`),
};

export const Default: Story = {
  args: {
    ...baseArgs,
    items: generateTodos(3),
    total: 3,
    page: 1,
    limit: 10,
  },
  parameters: {
    msw: {
      handlers: [todoUpdateHandler],
    },
  },
};

export const Empty: Story = {
  args: {
    ...baseArgs,
    items: [],
    total: 0,
    page: 1,
    limit: 10,
  },
};

export const WithPagination: Story = {
  args: {
    ...baseArgs,
    items: generateTodos(10),
    total: 25,
    page: 1,
    limit: 10,
  },
};

export const LastPage: Story = {
  args: {
    ...baseArgs,
    items: generateTodos(5),
    total: 25,
    page: 3,
    limit: 10,
  },
};

export const MixedContent: Story = {
  args: {
    ...baseArgs,
    items: [
      {
        id: "1",
        userId: "user-1",
        title: "長いタイトルのタスク長いタイトルのタスク長いタイトルのタスク",
        description:
          "長い説明文のタスク長い説明文のタスク長い説明文のタスク長い説明文のタスク長い説明文のタスク",
        completed: false,
        dueDate: dayjs().add(1, "day").toISOString(),
        createdAt: dayjs().toISOString(),
        updatedAt: dayjs().toISOString(),
      },
      {
        id: "2",
        userId: "user-1",
        title: "完了済みタスク",
        completed: true,
        createdAt: dayjs().subtract(1, "day").toISOString(),
        updatedAt: dayjs().subtract(1, "day").toISOString(),
      },
      {
        id: "3",
        userId: "user-1",
        title: "期限切れタスク",
        description: "期限切れの説明",
        completed: false,
        dueDate: dayjs().subtract(1, "day").toISOString(),
        createdAt: dayjs().subtract(2, "day").toISOString(),
        updatedAt: dayjs().subtract(2, "day").toISOString(),
      },
    ],
    total: 3,
    page: 1,
    limit: 10,
  },
};
