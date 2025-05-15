import type { Router } from "express";
import type { Middleware } from "@/types";

type Route = {
  router: Router;
  path: string;
  middlewares?: Middleware[];
};

export default Route;
