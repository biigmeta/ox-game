import { ZodType } from "zod";
import { Request, Response, NextFunction } from "express";

export const zodValidate =
  (schema: ZodType, where: "body" | "query" | "params" = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req[where]);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors:
          process.env.NODE_ENV === "development" ? parsed.error.flatten() : {},
      });
    }
    (req as any)[where] = parsed.data;
    next();
  };
