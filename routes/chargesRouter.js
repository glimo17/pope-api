import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import Charges from "../models/chargesModel.js";
import { generateToken, isAuth, isAdmin } from "../utils.js";
import cors from "cors";
const chargesRouter = express.Router();

chargesRouter.get(
  "/",
  cors(),
  expressAsyncHandler(async (req, res) => {
    const users = await Charges.find({})

      .populate("accountId", "-num")
      .populate([{ path: "accountId", populate: { path: "customerId" } }]);

    res.send(users);
  })
);

chargesRouter.post(
  "/update",
  expressAsyncHandler(async (req, res) => {
    console.log(req.body.accountId);
    const order = await Charges.findById(req.body.accountId);
    if (order) {
      order.ammountPay = req.body.ammountPay;
      await order.save();
      res.send({ message: "Procesado" });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

chargesRouter.post(
  "/makeCharge",
  expressAsyncHandler(async (req, res) => {
    console.log(req.body._id);
    const order = await Charges.findById(req.body._id);
    if (order) {
      order.status = "Procesado";

      await order.save();
      res.send({ message: "Procesado" });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);
chargesRouter.post(
  "/",

  expressAsyncHandler(async (req, res) => {
    const users = await Accounts.find({});
    console.log(req.body.ammount);
    const newCustomer = new Charges({
      customerId: req.body.customerId,
      num: users.length + 1,
      ammount: req.body.ammount,
      limit: req.body.limit,
    });
    const customer = await newCustomer.save();
    res.send({ message: "Credito Creado", customer });
  })
);
export default chargesRouter;
