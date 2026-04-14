// src/routes/qoe.route.js
import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { submitFeedback, submitTelemetry } from "../controllers/qoe.controller.js";

const router = express.Router();

// protect all QoE endpoints
router.use(protectRoute);

router.post("/feedback", submitFeedback);
router.post("/telemetry", submitTelemetry);

export default router;
