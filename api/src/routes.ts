import express, { Request, Response } from "express";

/* -------------------------------- location -------------------------------- */
import authenticationRoutes from "./modules/authentication/authentication.routes";
import userRoutes from "./modules/user/user.routes";
import historyRoutes from "./modules/history/history.routes";
const routes = express.Router();

// ---  GET / --- //
routes.get("/", (req: Request, res: Response) => {
  res.send(`Welcome to the ${process.env.APP_NAME || "API"}`);
});

routes.use("/auth", authenticationRoutes);
routes.use("/users", userRoutes);
routes.use("/histories", historyRoutes);

export default routes;
