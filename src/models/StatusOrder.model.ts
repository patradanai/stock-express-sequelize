import { Model, Column, Table, HasMany, DataType } from "sequelize-typescript";
import OrderProduct from "./OrderProduct.model";

@Table
export default class StatusOrder extends Model {
  @Column(DataType.TEXT)
  statusOrder: string;

  @HasMany(() => OrderProduct)
  orderProducts: OrderProduct[];
}

// const StatusOrder = sequelize.define(
//   "StatusOrder",
//   {
//     statusOrder: Sequelize.STRING,
//   },
//   {}
// );

// StatusOrder.associate = (models) => {
//   StatusOrder.hasMany(models.OrderProduct);
// };
