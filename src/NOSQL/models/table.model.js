const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    status: {
      type: String,
      enum: ["PENDING", "COMPLETED"],
      default: "PENDING",
    },
    feedback: {
      type: String,
    },
    rating: {
      type: Number,
    },
    userCode: {
      type: String,
    },
  },
  { timestamps: true }
);

tableSchema.virtual("createdBy", {
  ref: "user",
  localField: "userCode",
  foreignField: "email",
  justOne: true,
});

tableSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

module.exports = mongoose.model("table", tableSchema);
