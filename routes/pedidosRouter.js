import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import Pedidos from "../models/pedidosModel.js";
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
    console.log(req.body.accountId);
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
  "/status/:id",
  expressAsyncHandler(async (req, res) => {
    console.log(req.body.accountId);
    const order = await Pedidos.findById(req.body.accountId);
    if (order) {
      order.status = "Procesado";

      await order.save();
      res.send({ message: "Procesado" });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

pedidosRouter.post(
  "/update",

  expressAsyncHandler(async (req, res) => {
    console.log("jjjj");

    const customer = await Pedidos.findById(req.body.id);
    if (customer) {
      (customer.status = customer.status),
        (customer.ammount = req.body.ammount),
        (customer.montoCosto = req.body.montoCosto),
        (customer.montoPrima = req.body.montoPrima),
        (customer.montoDolar = req.body.montoDolar),
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
        (customer.ammount = req.body.ammount),
        (customer.product = req.body.product || ""),
        (customer.cant = req.body.cant),
        (customer.date = Date.now()),
        (customer.dateEntrega = Date.now()),
        (customer.dateCompra = Date.now());

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
    console.log(req.body.lugar);
    console.log(req.body.montoVenta);
    if (account[0]) {
      // account.ammount = Number(account.ammount) + Number(req.body.ammount);
      // account.limit = Number(account.limit) - Number(req.body.ammount);
      // const updatedUser = await account.save();

      const newCustomer = new Pedidos({
        accountId: account[0]._id,
        ammount: req.body.ammount,
        montoCosto: req.body.montoCosto,
        montoPrima: req.body.montoPrima,
        montoDolar: req.body.montoDolar,
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
        dateEntrega: Date.now(),
        dateCompra: Date.now(),
      });
      console.log("va");
      const customer = await newCustomer.save();
      console.log("ya");
      res.send({ message: "Credito Creado", customer });
    }
  })
);
export default pedidosRouter;
