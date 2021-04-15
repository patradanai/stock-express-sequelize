module.exports = (sequelize, Sequelize) => {
  const StockTransaction = sequelize.define(
    "StockTransaction",
    {
      quantity: Sequelize.INTEGER,
    },
    {}
  );

  StockTransaction.associate = (models) => {
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
  };
  return StockTransaction;
};
