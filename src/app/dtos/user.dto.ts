import type {
  createUserSchema,
  loginUserSchema,
  updateUserSchema,
} from "@/schemas";
import type { z } from "zod";

type CreateUserDto = z.infer<typeof createUserSchema>;
type UpdateUserDto = z.infer<typeof updateUserSchema>;
type LoginUserDto = z.infer<typeof loginUserSchema>;

export { CreateUserDto, LoginUserDto, UpdateUserDto };
