import express from "express";
import * as SupplierController from "../controllers/Supplier.controller";
import * as StockPlaceController from "../controllers/StockPlace.controller";
import * as ProductContoller from "../controllers/Product.controller";
import * as StockController from "../controllers/Stock.controller";
import * as StockTransaction from "../controllers/StockTransaction.controller";
import { isAuthorization } from "../middlewares/Auth.middleware";
const router = express.Router();

// CRUD

// Middleware
router.use(isAuthorization);

/**
 *
 * Supplier Routes
 *
 * */

// Example localhost:3000/stock/supplier
router.post("/supplier", SupplierController.createSupplier);

router.get("/supplier", SupplierController.readSupplier);

// Example localhost:3000/stock/supplier/:id
router.put("/supplier/:id", SupplierController.updateSupplier);

// Example localhost:3000/stock/supplier/:id
router.delete("/supplier/:id", SupplierController.deleteSupplier);

/**
 *
 * Product Routes
 *
 * */

// Example GET localhost:3000/stock/products
router.get("/products", ProductContoller.readProducts);

// Example POST localhost:3000/stock/product
router.post("/product", ProductContoller.createProduct);

// Example PUT localhost:3000/stock/product/:id
router.put("/product", ProductContoller.updateProduct);

// Example Delete localhost:3000/stock/product/:id
router.delete("/product", ProductContoller.deleteProduct);

/**
 *
 * Stock Routes
 *
 * */

//Example PUT localhost:3000/stock/stock/1
router.put("/stock/:id", StockController.updateStock);

// Example GET localhost:3000/stock/stocks
router.get("/stocks", StockController.readStocks);

// Example GET localhost:3000/stock/stock/1
router.get("/stock/:id", StockController.readStock);

/**
 *
 * StockTransactions Routes
 *
 * */
router.post("/stocktransaction", StockTransaction.createStockTransaction);

/**
 *
 * StockPlace Routes
 *
 * */

// Example localhost:3000/stock/supplier
router.post("/stockplace", StockPlaceController.createStockPlace);

router.get("/stockplace", StockPlaceController.readStockPlaces);

// Example localhost:3000/stock/supplier/:id
router.put("/stockplace/:id", StockPlaceController.readStockPlaces);

// Example localhost:3000/stock/supplier/:id
router.delete("/stockplace/:id", StockPlaceController.deleteStockPlace);

export default router;
