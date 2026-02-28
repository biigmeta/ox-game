import { Router } from "express";
import { UserController } from "./user.controller";
import { userAuthorization } from "../../middlewares/authorization.middleware";
const router = Router();

const userController = new UserController();

router.get("/", userController.findAll);
router.get("/me", userAuthorization, userController.me);
router.get("/:id", userController.findByUserId);
router.delete("/:id", userController.delete);

export default router;
