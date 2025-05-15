import { AuthController } from "@/controllers";
import { authMiddleware } from "@/middlewares";
import { AuthService } from "@/services";
import type { Middleware, Route } from "@/types";
import { Router } from "express";

const authRouter: Router = Router();
const authPath: string = "/auth";
const authService: AuthService = new AuthService();
const authController: AuthController = new AuthController(authService);
const authMiddlewares: Middleware[] = [];

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/me", authMiddleware, authController.me);

const authRoute: Route = {
  path: authPath,
  router: authRouter,
  middlewares: authMiddlewares,
};

export default authRoute;
