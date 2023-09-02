import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import Pedidos from "../models/pedidosModel.js";
import Charges from "../models/chargesModel.js";
import { generateToken, isAuth, isAdmin } from "../utils.js";
import cors from "cors";
import Accounts from "../models/CustomerAccountModel.js";
const pedidosRouter = express.Router();

pedidosRouter.get(
  "/",
  cors(),
  expressAsyncHandler(async (req, res) => {
    const users = await Pedidos.find({})

      .populate("accountId", "-num")
      .populate([{ path: "accountId", populate: { path: "customerId" } }]);

    res.send(users);
  })
);
pedidosRouter.get(
  "/filter/:id",
  expressAsyncHandler(async (req, res) => {
    const users = await Pedidos.find({})
      .where("status")
      .equals(req.params.id)

      .populate("accountId", "-num")
      .populate([{ path: "accountId", populate: { path: "customerId" } }]);

    res.send(users);
  })
);
pedidosRouter.get(
  "/lugar/:id/:lugar",
  expressAsyncHandler(async (req, res) => {
    const users = await Pedidos.find({})
      .where("status")
      .equals(req.params.id)
      .where("lugar")
      .equals(req.params.lugar)
      .populate("accountId", "-num")
      .populate([{ path: "accountId", populate: { path: "customerId" } }]);

    res.send(users);
  })
);
pedidosRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    if (req.params.id) {
      const users = await Pedidos.find({})
        .where("accountId")
        .equals(req.params.id)
        .populate("accountId", "-num")
        .populate([{ path: "accountId", populate: { path: "customerId" } }]);
      res.send(users);
    }
    res.status(404).send({ message: "Not Found" });
  })
);

pedidosRouter.get(
  "/get/:id",
  expressAsyncHandler(async (req, res) => {
    const users = await Pedidos.findById(req.params.id)
      .populate("accountId", "-num")
      .populate([{ path: "accountId", populate: { path: "customerId" } }]);
    res.send(users);
  })
);

pedidosRouter.post(
  "/update2",
  expressAsyncHandler(async (req, res) => {
    const order = await Pedidos.findById(req.body.accountId);
    if (order) {
      order.ammountPay = req.body.ammountPay;
      await order.save();
      res.send({ message: "Procesado" });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

pedidosRouter.post(
  "/status",
  expressAsyncHandler(async (req, res) => {
    const order = await Pedidos.findById(req.body.id);
    console.log(order);
    if (order) {
      order.status = req.body.status;
      const newCustomer = new Charges({
        accountId: order.accountId,
        description: "Pago de prima",
        ammount: order.montoPrima,
        ammountPay: 0,
        status: "Ingresado",
      });
      newCustomer.save();
      await order.save();

      if (req.body.status == "Por Entregar") {
        const account = await Accounts.find({})
          .where("accountId")
          .equals(order.accountId);

        if (account[0]) {
          account[0].ammount =
            Number(account[0].ammount) + Number(order.montoVenta);
          account[0].limit =
            Number(account[0].limit) - Number(order.montoVenta);
          const updatedUser = await account[0].save();
        }
      }
      res.send({ message: "Procesado" });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

pedidosRouter.post(
  "/update",

  expressAsyncHandler(async (req, res) => {
    const customer = await Pedidos.findById(req.body.id);
    if (customer) {
      (customer.ammount = req.body.ammount),
        (customer.montoCosto = req.body.montoCosto),
        (customer.montoPrima = req.body.montoPrima),
        (customer.montoDolar = req.body.montoDolar),
        (customer.montoTipoDolar = req.body.montoCambioDolar),
        (customer.tipoPago = req.body.tipoPago),
        (customer.montoVenta = req.body.montoVenta),
        (customer.detalle = req.body.detalle),
        (customer.tcNum = req.body.tcNum || ""),
        (customer.codigo = req.body.codigo || ""),
        (customer.montoGanancia = req.body.montoGanancia),
        (customer.descuento = req.body.descuento),
        (customer.proveedor = req.body.proveedor),
        (customer.marca = req.body.marca || ""),
        (customer.numFactura = req.body.numFactura || ""),
        (customer.destalle = req.body.destalle),
        (customer.talla = req.body.talla || ""),
        (customer.lugar = req.body.lugar || ""),
        (customer.montoCostoDes =
          req.body.montoCostoDes || customer.montoCostoDes),
        (customer.ammount = req.body.ammount),
        (customer.product = req.body.product || ""),
        (customer.cant = req.body.cant),
        (customer.dateEntrega = req.body.dateEntrega),
        (customer.dateCompra = req.body.dateCompra);

      const updatedUser = await customer.save();
      res.send({ message: "User Updated", user: updatedUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

pedidosRouter.post(
  "/status/",

  expressAsyncHandler(async (req, res) => {
    const customer = await Pedidos.findById(req.params.id);
    if (customer) {
      customer.status = req.body.status;

      const updatedUser = await customer.save();
      res.send({ message: "User Updated", user: updatedUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);
pedidosRouter.post(
  "/",

  expressAsyncHandler(async (req, res) => {
    const account = await Accounts.find({})
      .where("customerId")
      .equals(req.body.customerId);

    if (account[0]) {
      const newCustomer = new Pedidos({
        accountId: account[0]._id,
        ammount: req.body.ammount,
        montoCostoDes: req.body.montoCostoDes,
        montoCosto: req.body.montoCosto,
        montoPrima: req.body.montoPrima,
        link: req.body.link,
        montoDolar: req.body.montoDolar,
        montoTipoDolar: req.body.montoCambioDolar,

        tipoPago: req.body.tipoPago,
        montoVenta: req.body.montoVenta,
        detalle: req.body.detalle,
        tcNum: req.body.tcNum || "",
        codigo: req.body.codigo || "",
        montoGanancia: req.body.montoGanancia,
        descuento: req.body.descuento,
        proveedor: req.body.proveedor,
        marca: req.body.marca || "",
        numFactura: req.body.numFactura || "",
        destalle: req.body.destalle,
        talla: req.body.talla || "",
        lugar: req.body.lugar || "",
        ammount: req.body.ammount,
        product: req.body.product || "",
        status: "Ingresado",
        cant: req.body.cant,
        date: Date.now(),
        dateEntrega: req.body.dateVenta,
        dateCompra: req.body.dateCompra,
      });

      const customer = await newCustomer.save();

      res.send({ message: "Credito Creado", customer });
    }
  })
);
export default pedidosRouter;
