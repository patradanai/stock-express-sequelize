module.exports = (sequelize, Sequelize) => {
  const OrderProduct = sequelize.define(
    "OrderProduct",
    {
      orderQuantity: Sequelize.INTEGER,
    },
    {}
  );

  OrderProduct.associate = (models) => {
    OrderProduct.belongsTo(models.Product);
    OrderProduct.belongsTo(models.StatusOrder);
  };
  return OrderProduct;
};
