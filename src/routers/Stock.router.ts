import express, { Application } from "express";
import {
  createSupplier,
  readSupplier,
  deleteSupplier,
  updateSupplier,
} from "../controllers/Supplier.controller";
const router = express.Router();

// CRUD

// Example localhost:3000/stock/supplier
router.post("/supplier", createSupplier);

router.get("/supplier", readSupplier);

// Example localhost:3000/stock/supplier/:id
router.put("/supplier/:id", updateSupplier);

// Example localhost:3000/stock/supplier/:id
router.delete("/supplier/:id", deleteSupplier);

export default router;
