import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import Movimientos from "../models/Movimientos.js";
import { generateToken, isAuth, isAdmin } from "../utils.js";

const movimientosRouter = express.Router();

movimientosRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const users = await Movimientos.find({})
      .where("accountId")
      .equals(req.body.accountId);
    console.log(users);
    res.send(users);
  })
);
movimientosRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const users = await Accounts.find({});
    console.log(req.body.ammount);
    const newCustomer = new Accounts({
      customerId: req.body.customerId,
      num: users.length + 1,
      ammount: req.body.ammount,
      limit: req.body.limit,
    });
    const customer = await newCustomer.save();
    res.send({ message: "Credito Creado", customer });
  })
);
export default movimientosRouter;
