import logger from "./logger.util";
import type { Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { ZodError } from "zod";
import { CustomError } from "@/types";

const handleApiError = (err: unknown, res: Response) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      message: err.message,
    });
  } else if (err instanceof ZodError) {
    res.status(400).json({
      message: err.message,
      errors: err.errors,
    });
  } else if (err instanceof JsonWebTokenError) {
    res.status(401).json({
      message: "Unauthorized",
    });
  } else {
    logger.error((err as Error).message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default handleApiError;
