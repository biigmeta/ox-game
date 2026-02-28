import { NextFunction, Request, Response } from "express";
import { decodeAccessToken } from "../utils/jwt";
import { Jwt } from "jsonwebtoken";
import { AppError } from "./error_handler.middleware";
import { AuthProviderType } from "~/types/auth";


// Middleware to check if the user is authorized
export const userAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (!user) {
    next(new AppError("Unauthorized", 401));
    return;
  }

  next();
};

export const adminAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const allowedRoles = ["admin"];

  if (!allowedRoles.includes(user?.role as AuthProviderType)) {
    next(new AppError("Permisson denied", 403));
    return;
  }

  next();
};

export const authIntercept = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headerAuthorization = req.headers["authorization"];
  if (!headerAuthorization) {
    next();
    return;
  }

  const token = headerAuthorization.split(" ")[1];
  const payload = await decodeAccessToken(token);

  if (payload instanceof Error) {
    next();
    return;
  }

  if ((payload as Jwt).hasOwnProperty("name")) {
    const errorPayload = payload as Error;
    next();
    return;
  }
  req.user = payload as any;

  next();
};
