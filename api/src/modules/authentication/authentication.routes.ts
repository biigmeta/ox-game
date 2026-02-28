import { Router } from "express";
import { AuthenticationController } from "./authentication.controller";
import { userAuthorization } from "~/middlewares/authorization.middleware";
const router = Router();

const authenticationController = new AuthenticationController();

router.post("/register", authenticationController.register);
router.post("/login", authenticationController.login);
router.post(
  "/social-login/:provider",
  authenticationController.continueWithSocial
);
router.get("/me", userAuthorization, authenticationController.me);
router.get("/user/:id", authenticationController.findByUserId);
router.get("/", authenticationController.findAll);
router.delete("/:id", authenticationController.delete);

export default router;
