import mongoose from "mongoose";

const customersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: false, unique: false },
    phone: { type: String, required: false, unique: false },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customers", customersSchema);
export default Customer;
