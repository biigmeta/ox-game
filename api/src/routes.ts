import express, { Request, Response } from "express";

/* -------------------------------- location -------------------------------- */
import authenticationRoutes from "./modules/authentication/authentication.routes";
import historyRoutes from "./modules/history/history.routes";
// import provinceRoutes from "~/modules/province/province.routes";
// import districtRoutes from "~/modules/district/district.routes";
// import subdistrictRoutes from "~/modules/subdistrict/subdistrict.routes";
// import adminRoutes from "~/modules/admin/admin.routes";
// import customerRoutes from "~/modules/customer/customer.routes";
// import roundRoutes from "~/modules/round/round.routes";
// import ticketRoutes from "~/modules/ticket/ticket.routes";
// import betRoutes from "~/modules/bet/bet.routes";
// import lottoRoutes from "~/modules/lotto/lotto.routes";
// import rewardRoutes from "~/modules/reward/reward.routes";
// import winnerRoutes from "~/modules/winner/winner.routes";
const routes = express.Router();

// ---  GET / --- //
routes.get("/", (req: Request, res: Response) => {
  res.send(`Welcome to the ${process.env.APP_NAME || "API"}`);
});

routes.use("/auth", authenticationRoutes);
routes.use("/histories", historyRoutes);
// routes.use("/provinces", provinceRoutes);
// routes.use("/districts", districtRoutes);
// routes.use("/subdistricts", subdistrictRoutes);
// routes.use("/admins", adminRoutes);
// routes.use("/customers", customerRoutes);
// routes.use("/rounds", roundRoutes);
// routes.use("/tickets", ticketRoutes);
// routes.use("/bets", betRoutes);
// routes.use("/lotto", lottoRoutes);
// routes.use("/rewards", rewardRoutes);
// routes.use("/winners", winnerRoutes);

export default routes;
