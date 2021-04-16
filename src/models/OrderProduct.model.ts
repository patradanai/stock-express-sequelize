import { Model, DataTypes, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize) => {
  class OrderProduct extends Model {
    public id?: number;
    public orderQuantity: string;
    public createdAt?: Date;
    public updatedAt?: Date;

    static associate(models) {
      OrderProduct.belongsTo(models.Product);
      OrderProduct.belongsTo(models.StatusOrder);
      OrderProduct.belongsTo(models.User);
    }
  }

  OrderProduct.init(
    { orderQuantity: DataTypes.INTEGER },
    { tableName: "OrderProducts", sequelize }
  );

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
  return OrderProduct;
};
