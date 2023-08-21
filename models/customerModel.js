import mongoose from "mongoose";

const customersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: false, unique: false },
    phone: { type: String, required: false, unique: false },
    canton: { type: String, required: false, unique: false },
    direc: { type: String, required: false, unique: false },
    fechaNacimiento: { type: date, required: false, unique: false },
    oficio: { type: String, required: false, unique: false },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customers", customersSchema);
export default Customer;
