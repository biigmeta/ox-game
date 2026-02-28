import type { NextFunction, Request, Response } from "express";
import { ok } from "../../utils/http";
import { UserService } from "./user.service";
import { AppError } from "../../middlewares/error_handler.middleware";

export class UserController {
  private userService = new UserService();

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const orderBy = req.query.orderBy as string;
      const direction = req.query.direction === "asc" ? "asc" : "desc";
      const searchTerm = req.query.search as string | undefined;
      const data = await this.userService.findAll({
        page,
        limit,
        orderBy: { [orderBy || "createdAt"]: direction },
        searchTerm,
      });
      res.json(ok(data));
    } catch (err) {
      next(err);
    }
  };

  findByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const data = await this.userService.findById(id as string);

      if (!data) {
        throw new AppError("User not found", 404);
      }

      res.json(ok(data));
    } catch (err) {
      next(err);
    }
  };

  me = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req?.user?.id;
      if (!userId) {
        throw new AppError("User not authenticated", 401);
      }
      const data = await this.userService.me(userId);

      if (!data) {
        throw new AppError("User not found", 404);
      }

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
