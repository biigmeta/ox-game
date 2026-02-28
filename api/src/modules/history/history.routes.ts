import { Router } from "express";
import { HistorieController } from "./history.controller";
import { userAuthorization } from "../../middlewares/authorization.middleware";
const router = Router();

const historieController = new HistorieController();

router.post("/", userAuthorization, historieController.create);
router.get("/", historieController.findAll);
router.get("/summary", historieController.summary);
router.get("/:id", historieController.findByHistorieId);
router.get("/user/:id", historieController.findByUserId);
router.delete("/:id", historieController.delete);

export default router;
