import express, { Application } from "express";
import { createSupplier } from "../controllers/Stock.controller";
const router = express.Router();

// CRUD

// Example localhost:3000/stock/supplier
router.post("/supplier", createSupplier);

export default router;
