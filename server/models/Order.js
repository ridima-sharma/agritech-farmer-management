// Order Model Schema for MongoDB / Mongoose
export const OrderSchemaDefinition = {
  orderNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  cropName: {
    type: String,
    required: [true, "Crop name is required"],
    trim: true,
  },
  buyerName: {
    type: String,
    required: [true, "Buyer name is required"],
    trim: true,
  },
  buyerPhone: {
    type: String,
    default: "",
    trim: true,
  },
  quantity: {
    type: String,
    required: [true, "Quantity is required"],
  },
  ratePerUnit: {
    type: Number,
    required: [true, "Rate per unit is required"],
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: String,
    default: () => new Date().toISOString().split("T")[0],
  },
  deliveryDate: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Dispatched", "Delivered", "Cancelled"],
    default: "Confirmed",
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Partial", "Paid"],
    default: "Pending",
  },
  destination: {
    type: String,
    default: "Local APMC Mandi",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
};

let OrderModel = null;
try {
  const mongoose = await import("mongoose");
  if (mongoose.default && mongoose.default.Schema) {
    const schema = new mongoose.default.Schema(OrderSchemaDefinition, { timestamps: true });
    OrderModel = mongoose.default.models.Order || mongoose.default.model("Order", schema);
  }
} catch {
  // Mongoose not installed or loaded
}

export default OrderModel;
