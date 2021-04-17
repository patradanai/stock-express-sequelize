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
  @Column(DataType.NUMBER)
  quantity: number;

  @ForeignKey(() => User)
  @Column(DataType.NUMBER)
  UserId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Stock)
  @Column(DataType.NUMBER)
  StockId: number;

  @BelongsTo(() => Stock)
  stock: Stock;

  @ForeignKey(() => StockTransactionType)
  @Column(DataType.NUMBER)
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
