import {
  Model,
  Column,
  Table,
  BelongsToMany,
  DataType,
  HasMany,
} from "sequelize-typescript";
import Supplier from "./Supplier.model";
import UserRoles from "./UserRoles.model";
import Role from "./Role.model";

@Table({ tableName: "Users" })
export default class User extends Model {
  @Column(DataType.TEXT)
  firstname: string;

  @Column(DataType.TEXT)
  lastname: string;

  @Column(DataType.TEXT)
  nicename: string;

  @Column(DataType.TEXT)
  email: string;

  @Column(DataType.TEXT)
  username: string;

  @Column(DataType.TEXT)
  password: string;

  @HasMany(() => Supplier)
  suppliers: Supplier[];

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}

// User.init(
//   {
//     firstname: DataTypes.STRING,
//     lastname: DataTypes.STRING,
//     email: DataTypes.STRING,
//     username: DataTypes.STRING,
//     password: DataTypes.STRING,
//   },
//   { tableName: "Users", sequelize }
// );

// const User = sequelize.define(
//   "User",
//   {
//     firstname: Sequelize.STRING,
//     lastname: Sequelize.STRING,
//     email: Sequelize.STRING,
//     username: Sequelize.STRING,
//     password: Sequelize.STRING,
//   },
//   {}
// );
// User.associate = (models) => {
//   User.belongsToMany(models.Role, { through: "user_roles" });
//   User.hasMany(models.StockTransactionType);
//   User.hasMany(models.Product);
//   User.hasMany(models.Supplier);
//   User.hasMany(models.StockPlace);
//   User.hasMany(models.Supplier);
//   User.hasMany(models.Stock);
//   User.hasMany(models.OrderProduct);
// };
