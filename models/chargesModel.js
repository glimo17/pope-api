import mongoose from "mongoose";

const ChargesSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomerAccount",
    },

    description: {
      type: Number,
      required: true,
    },

    ammount: {
      type: Number,
    },
    ammountPay: {
      type: Number,
    },
    status: {
      type: String,
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
const Charges = mongoose.model("Charges", ChargesSchema);
export default Charges;
