import {
  Model,
  Column,
  Table,
  HasMany,
  BelongsTo,
  ForeignKey,
  DataType,
} from "sequelize-typescript";
import User from "./User.model";
import Product from "./Product.model";
import StockPlace from "./StockPlace.model";
import StockTransaction from "./StockTransaction.model";

@Table
export default class Stock extends Model {
  @Column(DataType.NUMBER)
  minOrder: number;

  @Column(DataType.NUMBER)
  orderQuantity: number;

  @Column(DataType.BOOLEAN)
  isAutoOrder: boolean;

  @ForeignKey(() => User)
  @Column(DataType.NUMBER)
  UserId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => StockPlace)
  @Column(DataType.NUMBER)
  StockPlaceId: number;

  @BelongsTo(() => StockPlace)
  stockPlace: StockPlace;

  @ForeignKey(() => Product)
  @Column(DataType.NUMBER)
  ProductId: number;

  @BelongsTo(() => Product)
  product: Product;

  @HasMany(() => StockTransaction)
  stockTransactions: StockTransaction[];
}

// const Stock = sequelize.define(
//   "Stock",
//   {
//     minOrder: Sequelize.INTEGER,
//     orderQuantity: Sequelize.INTEGER,
//     isAutoOrder: Sequelize.BOOLEAN,
//   },
//   {}
// );

// Stock.associate = (models) => {
//   Stock.belongsTo(models.Product);
//   Stock.belongsTo(models.StockPlace);
//   Stock.belongsTo(models.User);
//   Stock.hasMany(models.StockTransaction);
// };
