import express, { Application, Request, Response } from "express";
import db from "./src/models";

const PORT = process.env.PORT || 3000;
const app: Application = express();

// Init Dotenv
require("dotenv").config();

(async () => {
  await db.sequelize.sync();
})();

app.listen(PORT, () => {
  console.log(`Running Server on ${PORT}`);
});
