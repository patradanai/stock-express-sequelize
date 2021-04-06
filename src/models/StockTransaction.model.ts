module.exports = (sequelize, Sequelize) => {
  const StockTransaction = sequelize.define(
    "StockTransaction",
    {
      quantity: Sequelize.INTEGER,
    },
    {}
  );

  StockTransaction.associate = (models) => {
    StockTransaction.belongsTo(models.Stock);
    StockTransaction.belongsTo(models.StockTransactionType);
    StockTransaction.belongsTo(models.User);
  };
  return StockTransaction;
};
