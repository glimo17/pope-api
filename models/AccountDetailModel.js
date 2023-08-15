import mongoose from "mongoose";
const AccountDetailSchema = new mongoose.Schema(
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

const AccountDetail = mongoose.model("CustomerAccount", AccountDetailSchema);
export default AccountDetail;
