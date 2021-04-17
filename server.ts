import express, { Application } from "express";
import sequelize from "./src/models";
import Role from "./src/models/Role.model";
import StockTransactionType from "./src/models/StockTransactionType.model";
import StatusOrder from "./src/models/StatusOrder.model";
import Stock from "./src/routers/Stock.router";
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
  await sequelize.sync({ force: true });
  await Role.bulkCreate([
    { role: "Administrator" },
    { role: "Moderator" },
    { role: "Customer" },
  ]);
  await StockTransactionType.bulkCreate([
    { type: "StockIn" },
    { type: "StockOut" },
  ]);
  await StatusOrder.bulkCreate([
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

app.listen(PORT, () => {
  console.log(`Running Server on ${PORT}`);
});
