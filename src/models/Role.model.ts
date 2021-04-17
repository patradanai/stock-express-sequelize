import {
  Model,
  Column,
  Table,
  DataType,
  BelongsToMany,
} from "sequelize-typescript";
import User from "./User.model";
import UserRoles from "./UserRoles.model";

@Table
export default class Role extends Model {
  @Column(DataType.TEXT)
  role: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}

// const Role = sequelize.define<RoleInstance>("Role", {
//   role: { type: Sequelize.STRING },
// });
// Role.associate = (models) => {
//   Role.belongsToMany(models.User, { through: "user_roles" });
// };
