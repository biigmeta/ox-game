import { Router } from "express";
import { AuthenticationController } from "./authentication.controller";
const router = Router();

const authenticationController = new AuthenticationController();

router.post("/register", authenticationController.register);
router.post("/login", authenticationController.login);
router.get("/user/:id", authenticationController.findByUserId);
router.get("/", authenticationController.findAll);
router.delete("/:id", authenticationController.delete);

export default router;
