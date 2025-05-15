import { authRoute, docsRoute } from "@/routes";
import type { Middleware, Route } from "@/types";
import { logger, prisma } from "@/utils";
import cors from "cors";
import type { Application } from "express";
import express from "express";

const app: Application = express();

const bootstrap = async () => {
  const middlewares: Middleware[] = [
    express.json(),
    express.urlencoded({ extended: true }),
    cors(),
  ];
  const routes: Route[] = [authRoute, docsRoute];
  middlewares.forEach((middleware) => {
    app.use(middleware);
  });
  logger.info("Middlewares loaded");
  routes.forEach((route) => {
    route.middlewares?.forEach((middleware) => {
      route.router.use(middleware);
    });
    app.use(route.path, route.router);
  });
  logger.info("Routes loaded");
  await prisma.$connect();
  logger.success("Connected to database successfully");
};

bootstrap();

export default app;
