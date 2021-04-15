import { Response } from "express";
import { ReqUser } from "../types/User";
import db from "../models";
const StockTransaction = db.StockTransaction;
const StockTransactionType = db.StockTransactionType;
// CRUD

const readStockTransactions = (req: Request, res: Response) => {};

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
    await stockTransaction.setStockTransactionType(stockType);
    return res
      .status(200)
      .json({ message: "Completed Create StockTransaction" });
  } catch (err) {
    return res.status(500).json({ Error: err.message });
  }
};

const updateStockTransaction = (req: Request, res: Response) => {};

const deleteStockTransaction = (req: Request, res: Response) => {};

export {
  readStockTransactions,
  createStockTransaction,
  updateStockTransaction,
  deleteStockTransaction,
};
