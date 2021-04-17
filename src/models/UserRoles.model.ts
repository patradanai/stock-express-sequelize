import {
  Model,
  Table,
  ForeignKey,
  Column,
  DataType,
} from "sequelize-typescript";
import User from "./User.model";
import Role from "./Role.model";

@Table({ tableName: "user_roles" })
export default class UserRoles extends Model {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  UserId: number;

  @ForeignKey(() => Role)
  @Column(DataType.INTEGER)
  RoleId: number;
}
