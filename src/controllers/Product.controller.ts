import { Request, Response } from "express";
import db from "../models";
import { ReqUser } from "../types/User";
import Product from "../models/Product.model";
import User from "../models/User.model";
import Supplier from "../models/Supplier.model";
import Stock from "../models/Stock.model";
// CRUD

const readProducts = async (req: ReqUser, res: Response) => {
  const id = req.userId;

  try {
    const products = await Product.findAll({
      where: { userid: id },
      include: [User, Supplier, Stock],
    });
    return res.status(200).json({ data: products });
  } catch (err) {
    return res.status(500).json({ Error: err.message });
  }
};

const createProduct = async (req: ReqUser, res: Response) => {
  const id = req.userId;
  const {
    product,
    productDesc,
    productPrice,
    isActive,
    supplierId,
    minOrder,
    orderQuantity,
    isAutoOrder,
    stockPlaceId,
    productId,
  } = req.body;

  try {
    // Find User
    const userInstance = await User.findByPk(id);

    // Find Supplier
    const supplierInstance = await Supplier.findByPk(supplierId);

    const productCreate = await Product.create(
      {
        product: product,
        productPrice: productPrice,
        productDesc: productDesc,
        isActive: isActive,
        UserId: userInstance.id,
        SupplierId: supplierInstance.id,
        stock: {
          UserId: userInstance.id,
          minOrder: minOrder,
          orderQuantity: orderQuantity,
          isAutoOrder: isAutoOrder,
          ProductId: productId,
          StockPlaceId: stockPlaceId,
        },
      },
      {
        include: [Stock],
      }
    );
    if (!productCreate) {
      return res.status(400).json({ message: "Create product not completed" });
    }

    return res.status(200).json({ message: "Create product completed" });
  } catch (err) {
    return res.status(500).json({ Error: err.message });
  }
};

const updateProduct = async (req: ReqUser, res: Response) => {
  const userId = req.userId;
  const { id } = req.params;
  const { product, productDesc, productPrice, isActive, supplierId } = req.body;

  try {
    // Check owner Product with UserId
    const productUpdate = await Product.findByPk(id);
    if (productUpdate.UserId != userId) {
      return res
        .status(401)
        .json({ message: "UnAuthorization for this product" });
    }

    /// Find Supplier
    const supplierInstance = await Supplier.findByPk(supplierId);

    // Update Product
    await Product.update(
      {
        product: product,
        productPrice: productPrice,
        productDesc: productDesc,
        isActive: isActive,
        supplierId: supplierInstance.id,
      },
      { where: { id: id } }
    );

    return res.status(200).json({ message: `Completed update Id ${id}` });
  } catch (err) {
    return res.status(500).json({ Error: err.message });
  }
};

const deleteProduct = async (req: ReqUser, res: Response) => {
  const userId = req.userId;
  const { id } = req.params;

  try {
    // Check owner Product with UserId
    const productDelete = await Product.findByPk(id);
    if (productDelete.UserId != userId) {
      return res
        .status(401)
        .json({ message: "UnAuthorization for this product" });
    }

    await Product.destroy({ where: { id: id } });
    return res.status(200).json({ message: `Deleted Id ${id} Completed` });
  } catch (err) {
    return res.status(500).json({ Error: err.message });
  }
};

export { readProducts, createProduct, updateProduct, deleteProduct };
