// src/controllers/qoe.controller.js
import QoE from "../models/QoE.js";

export async function submitFeedback(req, res) {
  try {
    const { callId, rating, reason = "", metadata = {} } = req.body;
    if (!callId || (rating == null)) return res.status(400).json({ message: "callId and rating required" });

    const doc = await QoE.create({
      user: req.user?._id || null,
      callId,
      rating,
      reason,
      metadata,
    });

    res.status(201).json(doc);
  } catch (error) {
    console.error("submitFeedback error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function submitTelemetry(req, res) {
  try {
    const { callId, ...rest } = req.body;
    if (!callId) return res.status(400).json({ message: "callId required" });

    // Save telemetry as a QoE document with rating null
    const doc = await QoE.create({
      user: req.user?._id || null,
      callId,
      rating: null,
      reason: "telemetry",
      metadata: rest,
    });

    res.status(201).json(doc);
  } catch (error) {
    console.error("submitTelemetry error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
