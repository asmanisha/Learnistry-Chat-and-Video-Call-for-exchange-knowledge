// src/models/QoE.js
import mongoose from "mongoose";

const QoESchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    callId: { type: String, required: true },
    rating: { type: Number, required: false }, // null for telemetry-only docs
    reason: { type: String, default: "" },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

const QoE = mongoose.model("QoE", QoESchema);
export default QoE;
