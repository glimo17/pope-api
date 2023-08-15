import mongoose from "mongoose";

const CustomerAccountSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customers",
    },

    num: {
      type: Number,
      required: false,
    },

    ammount: {
      type: Number,
    },
    limit: {
      type: Number,
      required: false,
    },

    date: {
      type: Date,
      default: Date.now,
    }
  },
  {
    timestamps: true,
  }
);
const Accounts = mongoose.model("CustomerAccount", CustomerAccountSchema);
export default Accounts;
