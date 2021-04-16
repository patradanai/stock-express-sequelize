import { Model, DataTypes, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize) => {
  class Stock extends Model {
    public id?: number;
    public minOrder: number;
    public orderQuantity: number;
    public isAutoOrder: boolean;
    public createdAt?: Date;
    public updatedAt?: Date;

    static associate(models) {
      Stock.belongsTo(models.Product);
      Stock.belongsTo(models.StockPlace);
      Stock.belongsTo(models.User);
      Stock.hasMany(models.StockTransaction);
    }
  }

  Stock.init(
    {
      minOrder: DataTypes.INTEGER,
      orderQuantity: DataTypes.INTEGER,
      isAutoOrder: DataTypes.BOOLEAN,
    },
    { tableName: "Stocks", sequelize }
  );

  // const Stock = sequelize.define(
  //   "Stock",
  //   {
  //     minOrder: Sequelize.INTEGER,
  //     orderQuantity: Sequelize.INTEGER,
  //     isAutoOrder: Sequelize.BOOLEAN,
  //   },
  //   {}
  // );

  // Stock.associate = (models) => {
  //   Stock.belongsTo(models.Product);
  //   Stock.belongsTo(models.StockPlace);
  //   Stock.belongsTo(models.User);
  //   Stock.hasMany(models.StockTransaction);
  // };
  return Stock;
};
