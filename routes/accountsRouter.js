import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import Accounts from "../models/CustomerAccountModel.js";
import { generateToken, isAuth, isAdmin } from "../utils.js";

const accountsRouter = express.Router();

accountsRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const users = await Accounts.find({}).populate("customerId", "name");
    console.log(users);
    res.send(users);
  })
);
accountsRouter.post(
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
export default accountsRouter;
