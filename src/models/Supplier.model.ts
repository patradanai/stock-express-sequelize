import { Model, DataTypes, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize) => {
  class Supplier extends Model {
    public id?: number;
    public supplier: string;
    public phone: string;
    public email: string;
    public createdAt?: Date;
    public updatedAt?: Date;

    static associate(models) {
      Supplier.hasMany(models.Product);
      Supplier.belongsTo(models.User);
    }
  }

  Supplier.init(
    {
      supplier: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    { tableName: "Suppliers", sequelize }
  );

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
  return Supplier;
};
