import { Request, Response } from "express";
import { ResUser } from "../types/User";
import db from "../models";
const Supplier = db.Supplier;
const User = db.User;

// Supplier API

// Read Supplier
const readSupplier = async (req: ResUser, res: Response) => {
  const userId = req.userId;
  const resRead = await Supplier.findAll({
    where: { userId: userId },
    include: [db.User],
  });

  return res.status(200).json(resRead);
};

// Create Supplier
const createSupplier = async (req: ResUser, res: Response) => {
  const userId = req.userId;
  const { supplier, phone, email } = req.body;

  // Check JSON Valid
  if (!supplier || !phone || !email) {
    return res.status(400).json({ message: "Message Invalid" });
  }

  try {
    // Create if supplier not existing
    const [resSupllier, created] = await Supplier.findOrCreate({
      where: { supplier: supplier },
      defaults: { supplier: supplier, phone: phone, email: email },
    });
    if (!resSupllier) {
      return res.status(400).json({ message: "Create not Completed" });
    }
    // Set UserId is Instance
    const userInstance = await User.findByPk(userId);
    if (!userInstance) {
      return res.status(400).json({ message: "UserId not found in DB" });
    }
    await resSupllier.setUser(userInstance);

    if (!created) {
      return res.status(400).json({ message: "Supplier Existing" });
    }
    return res.status(200).json({ message: "Create Completed" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Update
const updateSupplier = (req: Request, res: Response) => {
  const { supplier, phone, email } = req.body;
  const { id } = req.params;

  // Check JSON Valid
  if (!supplier || !phone || !email) {
    return res.status(400).json({ message: "Message Invalid" });
  }

  try {
    Supplier.findByPk(id).then(async (resSup) => {
      await resSup.update({ supplier: supplier, phone: phone, email: email });
      return res.status(200).json({ message: "Update Completed" });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Delete
const deleteSupplier = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const resDel = await Supplier.destroy({ where: { id: id } });
    if (!resDel) {
      return res.status(400).json({ message: "Can not destroy" });
    }
    return res.status(200).json({ message: "Already destroy" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export { createSupplier, readSupplier, updateSupplier, deleteSupplier };
