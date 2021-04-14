import express from "express";
import * as ProductContoller from "../controllers/Product.controller";
import { isAuthorization } from "../middlewares/Auth.middleware";

const router = express.Router();

// Middleware Check Header : Authorization
router.use(isAuthorization);

// Example GET localhost:3000/stock/products
router.get("/products", ProductContoller.readProducts);

// Example POST localhost:3000/stock/product
router.post("/product", ProductContoller.createProduct);

// Example PUT localhost:3000/stock/product/:id
router.put("/product", ProductContoller.updateProduct);

// Example Delete localhost:3000/stock/product/:id
router.delete("/product", ProductContoller.deleteProduct);

export default router;
