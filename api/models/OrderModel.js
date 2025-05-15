const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

const OrderSchema = new mongoose.Schema(
  {
    consumer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [OrderItemSchema],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed", "cancelled"],
      default: "pending",
    },
    pickupDetails: {
      date: Date,
      time: String,
      location: String,
    },
    deliveryDetails: {
      address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
      },
      date: Date,
      time: String,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "bank_transfer", "other"],
      default: "cash",
    },
    notes: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
