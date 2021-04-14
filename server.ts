import express, { Application, Request, Response } from "express";
import db from "./src/models";
import Stock from "./src/routers/Supplier.router";
import Product from "./src/routers/Product.router";
import Auth from "./src/routers/Auth.router";
import cors from "cors";

const PORT = process.env.PORT || 3000;
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Init Dotenv
require("dotenv").config();

(async () => {
  await db.sequelize.sync({ force: true });
  await db.Role.bulkCreate([
    { role: "Administrator" },
    { role: "Moderator" },
    { role: "Customer" },
  ]);
  await db.StockTransactionType.bulkCreate([
    { type: "StockIn" },
    { type: "StockOut" },
  ]);
  await db.StatusOrder.bulkCreate([
    { statusOrder: "HoldOn" },
    { statusOrder: "Processed" },
    { statusOrder: "Completed" },
  ]);
})();

// Add Router
app.get("/", (req, res) => {
  return res.status(200).json("TEST");
});
app.use("/stock", Stock);
app.use("/auth", Auth);
app.use("/stock", Product);

app.listen(PORT, () => {
  console.log(`Running Server on ${PORT}`);
});
