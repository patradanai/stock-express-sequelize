import Sequelize from "sequelize";
import { Response } from "express";
import { ReqUser } from "../types/User";
import db from "../models";
const Stock = db.Stock;
const StockTransaction = db.StockTransaction;
const StockTransactionType = db.StockTransactionType;
// CRUD

// Get by id
const readStock = async (req: ReqUser, res: Response) => {
  const userId = req.userId;
  const { id } = req.params;
  try {
  } catch (err) {}
};

// Get All Stocks
const readStocks = async (req: ReqUser, res: Response) => {
  const userId = req.userId;

  try {
    const stocks = await Stock.findAll({
      duplicating: false,
      group: [],
      attributes: {
        include: [
          [
            Sequelize.fn(
              "SUM",
              Sequelize.literal(
                "(SELECT CASE StockTransactions.StockTransactionType.id WHEN '1' THEN StockTransactions.quantity ELSE StockTransactions.quantity*-1 END)"
              )
            ),
            "Quantity",
          ],
        ],
      },
      include: {
        model: StockTransaction,
        as: "StockTransactions",
        attributes: [],
        required: false,
        include: [
          {
            model: StockTransactionType,
            attributes: ["type"],
            required: false,
          },
        ],
      },
    });
    return res.status(200).json(stocks);
  } catch (err) {
    return res.status(500).json({ Error: err.message });
  }
};

const updateStock = async (req: ReqUser, res: Response) => {
  const userId = req.userId;
  const { id } = req.params;
  const { minOrder, orderQuantity, isAutoOrder } = req.body;

  try {
    const stock = await Stock.findByPk(id);
    if (stock.userId != userId) {
      return res
        .status(401)
        .json({ message: "UnAuthorization for This Stock" });
    }
    await stock.update({ minOrder, orderQuantity, isAutoOrder });
    return res.status(200).json({ message: "Completed Update Stock" });
  } catch (err) {
    return res.status(500).json({ Error: err.message });
  }
};

export { readStocks, updateStock };
