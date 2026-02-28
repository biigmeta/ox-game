import type { NextFunction, Request, Response } from "express";
import { ok } from "~/utils/http";
import { UserService } from "./user.service";

export class UserController {
  private userService = new UserService();

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.userService.findAll(req.query);
      res.json(ok(data));
    } catch (err) {
      next(err);
    }
  };

  findByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const data = await this.userService.findById(id as string);
      res.json(ok(data));
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const permanent = req.query.permanent === "true";
      permanent
        ? await this.userService.hardDelete(id as string)
        : await this.userService.softDelete(id as string);
      res.json(ok({ message: "User deleted successfully" }));
    } catch (err) {
      next(err);
    }
  };
}
