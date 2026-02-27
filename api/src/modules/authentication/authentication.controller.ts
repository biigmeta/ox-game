import type { NextFunction, Request, Response } from "express";

import { AuthenticationService } from "~/modules/authentication/authentication.service";
import { ok } from "~/utils/http";

export class AuthenticationController {
  private authenticationService = new AuthenticationService();

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;

      if (
        body.acceptTermsAndConditions === false ||
        body.acceptPrivacyPolicy === false ||
        !body.acceptTermsAndConditions ||
        !body.acceptPrivacyPolicy
      ) {
        throw new Error(
          "You must accept the terms and conditions and privacy policy to register."
        );
      }

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
    try {
      const data = await this.authenticationService.continueWithSocial(
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
