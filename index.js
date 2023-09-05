import express from "express";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import userRouter from "./routes/userRoutes.js";
import accountsRouter from "./routes/accountsRouter.js";
import orderRouter from "./routes/orderRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";
import movimientosRouter from "./routes/movimientosRouter.js";
import healthRouter from "./routes/healthRouter.js";
import chargesRouter from "./routes/chargesRouter.js";
import pedidosModel from "./routes/pedidosRouter.js";
import cors from "cors";
import pedidosRouter from "./routes/pedidosRouter.js";
dotenv.config();

mongoose
  .connect("mongodb+srv://glimo17:123abc@cluster0.ocuxrsk.mongodb.net/eshop")
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log(error.message);
  });

const app = express();

const router = express.Router();
const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const handler = (req, res) => {
  const d = new Date();
  res.end(d.toString());
};
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.get("/api/keys/google", (req, res) => {
  res.send({ key: process.env.GOOGLE_API_KEY || "" });
});

app.use("/api/upload", uploadRouter);
app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);
app.use("/api/customers", customerRoutes);
app.use("/api/accounts", accountsRouter);
app.use("/api/users", userRouter);
app.use("/api/movimientos", movimientosRouter);
app.use("/api/orders", orderRouter);
app.use("/api/health", healthRouter);
app.use("/api/charges", chargesRouter);
app.use("/api/pedidos", pedidosRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.use(cors(allowCors(handler)));
// nuevo
const port = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`Serve at http://localhost:${port}`);
});
