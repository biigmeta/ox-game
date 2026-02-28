import { Router } from "express";
import { HistorieController } from "./history.controller";
import {
  adminAuthorization,
  userAuthorization,
} from "../../middlewares/authorization.middleware";
const router = Router();

const historieController = new HistorieController();

router.post("/", userAuthorization, historieController.create);
router.get("/", adminAuthorization, historieController.findAll);
router.get("/summary", adminAuthorization, historieController.summary);
router.get("/:id", adminAuthorization, historieController.findByHistorieId);
router.get("/user/:id", adminAuthorization, historieController.findByUserId);
router.delete("/:id", adminAuthorization, historieController.delete);

export default router;
