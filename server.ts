import express, { Application, Request, Response } from "express";
import db from "./src/models";
import Stock from "./src/routers/Stock.router";
import cors from "cors";

const PORT = process.env.PORT || 3000;
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Init Dotenv
require("dotenv").config();

(async () => {
  await db.sequelize.sync();
})();

// Add Router
app.get("/", (req, res) => {
  return res.status(200).json("TEST");
});
app.use("/stock", Stock);

app.listen(PORT, () => {
  console.log(`Running Server on ${PORT}`);
});
