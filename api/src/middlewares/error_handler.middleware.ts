import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({ status: "error", code: err.code });
  }

  return res
    .status(500)
    .json({ status: "error", code: "INTERNAL_SERVER_ERROR" });
};

export class AppError extends Error {
  constructor(
    public readonly code: string,
    public readonly status: number = 500
  ) {
    super(code);
  }
}
