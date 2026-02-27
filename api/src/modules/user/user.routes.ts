import { Router } from "express";
import { UserController } from "./user.controller";
const router = Router();

const userController = new UserController();

router.get("/", userController.findAll);
router.get("/:id", userController.findByUserId);
router.delete("/:id", userController.delete);

export default router;
