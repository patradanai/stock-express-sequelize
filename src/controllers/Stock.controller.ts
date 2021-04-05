import { Request, Response } from "express";
import db from "../models";
const Supplier = db.Supplier;
const Product = db.Product;

// STOCK API

// Create Supplier
const createSupplier = async (req: Request, res: Response) => {
  const { supplier, phone, email } = req.body;

  if (!supplier || !phone || !email) {
    return res.status(400).json({ message: "Message Invalid" });
  }

  const [resSupllier, created] = await Supplier.findOrCreate({
    where: { supplier: supplier },
    default: { supplier: supplier, phone: phone, email: email },
  });

  if (!resSupllier) {
    return res.status(400).json({ message: "Create not Completed" });
  }

  if (created) {
    return res.status(200).json({ message: "Create Completed" });
  } else {
    return res.status(200).json({ message: "Supplier Existing" });
  }
};

export { createSupplier };
