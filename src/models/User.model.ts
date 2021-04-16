import { Model, DataTypes, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize) => {
  class User extends Model {
    public id?: number;
    public firstname: string;
    public lastname: string;
    public email: string;
    public username: string;
    public password: string;
    public createdAt?: Date;
    public updatedAt?: Date;

    static associate(models) {
      User.belongsToMany(models.Role, { through: "user_roles" });
    }
  }

  User.init(
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    { tableName: "Users", sequelize }
  );

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

  return User;
};
