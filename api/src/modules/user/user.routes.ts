import { Router } from "express";
import { UserController } from "./user.controller";
import { userAuthorization } from "../../middlewares/authorization.middleware";
const router = Router();

const userController = new UserController();

router.get("/", userAuthorization, userController.findAll);
router.get("/me", userAuthorization, userController.me);
router.get("/:id", userAuthorization, userController.findByUserId);
router.delete("/:id", userAuthorization, userController.delete);

export default router;
