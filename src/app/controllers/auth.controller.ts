import { createUserSchema, loginUserSchema } from "@/schemas";
import type { AuthService } from "@/services";
import { handleApiError } from "@/utils";
import type { Request, Response } from "express";

class AuthController {
  constructor(private readonly authService: AuthService) {
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }
  public async register(req: Request, res: Response) {
    try {
      const body = createUserSchema.parse(req.body);
      const user = await this.authService.register(body);
      res.status(201).json({ user });
    } catch (err) {
      handleApiError(err, res);
    }
  }
  public async login(req: Request, res: Response) {
    try {
      const body = loginUserSchema.parse(req.body);
      const { user, tokens } = await this.authService.login(body);
      res.status(200).json({ user, tokens });
    } catch (err) {
      handleApiError(err, res);
    }
  }
  public async me(req: Request, res: Response) {
    try {
      const id = res.locals.user.id;
      const user = await this.authService.me(id);
      res.status(200).json({ user });
    } catch (err) {
      handleApiError(err, res);
    }
  }
}

export default AuthController;
