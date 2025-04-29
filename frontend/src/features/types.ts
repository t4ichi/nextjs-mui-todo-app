import type { getTodoResponse } from "@/libs/orval/todos/todos";
import type { z } from "zod";

export type TodoResponse = z.infer<typeof getTodoResponse>;
