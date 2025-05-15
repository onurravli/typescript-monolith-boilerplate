import type { NextFunction, Request, Response } from "express";
import { CustomError, type Middleware } from "@/types";
import { handleApiError, jwt, prisma } from "@/utils";

const authMiddleware: Middleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new CustomError(401, "Unauthorized");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });
    if (!user) {
      throw new CustomError(401, "Unauthorized");
    }
    res.locals.user = user;
    next();
  } catch (err) {
    handleApiError(err, res);
  }
};

export default authMiddleware;
