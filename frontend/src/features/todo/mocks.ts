import { http, HttpResponse } from "msw";

// Todoリストの取得
export const todoListGetHandler = [
  http.get("https://example.com/todos", () => {
    return HttpResponse.json({
      items: [
        {
          id: "c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d",
          userId: "c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d",
          title: "First Todo",
          description: "This is the first todo item.",
          completed: false,
          dueDate: "2024-07-01T00:00:00Z",
          createdAt: "2024-06-01T00:00:00Z",
          updatedAt: "2024-06-01T00:00:00Z",
        },
        {
          id: "a1b2c3d4-5678-90ab-cdef-1234567890ab",
          userId: "c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d",
          title: "Second Todo",
          description: "This is the second todo item.",
          completed: true,
          dueDate: "2024-07-02T00:00:00Z",
          createdAt: "2024-06-02T00:00:00Z",
          updatedAt: "2024-06-02T00:00:00Z",
        },
      ],
      total: 2,
      offset: 0,
      limit: 10,
    });
  }),
];

// Todoの作成
export const todoCreateHandler = [
  http.post("https://example.com/todos", () => {
    return HttpResponse.json(
      {
        id: "abc12345-e89b-12d3-a456-426614174000",
        userId: "123e4567-e89b-12d3-a456-426614174000",
        title: "API設計を完了する",
        description: "TodoアプリのAPI設計を完了させる",
        completed: false,
        dueDate: "2024-05-01T18:00:00Z",
        createdAt: "2024-04-28T09:00:00Z",
        updatedAt: "2024-04-28T09:00:00Z",
      },
      { status: 201 },
    );
  }),
];

// Todoの作成エラー
export const todoCreateErrorHandler = [
  http.post("https://example.com/todos", () => {
    return HttpResponse.json(
      {
        message: "Todoの作成に失敗しました",
      },
      { status: 500 },
    );
  }),
];

// Todoの編集
export const todoEditHandler = [
  http.put(
    "https://example.com/todos/abc12345-e89b-12d3-a456-426614174000",
    () => {
      return HttpResponse.json(
        {
          id: "abc12345-e89b-12d3-a456-426614174000",
          userId: "123e4567-e89b-12d3-a456-426614174000",
          title: "API設計を完了する",
          description: "TodoアプリのAPI設計を完了させる",
          completed: false,
          dueDate: "2024-05-01T18:00:00Z",
          createdAt: "2024-04-28T09:00:00Z",
          updatedAt: "2024-04-28T09:00:00Z",
        },
        { status: 200 },
      );
    },
  ),
];

export const todoHandlers = [
  ...todoListGetHandler,
  ...todoCreateHandler,
  ...todoEditHandler,
];
