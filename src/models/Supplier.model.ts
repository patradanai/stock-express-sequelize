import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  DataType,
} from "sequelize-typescript";
import User from "./User.model";

@Table
export default class Supplier extends Model {
  @Column(DataType.TEXT)
  supplier: string;

  @Column(DataType.TEXT)
  phone: string;

  @Column(DataType.TEXT)
  email: string;

  @ForeignKey(() => User)
  @Column(DataType.NUMBER)
  UserId: number;

  @BelongsTo(() => User)
  user: User;

  // static associate(models) {
  //   Supplier.hasMany(models.Product);
  //   Supplier.belongsTo(models.User);
  // }
}

// Supplier.init(
//   {
//     supplier: DataType.STRING,
//     phone: DataType.STRING,
//     email: DataType.STRING,
//   },
//   { tableName: "Suppliers", sequelize }
// );

// const Supplier = sequelize.define(
//   "Supplier",
//   {
//     supplier: Sequelize.STRING,
//     phone: Sequelize.STRING,
//     email: Sequelize.STRING,
//   },
//   {}
// );

// Supplier.associate = (models) => {
//   Supplier.hasMany(models.Product);
//   Supplier.belongsTo(models.User);
// };
