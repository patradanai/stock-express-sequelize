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
import StockTransaction from "./StockTransaction.model";

@Table
export default class StockTransactionType extends Model {
  @Column(DataType.TEXT)
  type: string;

  @ForeignKey(() => User)
  @Column(DataType.NUMBER)
  UserId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => StockTransaction)
  stockTransactions: StockTransaction[];
}

// const StockTransactionType = sequelize.define(
//   "StockTransactionType",
//   {
//     type: Sequelize.STRING,
//   },
//   {}
// );

// StockTransactionType.associate = (models) => {
//   StockTransactionType.hasMany(models.StockTransaction);
//   StockTransactionType.belongsTo(models.User);
// };
