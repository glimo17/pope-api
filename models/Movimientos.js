import mongoose from "mongoose";

const MovimoentoSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomerAccount",
    },

    movimientoTipo: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    ammount: {
      type: Number,
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
const Movimientos = mongoose.model("Movimientos", MovimoentoSchema);
export default Movimientos;
