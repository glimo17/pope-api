import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import Customer from "../models/customerModel.js";
import { generateToken, isAuth, isAdmin } from "../utils.js";
import cors from "cors";
const customerRouter = express.Router();

customerRouter.get(
  "/",
  cors(),
  expressAsyncHandler(async (req, res) => {
    const users = await Customer.find({});
    res.send(users);
  })
);

customerRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    console.log(req.params.id);
    const user = await Customer.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

customerRouter.delete(
  "/:id",

  expressAsyncHandler(async (req, res) => {
    const user = await Customer.findById(req.params.id);
    if (user) {
      await user.remove();
      res.send({ message: "Cliente Deleted" });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);
customerRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newCustomer = new Customer({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      canton: req.body.canton,
      direc: req.body.direc,
      fechaNacimiento: req.body.fechaNacimiento,
      oficio: req.body.oficio,
      tipo: req.body.tipo,
      frec: req.body.frec,
      dateConfig: req.body.dateConfig,
      dayPay: req.body.dayPay,
      dayPay2: req.body.dayPay2,
      dateFirstPay: req.body.dateFirstPay,
      dayString: req.body.dayString,
      montoCuota: req.body.montoCuota,
    });
    const customer = await newCustomer.save();
    res.send({ message: "Cliente Creado", customer });
  })
);
customerRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const customer = await Customer.findById(req.params.id);
    if (customer) {
      customer.name = req.body.name || customer.name;
      customer.email = req.body.email || customer.email;
      customer.phone = req.body.phone || customer.phone;
      customer.canton = req.body.canton || customer.canton;
      customer.direc = req.body.direc || customer.direc;
      (customer.fechaNacimiento = req.body.fechaNacimiento),
        (customer.oficio = req.body.oficio || customer.oficio),
        (customer.tipo = req.body.tipo || customer.tipo),
        (customer.frec = req.body.frec || customer.frec),
        (customer.dateConfig = req.body.dateConfig || customer.dateConfig),
        (customer.dayPay = req.body.dayPay || customer.dayPay),
        (customer.dayPay2 = req.body.dayPay2 || customer.dayPay2),
        (customer.montoCuota = req.body.montoCuota || customer.montoCuota),
        (customer.dateFirstPay =
          req.body.dateFirstPay || customer.dateFirstPay),
        (customer.dayString = req.body.dayString || customer.dayString);
      const updatedUser = await customer.save();
      res.send({ message: "User Updated", user: updatedUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

export default customerRouter;
