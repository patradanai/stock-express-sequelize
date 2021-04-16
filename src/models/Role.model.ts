import { Model, DataTypes, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize) => {
  class Role extends Model {
    public id?: number;
    public role: string;
    public createdAt?: Date;
    public updatedAt?: Date;

    static associate(models) {
      Role.belongsToMany(models.User, { through: "user_roles" });
    }
  }

  Role.init(
    { role: { type: DataTypes.STRING } },
    { tableName: "roles", sequelize }
  );

  // const Role = sequelize.define<RoleInstance>("Role", {
  //   role: { type: Sequelize.STRING },
  // });
  // Role.associate = (models) => {
  //   Role.belongsToMany(models.User, { through: "user_roles" });
  // };
  return Role;
};
