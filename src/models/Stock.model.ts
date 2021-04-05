module.exports = (sequelize, Sequelize) => {
  const Stock = sequelize.define(
    "Stock",
    {
      quantity: Sequelize.INTEGER,
      minOrder: Sequelize.INTEGER,
      orderQuantity: Sequelize.INTEGER,
      isAutoOrder: Sequelize.BOOLEAN,
    },
    {}
  );

  Stock.associate = (models) => {
    Stock.belongsTo(models.Product);
    Stock.belongsTo(models.StockPlace);
    Stock.hasMany(models.StockTransaction);
  };
  return Stock;
};
