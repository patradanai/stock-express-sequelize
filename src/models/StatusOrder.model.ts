import { Model, DataTypes, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize) => {
  class StatusOrder extends Model {
    public id?: number;
    public statusOrder: string;
    public createdAt?: Date;
    public updatedAt?: Date;

    static associate(models) {
      StatusOrder.hasMany(models.OrderProduct);
    }
  }

  StatusOrder.init(
    { statusOrder: DataTypes.STRING },
    { tableName: "StatusOrders", sequelize }
  );
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
  return StatusOrder;
};
