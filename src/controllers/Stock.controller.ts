import { Request, Response } from "express";
import db from "../models";
const Supplier = db.Supplier;
const Product = db.Product;

// Supplier API

// Read Supplier
const readSupplier = async (req: Request, res: Response) => {};

// Create Supplier
const createSupplier = async (req: Request, res: Response) => {
  const { supplier, phone, email } = req.body;

  // Check JSON Valid
  if (!supplier || !phone || !email) {
    return res.status(400).json({ message: "Message Invalid" });
  }

  // Create if supplier not existing
  const [resSupllier, created] = await Supplier.findOrCreate({
    where: { supplier: supplier },
    defaults: { supplier: supplier, phone: phone, email: email },
  });

  if (!resSupllier) {
    return res.status(400).json({ message: "Create not Completed" });
  }

  if (created) {
    return res.status(200).json({ message: "Create Completed" });
  } else {
    return res.status(400).json({ message: "Supplier Existing" });
  }
};

// Update
const updateSupplier = async (req: Request, res: Response) => {};

// Delete
const deleteSupplier = async (req: Request, res: Response) => {};

export { createSupplier, readSupplier, updateSupplier, deleteSupplier };
