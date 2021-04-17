import Sequelize from "sequelize";
import { Response } from "express";
import { ReqUser } from "../types/User";
import db from "../models";
import Stock from "../models/Stock.model";
import StockTransaction from "../models/StockTransaction.model";
import StockTransactionType from "../models/StockTransactionType.model";
// CRUD

// Get by id
const readStock = async (req: ReqUser, res: Response) => {
  const userId = req.userId;
  const { id } = req.params;
  try {
    const stock = await Stock.findByPk(id, {
      group: [],
      attributes: {
        include: [
          // Notice how I referred to the attributes using the `tableNames` in backticks becuase `->` is
          // an invalid character in an SQL query but sequelize when generating the SQL query assigns
          // this alias to the nested included tables
          [
            Sequelize.fn(
              "SUM",
              Sequelize.literal(
                "(CASE `StockTransactions->StockTransactionType`.`type` WHEN 'StockIn' THEN StockTransactions.quantity ELSE StockTransactions.quantity*-1 END)"
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
    if (stock.UserId != userId) {
      return res
        .status(401)
        .json({ message: `UnAuthorization with This Stock id ${id}` });
    }
    return res.status(200).json({ data: stock });
  } catch (err) {
    return res.status(500).json({ Error: err.message });
  }
};

// Get All Stocks
const readStocks = async (req: ReqUser, res: Response) => {
  const userId = req.userId;

  try {
    const stocks = await Stock.findAll({
      where: { userId: userId },

      group: [],
      attributes: {
        include: [
          // Notice how I referred to the attributes using the `tableNames` in backticks becuase `->` is
          // an invalid character in an SQL query but sequelize when generating the SQL query assigns
          // this alias to the nested included tables
          [
            Sequelize.fn(
              "SUM",
              Sequelize.literal(
                "(CASE `StockTransactions->StockTransactionType`.`type` WHEN 'StockIn' THEN StockTransactions.quantity ELSE StockTransactions.quantity*-1 END)"
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
    return res.status(200).json({ data: stocks });
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
    if (stock.UserId != userId) {
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

export { readStocks, readStock, updateStock };
