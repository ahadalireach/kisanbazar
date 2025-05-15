const mongoose = require("mongoose");

const FarmerProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    farmName: {
      type: String,
      required: [true, "Please add a farm name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    farmImages: [String],
    farmingPractices: [String],
    establishedYear: Number,
    socialMedia: {
      facebook: String,
      instagram: String,
      twitter: String,
    },
    businessHours: {
      monday: { open: String, close: String },
      tuesday: { open: String, close: String },
      wednesday: { open: String, close: String },
      thursday: { open: String, close: String },
      friday: { open: String, close: String },
      saturday: { open: String, close: String },
      sunday: { open: String, close: String },
    },
    acceptsPickup: {
      type: Boolean,
      default: false,
    },
    acceptsDelivery: {
      type: Boolean,
      default: false,
    },
    deliveryRadius: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FarmerProfile", FarmerProfileSchema);
