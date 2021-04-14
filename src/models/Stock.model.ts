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
    Stock.belongsTo(models.Product, {
      foreignKey: {
        allowNull: false,
      },
    });
    Stock.belongsTo(models.StockPlace, {
      foreignKey: {
        allowNull: false,
      },
    });
    Stock.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    Stock.hasMany(models.StockTransaction);
  };
  return Stock;
};
