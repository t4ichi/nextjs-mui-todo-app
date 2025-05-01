import type { z } from "zod";

export type TodoResponse = z.infer<typeof Todo>;
