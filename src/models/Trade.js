// src/models/Trade.js
import mongoose from "mongoose";
import Counter from "./Counter.js";

const tradeSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  type: {
    type: String,
    enum: ["buy", "sell"],
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  symbol: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
  shares: {
    type: Number,
    required: true,
    min: 1,
    max: 100,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
}, {
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      ret.id = doc.id;
      ret.timestamp = doc.createdAt.getTime();
      delete ret._id;
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
    },
  },
});

// Auto-increment ID middleware
tradeSchema.pre("save", async function(next) {
  if (!this.isNew) {
    return next();
  }
  
  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "tradeId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    
    this.id = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model("Trade", tradeSchema);