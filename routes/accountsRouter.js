import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import Accounts from "../models/CustomerAccountModel.js";
import { generateToken, isAuth, isAdmin } from "../utils.js";
import cors from "cors";
import AccountDetail from "../models/AccountDetailModel.js";
const accountsRouter = express.Router();

accountsRouter.get(
  "/",
  cors(),
  expressAsyncHandler(async (req, res) => {
    const users = await Accounts.find({}).populate("customerId", "name");
    console.log(users);
    res.send(users);
  })
);
accountsRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await Accounts.findById(req.params.id).populate(
      "customerId",
      "name"
    );
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
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

accountsRouter.post(
  "/addConf",

  expressAsyncHandler(async (req, res) => {
   
    const newCustomer = new AccountDetail({
      freq: req.body.freq,
      day: req.body.freq,
      ammount: req.body.ammount,
      limit: req.body.limit,
    });
    const customer = await newCustomer.save();
    res.send({ message: "Credito Creado", customer });
  })
);
export default accountsRouter;
