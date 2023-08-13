import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import Pedidos from "../models/pedidosModel.js";
import { generateToken, isAuth, isAdmin } from "../utils.js";
import cors from "cors";
const pedidosRouter = express.Router();

pedidosRouter.get(
  "/",
  cors(),
  expressAsyncHandler(async (req, res) => {
    console.log("jeank");
    const users = await Pedidos.find({})

      .populate("accountId", "-num")
      .populate([{ path: "accountId", populate: { path: "customerId" } }]);

    res.send(users);
  })
);

pedidosRouter.post(
  "/update",
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
  "/",

  expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const users = await Pedidos.find({});
    console.log(req.body.ammount);
    const newCustomer = new Pedidos({
      accountId: req.body.accountId,
      ammount: req.body.ammount,
      product: req.body.product,
      cant: req.body.cant,
      date: Date.now(),
    });
    const customer = await newCustomer.save();
    res.send({ message: "Credito Creado", customer });
  })
);
export default pedidosRouter;