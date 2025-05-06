import type { Meta, StoryObj } from "@storybook/react";
import { DialogsProvider } from "@toolpad/core/useDialogs";
import { TodoCreateButton } from "./todo-create-button";

const meta: Meta<typeof TodoCreateButton> = {
  title: "features/todo/components/todo-create-button",
  component: TodoCreateButton,
  decorators: [
    (Story) => (
      <DialogsProvider>
        <Story />
      </DialogsProvider>
    ),
  ],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof TodoCreateButton>;

export const Default: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
