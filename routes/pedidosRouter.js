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
    console.log("jjjj");
    console.log(req.params.id);
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
  "/makeCharge",
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
    console.log("account[0]");
    const account = await Accounts.find({})
      .where("customerId")
      .equals(req.body.customerId);
    console.log(account[0]);
    if (account[0]) {
      // account.ammount = Number(account.ammount) + Number(req.body.ammount);
      // account.limit = Number(account.limit) - Number(req.body.ammount);
      // const updatedUser = await account.save();
      const pedido = await Pedidos.findById(req.body.id);
      const newCustomer = new Pedidos({
        accountId: account[0]._id,
        ammount: req.body.ammount || pedido.ammount,
        montoCosto: req.body.montoCosto || pedido.montoCosto,
        montoPrima: req.body.montoPrima || pedido.montoPrima,
        montoDolar: req.body.montoDolar || pedido.montoDolar,
        tcNum: req.body.tcNum || pedido.tcNum,
        montoGanancia: req.body.montoGanancia,
        descuento: req.body.descuento,
        proveedor: req.body.proveedor,
        marca: req.body.marca || "" || pedido.marca,
        destalle: req.body.destalle || pedido.detalle,
        talla: req.body.talla || "" || pedido.talla,
        lugar: req.body.lugar || "" || pedido.lugar,
        product: req.body.product || "" || pedido.product,
        status: "Ingresado",
        cant: req.body.cant || pedido.cant,
        dateEntrega: req.body.dateEntrega,
        dateCompra: req.body.dateCompra,
      });
      console.log("va");
      const customer = await newCustomer.save();
      console.log("ya");
      res.send({ message: "Credito Creado", customer });
    }
  })
);

pedidosRouter.post(
  "/",

  expressAsyncHandler(async (req, res) => {
    const account = await Accounts.find({})
      .where("customerId")
      .equals(req.body.customerId);
    console.log(account[0]);
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
        tcNum: req.body.tcNum || "",
        montoGanancia: req.body.montoGanancia,
        descuento: req.body.descuento,
        proveedor: req.body.proveedor,
        marca: req.body.marca || "",
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
