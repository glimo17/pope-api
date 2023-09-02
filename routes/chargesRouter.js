import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import Charges from "../models/chargesModel.js";
import { generateToken, isAuth, isAdmin } from "../utils.js";
import cors from "cors";
import Accounts from "../models/CustomerAccountModel.js";
import Customer from "../models/customerModel.js";
const chargesRouter = express.Router();

chargesRouter.get(
  "/",
  cors(),
  expressAsyncHandler(async (req, res) => {
    const users = await Charges.find({})
      .where("status")
      .equals("Ingresado")
      .populate("accountId", "-num")
      .populate([{ path: "accountId", populate: { path: "customerId" } }]);

    res.send(users);
  })
);
chargesRouter.get(
  "/:id",
  cors(),
  expressAsyncHandler(async (req, res) => {
    if (req.params.id) {
      const users = await Charges.find({})
        .where("accountId")
        .equals(req.params.id)
        .populate("accountId", "-num")
        .populate([{ path: "accountId", populate: { path: "customerId" } }]);
      res.send(users);
    }
    res.status(404).send({ message: "Not Found" });
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
    const order = await Charges.findById(req.body._id);
    if (order) {
      order.status = "Procesado";

      await order.save();

      const account = await Accounts.findById(order.accountId);

      if (account) {
        account.ammount = Number(account.ammount) - Number(order.ammountPay);
        account.limit = Number(account.limit) + Number(order.ammountPay);
        const updatedUser = await account.save();
      }
      res.send({ message: "Procesado" });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);
chargesRouter.post(
  "/",

  expressAsyncHandler(async (req, res) => {
    console.log(req.body.ammount);
    const _id = req.body.accountId;
    const account = await Accounts.findById(_id);

    console.log(account);
    if (account) {
      account.ammount = Number(account.ammount) - Number(req.body.ammount);
      account.limit = Number(account.limit) + Number(req.body.ammount);
      const updatedUser = await account.save();

      const newCustomer = new Charges({
        accountId: req.body.accountId,
        description: req.body.description,
        ammount: req.body.ammount,
        ammountPay: req.body.ammountPay,
        status: "Procesado",
      });
      const customer = await newCustomer.save();
      res.send({ message: "Credito Creado", customer });
    }
  })
);

chargesRouter.post(
  "/Paymment",

  expressAsyncHandler(async (req, res) => {
    Accounts.find({ ammount: { $gte: 0 } }, null, function (err, account) {
      if (err) {
        console.log(err);
      } else {
        account.forEach((element) => {
          console.log(element.customerId.frec);
          if (element.customerId.frec == "Semanal") {
            const newCustomer = new Charges({
              accountId: element._id,
              description: "Pago Semanal",
              ammount: element.customerId.montoCuota,
              ammountPay: 0,
              status: "Ingresado",
            });
            newCustomer.save();
          }
        });
        res.send(account);
      }
    }).populate("customerId", "-num");

    // if (account) {
    //   account.ammount = Number(account.ammount) - Number(req.body.ammount);
    //   account.limit = Number(account.limit) + Number(req.body.ammount);
    //   const updatedUser = await account.save();

    //   const newCustomer = new Charges({
    //     accountId: req.body.accountId,
    //     description: req.body.description,
    //     ammount: req.body.ammount,
    //     ammountPay: req.body.ammountPay,
    //     status: "Procesado",
    //   });
    //   const customer = await newCustomer.save();
    //   res.send({ message: "Credito Creado", customer });
    // }
  })
);

chargesRouter.post(
  "/Paymment/Semanal",

  expressAsyncHandler(async (req, res) => {
    console.log("ebtro");
    Accounts.find({ ammount: { $gte: 0 } }, null, function (err, account) {
      if (err) {
        console.log(err);
      } else {
        account.forEach((element) => {
          console.log(element);
          if (element.customerId.frec == "Semanal") {
            console.log(element._id);
            const newCustomer = new Charges({
              accountId: element._id,
              description: "Pago Semanal",
              ammount: element.customerId.montoCuota,
              ammountPay: 0,
              status: "Ingresado",
            });
            newCustomer.save();
            console.log(element.customerId.frec);
          }
        });
        res.send(account);
      }
    }).populate("customerId", "-num");
  })
);

chargesRouter.post(
  "/Paymment/Quincenal",

  expressAsyncHandler(async (req, res) => {
    console.log("ebtro");
    Accounts.find({ ammount: { $gte: 0 } }, null, function (err, account) {
      if (err) {
        console.log(err);
      } else {
        account.forEach((element) => {
          console.log(element);
          if (element.customerId.frec == "Quincenal") {
            console.log(element._id);
            const newCustomer = new Charges({
              accountId: element._id,
              description: "Pago Quincenal",
              ammount: element.customerId.montoCuota,
              ammountPay: 0,
              status: "Ingresado",
            });
            newCustomer.save();
            console.log(element.customerId.frec);
          }
        });
        res.send(account);
      }
    }).populate("customerId", "-num");
  })
);

chargesRouter.post(
  "/Paymment/mensual",

  expressAsyncHandler(async (req, res) => {
    console.log("ebtro");
    Accounts.find({ ammount: { $gte: 0 } }, null, function (err, account) {
      if (err) {
        console.log(err);
      } else {
        account.forEach((element) => {
          console.log(element);
          if (element.customerId.frec == "Mensual") {
            console.log(element._id);
            const newCustomer = new Charges({
              accountId: element._id,
              description: "Pago Quincenal",
              ammount: element.customerId.montoCuota,
              ammountPay: 0,
              status: "Ingresado",
            });
            newCustomer.save();
            console.log(element.customerId.frec);
          }
        });
        res.send(account);
      }
    }).populate("customerId", "-num");
  })
);
export default chargesRouter;
