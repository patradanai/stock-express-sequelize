import { Response } from "express";
import { ReqUser } from "../types/User";
import StockTransaction from "../models/StockTransaction.model";
import StockTransactionType from "../models/StockTransactionType.model";

// CRUD

const readStockTransactions = async (req: ReqUser, res: Response) => {
  const userId = req.userId;

  try {
    const stockTransactions = await StockTransaction.findAll({
      where: { userid: userId },
    });
    return res.status(200).json({ data: stockTransactions });
  } catch (err) {
    return res.status(500).json({ Error: err.message });
  }
};

const createStockTransaction = async (req: ReqUser, res: Response) => {
  const userId = req.userId;
  const { stockId, quantity, typeStock } = req.body;

  try {
    const stockTransaction = await StockTransaction.create({
      UserId: userId,
      StockId: stockId,
      quantity: quantity,
    });
    const stockType = await StockTransactionType.findOne({
      where: { type: typeStock },
    });
    await stockTransaction.$set("stockTransactionType", stockType);
    return res
      .status(200)
      .json({ message: "Completed Create StockTransaction" });
  } catch (err) {
    return res.status(500).json({ Error: err.message });
  }
};

const updateStockTransaction = async (req: ReqUser, res: Response) => {
  const userId = req.userId;
  const { id } = req.params;
  const { quantity, typeStock } = req.body;

  try {
    // Check StockTransaction by Id
    const stockTransaction = await StockTransaction.findByPk(id);
    if (stockTransaction.UserId != userId) {
      return res
        .status(401)
        .json({ message: "UnAuthorization for This Stock" });
    }
    // Update
    await stockTransaction.update({ quantity: quantity });
    const stockType = await StockTransactionType.findOne({
      where: { type: typeStock },
    });
    await stockTransaction.$set("stockTransactionType", stockType);
  } catch (err) {
    return res.status(500).json({ Error: err.message });
  }
};

const deleteStockTransaction = async (req: ReqUser, res: Response) => {
  const userId = req.userId;
  const { id } = req.params;

  try {
    // Check StockTransaction by Id
    const stockTransaction = await StockTransaction.findByPk(id);
    if (stockTransaction.UserId != userId) {
      return res
        .status(401)
        .json({ message: "UnAuthorization for This Stock" });
    }
    // Delete StockTransaction by Id
    await StockTransaction.destroy({ where: { id: id } });
    return res
      .status(200)
      .json({ message: `Completed Deleted Transaction Id ${id}` });
  } catch (err) {
    return res.status(500).json({ Error: err.message });
  }
};

export {
  readStockTransactions,
  createStockTransaction,
  updateStockTransaction,
  deleteStockTransaction,
};
