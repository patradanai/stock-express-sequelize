import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
} from "sequelize-typescript";
import User from "./User.model";
import Product from "./Product.model";
import StatusOrder from "./StatusOrder.model";

@Table
export default class OrderProduct extends Model {
  @Column(DataType.TEXT)
  orderQuantity: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  UserId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Product)
  @Column(DataType.INTEGER)
  ProductId: number;

  @BelongsTo(() => Product)
  product: Product;

  @ForeignKey(() => StatusOrder)
  @Column(DataType.INTEGER)
  StatusOrderId: number;

  @BelongsTo(() => StatusOrder)
  statusOrder: StatusOrder;
}

// const OrderProduct = sequelize.define(
//   "OrderProduct",
//   {
//     orderQuantity: Sequelize.INTEGER,
//   },
//   {}
// );

// OrderProduct.associate = (models) => {
//   OrderProduct.belongsTo(models.Product);
//   OrderProduct.belongsTo(models.StatusOrder);
//   OrderProduct.belongsTo(models.User);
// };
