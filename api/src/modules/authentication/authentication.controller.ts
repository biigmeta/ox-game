import type { NextFunction, Request, Response } from "express";
import { AppError } from "~/middlewares/error_handler.middleware";
import { AuthenticationService } from "~/modules/authentication/authentication.service";
import { AuthProviderType } from "~/types/auth";
import { ok } from "~/utils/http";


export class AuthenticationController {
  private authenticationService = new AuthenticationService();

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const data = await this.authenticationService.register(body);
      res.json(ok(data));
    } catch (err) {
      next(err);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.authenticationService.login(req.body);
      res.json(ok(data));
    } catch (err) {
      next(err);
    }
  };

  continueWithSocial = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const provider = req.params.provider;

    try {
      const data = await this.authenticationService.continueWithSocial(
        provider as AuthProviderType,
        req.body
      );
      res.json(ok(data));
    } catch (err) {
      next(err);
    }
  };

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.authenticationService.findAll(req.query);
      res.json(ok(data));
    } catch (err) {
      next(err);
    }
  };

  findByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const data = await this.authenticationService.findByUserId(id as string);
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
      const data = await this.authenticationService.findByUserId(userId);
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
        ? await this.authenticationService.hardDelete(id as string)
        : await this.authenticationService.softDelete(id as string);
      res.json(ok({ message: "Authentication deleted successfully" }));
    } catch (err) {
      next(err);
    }
  };
}
