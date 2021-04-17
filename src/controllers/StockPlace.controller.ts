import { Response } from "express";
import { Op } from "sequelize";
import { ReqUser } from "../types/User";
import StockPlace from "../models/StockPlace.model";

// CRUD

const readStockPlaces = async (req: ReqUser, res: Response) => {
  const userId = req.userId;

  try {
    const stockPlaces = await StockPlace.findAll({ where: { userId: userId } });
    return res.status(200).json({ data: stockPlaces });
  } catch (err) {
    return res.status(500).json({ Errors: err.message });
  }
};

const createStockPlace = async (req: ReqUser, res: Response) => {
  const userId = req.userId;
  const { stockPlace } = req.body;

  // Check JSON Valid
  if (!stockPlace) {
    return res.status(400).json({ message: "Message Invalid" });
  }

  try {
    const [stockplace, created] = await StockPlace.findOrCreate({
      where: {
        [Op.and]: [
          { stockPlace: { [Op.eq]: stockPlace } },
          { userid: { [Op.eq]: userId } },
        ],
      },
      defaults: { stockPlace: stockPlace, UserId: userId },
    });
    if (!stockplace) {
      return res.status(400).json({ message: "Create not Completed" });
    }

    if (!created) {
      return res.status(400).json({ message: "Supplier Existing" });
    }
    return res.status(200).json({ message: "Completed Create StockPlace" });
  } catch (err) {
    return res.status(500).json({ Error: err.message });
  }
};

const updateStockPlace = async (req: ReqUser, res: Response) => {
  const userId = req.userId;
  const { id } = req.params;
  const { stockPlace } = req.body;

  // Check JSON Valid
  if (!stockPlace) {
    return res.status(400).json({ message: "Message Invalid" });
  }

  try {
    // Check owner stockPlace with UserId
    const stockPlaces = await StockPlace.findByPk(id);
    if (userId != stockPlaces.UserId) {
      return res
        .status(401)
        .json({ message: `UnAuthorization Deleted Id ${id}` });
    }
    await stockPlaces.update(stockPlace);
    return res.status(200).json({ message: "Update Completed" });
  } catch (err) {
    return res.status(500).json({ Error: err.message });
  }
};

const deleteStockPlace = async (req: ReqUser, res: Response) => {
  const userId = req.userId;
  const { id } = req.params;

  try {
    const stockPlaces = await StockPlace.findByPk(id);
    if (userId != stockPlaces.UserId) {
      return res
        .status(401)
        .json({ message: `UnAuthorization Deleted Id ${id}` });
    }

    // Delete StockPlace by Id
    await StockPlace.destroy({ where: { id: id } });
    return res
      .status(200)
      .json({ message: `Completed Deleted StockPlace Id ${id}` });
  } catch (err) {
    return res.status(500).json({ Errors: err.message });
  }
};

export {
  readStockPlaces,
  createStockPlace,
  updateStockPlace,
  deleteStockPlace,
};
