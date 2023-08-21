import mongoose from "mongoose";

const PedidostSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomerAccount",
    },

    product: {
      type: String,
    },

    tipoPago: {
      type: String,
    },

    numFactura: {
      type: String,
    },

    proveedor: {
      type: String,
    },
    Lugar: {
      type: String,
    },
    talla: {
      type: String,
    },
    detalle: {
      type: String,
    },
    montoPrima: {
      type: Number,
    },
    codigo: {
      type: String,
    },
    montoDolar: {
      type: Number,
    },
    descuento: {
      type: Number,
    },
    cant: {
      type: Number,
    },
    montoCosto: {
      type: Number,
 
    },
    montoGanancia: {
      type: Number,

    },
    ammount: {
      type: Number,

    },
    status: {
      type: String,

    },

    date: {
      type: Date,
      default: Date.now,
    },
    dateEntrega: {
      type: Date,
    },

    dateCompra: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
const Pedidos = mongoose.model("Pedidos", PedidostSchema);
export default Pedidos;
