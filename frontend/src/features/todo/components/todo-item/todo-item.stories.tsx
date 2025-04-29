import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { TodoItem } from "./todo-item";

const meta = {
  title: "features/todo/components/TodoItem",
  component: TodoItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onToggleComplete: { action: "onToggleComplete" },
    onEdit: { action: "onEdit" },
    onDelete: { action: "onDelete" },
  },
} satisfies Meta<typeof TodoItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseArgs = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  title: "プロジェクトの計画を立てる",
  createdAt: new Date().toISOString(),
  onToggleComplete: action("onToggleComplete"),
  onEdit: action("onEdit"),
  onDelete: action("onDelete"),
};

export const Default: Story = {
  args: {
    ...baseArgs,
    completed: false,
  },
};

export const WithDescription: Story = {
  args: {
    ...baseArgs,
    completed: false,
    description: "プロジェクトの目標、スケジュール、必要なリソースを明確にする",
  },
};

export const Completed: Story = {
  args: {
    ...baseArgs,
    completed: true,
    description: "プロジェクトの目標、スケジュール、必要なリソースを明確にする",
  },
};

export const WithDueDate: Story = {
  args: {
    ...baseArgs,
    completed: false,
    description: "プロジェクトの目標、スケジュール、必要なリソースを明確にする",
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 明日
  },
};

export const PastDueDate: Story = {
  args: {
    ...baseArgs,
    completed: false,
    description: "プロジェクトの目標、スケジュール、必要なリソースを明確にする",
    dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 昨日
  },
};

export const LongContent: Story = {
  args: {
    ...baseArgs,
    title:
      "これは非常に長いタイトルです。長いタイトルがどのように表示されるかを確認するためのテストケースです。",
    description:
      "これは非常に長い説明文です。長い説明文がどのように表示されるかを確認するためのテストケースです。複数行になる場合の表示を確認します。これは非常に長い説明文です。長い説明文がどのように表示されるかを確認するためのテストケースです。",
    completed: false,
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  },
};
