import { Request, Response } from "express";
import db from "../models";
import { ResUser } from "../types/User";
const Product = db.Product;
const User = db.User;
const Supplier = db.Supplier;

// CRUD

const readProducts = async (req: ResUser, res: Response) => {
  const id = req.userId;

  const products = await Product.findAll({ where: { userid: id } });

  return res.status(200).json({ data: products });
};

const createProduct = async (req: ResUser, res: Response) => {
  const id = req.userId;
  const { product, productDesc, productPrice, isActive, supplierId } = req.body;

  // Find User
  const userInstance = await User.findByPk(id);

  // Find Supplier
  const supplierInstance = await Supplier.findByPk(supplierId);

  const productCreate = await Product.create({
    product: product,
    productPrice: productPrice,
    productDesc: productDesc,
    isActive: isActive,
  });
  if (!productCreate) {
    return res.status(400).json({ message: "Create product not completed" });
  }
  await productCreate.setUsers(userInstance);
  await productCreate.setSuppliers(supplierInstance);

  return res.status(200).json({ message: "Create product completed" });
};

const updateProduct = async (req: ResUser, res: Response) => {
  const userId = req.userId;
  const { id } = req.params;
  const { product, productDesc, productPrice, isActive, supplierId } = req.body;

  const productUpdate = await Product.findByPk(id);
  if (productUpdate.userId != userId) {
    return res.status(401).json({ message: "Authorization for this product" });
  }
};

const deleteProduct = (req: Request, res: Response) => {};

export { readProducts, createProduct, updateProduct, deleteProduct };
