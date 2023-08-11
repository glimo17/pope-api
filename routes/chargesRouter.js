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
