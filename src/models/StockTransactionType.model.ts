module.exports = (sequelize, Sequelize) => {
  const StockTransactionType = sequelize.define(
    "StockTransactionType",
    {
      type: Sequelize.STRING,
    },
    {}
  );

  StockTransactionType.associate = (models) => {
    StockTransactionType.hasMany(models.StockTransaction);
  };
  return StockTransactionType;
};
