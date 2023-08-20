import mongoose from "mongoose";

const PedidostSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomerAccount",
    },

    product: {
      type: String,
      required: true,
    },

    cant: {
      type: Number,
    },
    ammount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
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
const Pedidos = mongoose.model("Pedidos", PedidostSchema);
export default Pedidos;
