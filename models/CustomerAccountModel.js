import mongoose from "mongoose";
const AcciuntDetailSchema = new mongoose.Schema(
  {
    date: { type: Date, required: false },
    freq: { type: String, required: false },
    day: { type: Number, required: false },
    dateIni: { type: Number, required: false },
  },
  {
    timestamps: true,
  }
);
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
    },
    detail: { AcciuntDetailSchema },
  },
  {
    timestamps: true,
  }
);
const Accounts = mongoose.model("CustomerAccount", CustomerAccountSchema);
export default Accounts;
