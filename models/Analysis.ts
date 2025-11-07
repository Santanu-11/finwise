import { Schema, models, model } from "mongoose";

const AnalysisSchema = new Schema(
  {
    userId: { type: String, required: true },
    monthKey: { type: String, required: true }, // e.g. "2025-11"
    checksum: { type: String, required: true },
    result: { type: Object, required: true },
  },
  { timestamps: true }
);

// Create an index to prevent duplicates
AnalysisSchema.index({ userId: 1, monthKey: 1, checksum: 1 }, { unique: true });

const Analysis = models.Analysis || model("Analysis", AnalysisSchema);
export default Analysis;
