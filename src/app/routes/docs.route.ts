import swaggerDocument from "@/docs/swagger.json";
import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import type { Route } from "@/types";

const docsRouter: Router = Router();
const docsPath: string = "/docs";

docsRouter.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const docsRoute: Route = {
  path: docsPath,
  router: docsRouter,
};

export default docsRoute;
