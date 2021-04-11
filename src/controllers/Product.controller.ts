import db from "../models";
const Product = db.Product;

// CRUD

const readProducts = (req: Request, res: Response) => {};

const createProduct = (req: Request, res: Response) => {
  const {
    product,
    productDesc,
    productPrice,
    isActive,
    supplierId,
    userId,
  } = req.body;
};

const updateProduct = (req: Request, res: Response) => {};

const deleteProduct = (req: Request, res: Response) => {};

export { readProducts, createProduct, updateProduct, deleteProduct };
