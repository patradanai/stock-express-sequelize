import {
  Table,
  Column,
  Model,
  HasMany,
  HasOne,
  BelongsTo,
  ForeignKey,
  DataType,
} from "sequelize-typescript";
import Supplier from "./Supplier.model";
import User from "./User.model";
import OrderProduct from "./OrderProduct.model";
import Stock from "./Stock.model";

@Table
export default class Product extends Model {
  @Column(DataType.TEXT)
  product: string;

  @Column(DataType.TEXT)
  productDesc: string;

  @Column(DataType.TEXT)
  productPrice: string;

  @Column(DataType.TEXT)
  isActive: string;

  @ForeignKey(() => Supplier)
  @Column(DataType.INTEGER)
  SupplierId: number;

  @BelongsTo(() => Supplier)
  supplier: Supplier;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  UserId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => OrderProduct)
  orderProducts: OrderProduct[];

  @HasOne(() => Stock)
  stock: Stock;
}

// const Product = sequelize.define(
//   "Product",
//   {
//     product: Sequelize.STRING,
//     productDesc: Sequelize.STRING,
//     productPrice: Sequelize.STRING,
//     isActive: Sequelize.BOOLEAN,
//   },
//   {}
// );
// Product.associate = (models) => {
//   Product.belongsTo(models.Supplier, {
//     foreignKey: {
//       allowNull: false,
//     },
//   });
//   Product.hasMany(models.OrderProduct);
//   Product.hasOne(models.Stock);
//   Product.belongsTo(models.User, {
//     foreignKey: {
//       allowNull: false,
//     },
//   });
// };
