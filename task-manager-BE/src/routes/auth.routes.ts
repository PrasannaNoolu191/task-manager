import { Router } from "express";
import {
  login,
  register,
  updateUserDetails,
} from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate";
import {
  loginSchema,
  registerSchema,
  updateUserSchema,
} from "../validation/auth.schema";
import { upload } from "../middleware/upload-config";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

router.put(
  "/update",
  protect,
  upload.single("avatar"),
  validate(updateUserSchema),
  updateUserDetails,
);

export default router;
