import type { NextFunction, Request, Response } from "express";
import { ok } from "~/utils/http";
import { HistorieService } from "./history.service";

export class HistorieController {
  private historieService = new HistorieService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.historieService.create(req.body);
      res.json(ok(data));
    } catch (err) {
      next(err);
    }
  };

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.historieService.findAll(req.query);
      res.json(ok(data));
    } catch (err) {
      next(err);
    }
  }

  findByHistorieId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const data = await this.historieService.findById(id as string);
      res.json(ok(data));
    } catch (err) {
      next(err);
    }
  }

  findByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const data = await this.historieService.findByUserId(id as string);
      res.json(ok(data));
    } catch (err) {
      next(err);
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const permanent = req.query.permanent === "true";
      permanent
        ? await this.historieService.hardDelete(id as string)
        : await this.historieService.softDelete(id as string);
      res.json(ok({ message: "Historie deleted successfully" }));
    } catch (err) {
      next(err);
    }
  }
}
