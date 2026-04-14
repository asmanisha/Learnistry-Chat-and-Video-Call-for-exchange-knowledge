import express from "express";
import { verifyExpertise } from "../controllers/verification.controller.js";
import { completeOnboarding } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// combine verification + onboarding
router.post(
  "/verify",
  protectRoute,
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "certificate", maxCount: 1 },
  ]),
  verifyExpertise
);

export default router;
