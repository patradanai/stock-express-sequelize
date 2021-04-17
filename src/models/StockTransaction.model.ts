import {
  Model,
  Column,
  Table,
  DataType,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import User from "./User.model";
import Stock from "./Stock.model";
import StockTransactionType from "./StockTransactionType.model";

@Table
export default class StockTransaction extends Model {
  @Column(DataType.INTEGER)
  quantity: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  UserId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Stock)
  @Column(DataType.INTEGER)
  StockId: number;

  @BelongsTo(() => Stock)
  stock: Stock;

  @ForeignKey(() => StockTransactionType)
  @Column(DataType.INTEGER)
  StockTransactionTypeId: number;

  @BelongsTo(() => StockTransactionType)
  stockTransactionType: StockTransactionType;
}

// const StockTransaction = sequelize.define(
//   "StockTransaction",
//   {
//     quantity: Sequelize.INTEGER,
//   },
//   {}
// );

// StockTransaction.associate = (models) => {
//   StockTransaction.belongsTo(models.Stock, {
//     foreignKey: {
//       allowNull: false,
//     },
//   });
//   StockTransaction.belongsTo(models.User, {
//     foreignKey: {
//       allowNull: false,
//     },
//   });
//   StockTransaction.belongsTo(models.StockTransactionType, {
//     foreignKey: {
//       allowNull: true,
//     },
//   });
// };
