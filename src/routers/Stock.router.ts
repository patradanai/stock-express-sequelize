import express, { Application } from "express";
import {
  createSupplier,
  readSupplier,
  deleteSupplier,
  updateSupplier,
} from "../controllers/Stock.controller";
const router = express.Router();

// CRUD

// Example localhost:3000/stock/supplier
router.post("/supplier", createSupplier);

router.get("/supplier", readSupplier);

router.put("/supplier/:id", updateSupplier);

router.delete("/supplier/:id", deleteSupplier);

export default router;
