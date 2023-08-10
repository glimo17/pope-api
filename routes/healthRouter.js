import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
const healthRouter = express.Router();

healthRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    res.send("hola jeank");
  })
);
export default healthRouter;
