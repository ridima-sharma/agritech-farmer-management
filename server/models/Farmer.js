// Farmer Profile Model Schema for MongoDB / Mongoose
export const FarmerSchemaDefinition = {
  name: {
    type: String,
    required: true,
    default: "Rajesh Kumar Patel",
  },
  role: {
    type: String,
    default: "Farm Owner & Lead Producer",
  },
  farmName: {
    type: String,
    default: "Green Valley Agro Farm",
  },
  location: {
    type: String,
    default: "Plot 14-B, Kisan Nagar, Pune",
  },
  totalAcreage: {
    type: String,
    default: "12.5 Acres",
  },
  soilType: {
    type: String,
    default: "Black Cotton / Clayey Loam",
  },
  irrigationSource: {
    type: String,
    default: "Tube well with Solar Pump & Drip Line",
  },
};

let FarmerModel = null;
try {
  const mongoose = await import("mongoose");
  if (mongoose.default && mongoose.default.Schema) {
    const schema = new mongoose.default.Schema(FarmerSchemaDefinition, { timestamps: true });
    FarmerModel = mongoose.default.models.Farmer || mongoose.default.model("Farmer", schema);
  }
} catch {
  // Mongoose not installed or loaded
}

export default FarmerModel;
