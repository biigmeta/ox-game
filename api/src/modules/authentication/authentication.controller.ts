import type { NextFunction, Request, Response } from "express";
import { ok } from "~/src/utils/http";
import { AuthenticationService } from "./authentication.service";

export class AuthenticationController {
  private authenticationService = new AuthenticationService();
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.authenticationService.register(req.body);
      res.json(ok(data));
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.authenticationService.login(req.body);
      res.json(ok(data));
    } catch (err) {
      next(err);
    }
  }

  async continueWithSocial(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.authenticationService.continueWithSocial(
        req.body
      );
      res.json(ok(data));
    } catch (err) {
      next(err);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.authenticationService.findAll(req.query);
      res.json(ok(data));
    } catch (err) {
      next(err);
    }
  }

  async findByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const data = await this.authenticationService.findByUserId(id as string);
      res.json(ok(data));
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
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
  }
}
