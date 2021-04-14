module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define(
    "Product",
    {
      product: Sequelize.STRING,
      productDesc: Sequelize.STRING,
      productPrice: Sequelize.STRING,
      isActive: Sequelize.BOOLEAN,
    },
    {}
  );
  Product.associate = (models) => {
    Product.belongsTo(models.Supplier, {
      foreignKey: {
        allowNull: false,
      },
    });
    Product.hasMany(models.OrderProduct);
    Product.hasOne(models.Stock);
    Product.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Product;
};
