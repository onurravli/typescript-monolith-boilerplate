import type { Middleware } from "@/types";
import type { Router } from "express";

type Route = {
  router: Router;
  path: string;
  middlewares?: Middleware[];
};

export default Route;
