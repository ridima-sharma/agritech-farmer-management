// Crop Model Schema for MongoDB / Mongoose
export const CropSchemaDefinition = {
  name: {
    type: String,
    required: [true, "Crop name is required"],
    trim: true,
  },
  category: {
    type: String,
    enum: ["Cereals", "Oilseeds", "Pulses", "Commercial", "Vegetables", "Horticulture", "Other"],
    default: "Cereals",
  },
  area: {
    type: String,
    required: [true, "Cultivated area is required"],
  },
  season: {
    type: String,
    enum: ["Kharif", "Rabi", "Zaid"],
    default: "Rabi",
  },
  plantingDate: {
    type: String,
    default: () => new Date().toISOString().split("T")[0],
  },
  expectedHarvest: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["Planted", "Growing", "Ready for Harvest", "Harvesting", "Completed"],
    default: "Growing",
  },
  health: {
    type: String,
    enum: ["Healthy", "Optimal", "Needs Water", "Needs Attention", "Pest Risk"],
    default: "Healthy",
  },
  estimatedYield: {
    type: String,
    default: "",
  },
  notes: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
};

// Safe Mongoose model export (if mongoose is available in runtime)
let CropModel = null;
try {
  const mongoose = await import("mongoose");
  if (mongoose.default && mongoose.default.Schema) {
    const schema = new mongoose.default.Schema(CropSchemaDefinition, { timestamps: true });
    CropModel = mongoose.default.models.Crop || mongoose.default.model("Crop", schema);
  }
} catch {
  // Mongoose not installed or loaded; schema definition remains exported
}

export default CropModel;
