// import { NextFunction, Request, Response } from "express";
// import { decodeAccessToken } from "../utils/jwt";
// import { $Enums } from "@prisma/client";
// import { ApiError } from "~/utils/http";
// import { Jwt } from "jsonwebtoken";
// import { IAdmin } from "~/types/admin";

// declare global {
//   namespace Express {
//     interface Request {
//       admin?: IAdmin;
//     }
//   }
// }

// // Middleware to check if the user is authorized
// export const userAuthorization = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authorize = await getHeaderAuthorization(req);

//   if (authorize.status === "error") {
//     next(new ApiError(401, authorize.message || "Unauthorized"));
//     return;
//   }

//   next();
// };

// export const adminAuthorization = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authorize = await getHeaderAuthorization(req);

//   if (authorize.status === "error") {
//     next(new ApiError(401, authorize.message || "Unauthorized"));
//     return;
//   }

//   const admin = req.admin;

//   const allowedRoles = [
//     $Enums.AdminRole.admin,
//     $Enums.AdminRole.superAdmin,
//   ] as $Enums.AdminRole[];

//   if (!allowedRoles.includes(admin?.role as $Enums.AdminRole)) {
//     next(new ApiError(403, "Permisson denied"));
//     return;
//   }

//   next();
// };

// export const superAdminAuthorization = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authorize = await getHeaderAuthorization(req);

//   if (authorize.status === "error") {
//     next(new ApiError(401, authorize.message || "Unauthorized"));
//     return;
//   }

//   const admin = req.admin;

//   const allowedRoles = [$Enums.AdminRole.superAdmin] as $Enums.AdminRole[];

//   if (!allowedRoles.includes(admin?.role as $Enums.AdminRole)) {
//     next(new ApiError(403, "Permisson denied"));
//     return;
//   }

//   next();
// };

// const getHeaderAuthorization = async (req: Request) => {
//   // check from header when ENV is production
//   const headerAuthorization = req.headers["authorization"];

//   if (!headerAuthorization) {
//     return {
//       status: "error",
//       message: "Invalid request",
//     };
//   }

//   const token = headerAuthorization.split(" ")[1];

//   // decode the token
//   const payload = await decodeAccessToken(token);

//   if (payload instanceof Error) {
//     return {
//       status: "error",
//       message: "Invalid token",
//     };
//   }

//   if ((payload as Jwt).hasOwnProperty("name")) {
//     const errorPayload = payload as Error;
//     return {
//       status: "error",
//       message: errorPayload.message || "Invalid token",
//     };
//   }

//   // attach the user to the request object
//   req.admin = payload as any;

//   return {
//     status: "ok",
//     payload: payload,
//   };
// };
