import mongoose from "mongoose";

const customersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: false, unique: false },
    phone: { type: String, required: false, unique: false },
    canton: { type: String, required: false, unique: false },
    direc: { type: String, required: false, unique: false },
    fechaNacimiento: { type: Date, required: false, unique: false },
    oficio: { type: String, required: false, unique: false },
    tipo: { type: String, required: false, unique: false },
    frec: { type: String, required: false, unique: false },
    dateConfig: { type: Date, required: false, unique: false },
    dayPay: { type: Number, required: false, unique: false },
    dayPay2: { type: Number, required: false, unique: false },
    dateFirstPay: { type: Date, required: false, unique: false },
    dayString: { type: String, required: false, unique: false },
    montoCuota: { type: Number, required: false, unique: false },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customers", customersSchema);
export default Customer;
