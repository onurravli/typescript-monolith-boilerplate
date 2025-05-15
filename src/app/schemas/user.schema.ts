import { z } from "zod";

const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  surname: z.string().min(1),
  email: z.string().email(),
  username: z.string().min(1),
  password: z.string().min(8),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});

const createUserSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const updateUserSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export { createUserSchema, loginUserSchema, updateUserSchema, userSchema };
