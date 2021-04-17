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
import Stock from "./Stock.model";

@Table
export default class StockPlace extends Model {
  @Column(DataType.TEXT)
  stockPlace: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  UserId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Stock)
  stocks: Stock[];
}

// const StockPlace = sequelize.define(
//   "StockPlace",
//   {
//     stockPlace: Sequelize.STRING,
//   },
//   {}
// );

// StockPlace.associate = (models) => {
//   StockPlace.hasMany(models.Stock);
//   StockPlace.belongsTo(models.User);
// };
