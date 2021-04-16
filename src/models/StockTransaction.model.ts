import { Model, DataTypes, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize) => {
  class StockTransaction extends Model {
    public id?: number;
    public quantity: number;
    public createdAt?: Date;
    public updatedAt?: Date;

    static associate(models) {
      StockTransaction.belongsTo(models.Stock, {
        foreignKey: {
          allowNull: false,
        },
      });
      StockTransaction.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        },
      });
      StockTransaction.belongsTo(models.StockTransactionType, {
        foreignKey: {
          allowNull: true,
        },
      });
    }
  }

  StockTransaction.init(
    { quantity: DataTypes.INTEGER },
    { tableName: "StockTransactions", sequelize }
  );
  // const StockTransaction = sequelize.define(
  //   "StockTransaction",
  //   {
  //     quantity: Sequelize.INTEGER,
  //   },
  //   {}
  // );

  // StockTransaction.associate = (models) => {
  //   StockTransaction.belongsTo(models.Stock, {
  //     foreignKey: {
  //       allowNull: false,
  //     },
  //   });
  //   StockTransaction.belongsTo(models.User, {
  //     foreignKey: {
  //       allowNull: false,
  //     },
  //   });
  //   StockTransaction.belongsTo(models.StockTransactionType, {
  //     foreignKey: {
  //       allowNull: true,
  //     },
  //   });
  // };
  return StockTransaction;
};
