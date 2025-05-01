import { http, HttpResponse } from "msw";

export const todoHandlers = [
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
