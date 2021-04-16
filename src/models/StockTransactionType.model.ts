import { Model, DataTypes, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize) => {
  class StockTransactionType extends Model {
    public id?: number;
    public StockTransactionType: string;
    public createdAt?: Date;
    public updatedAt?: Date;

    static associate(models) {
      StockTransactionType.hasMany(models.StockTransaction);
      StockTransactionType.belongsTo(models.User);
    }
  }

  StockTransactionType.init(
    { StockTransactionType: DataTypes.STRING },
    { tableName: "StockTransactionTypes", sequelize }
  );
  // const StockTransactionType = sequelize.define(
  //   "StockTransactionType",
  //   {
  //     type: Sequelize.STRING,
  //   },
  //   {}
  // );

  // StockTransactionType.associate = (models) => {
  //   StockTransactionType.hasMany(models.StockTransaction);
  //   StockTransactionType.belongsTo(models.User);
  // };
  return StockTransactionType;
};
