module.exports = (sequelize, Sequelize) => {
  const Supplier = sequelize.define(
    "Supplier",
    {
      supplier: Sequelize.STRING,
      phone: Sequelize.STRING,
      email: Sequelize.STRING,
    },
    {}
  );

  Supplier.associate = (models) => {
    Supplier.hasMany(models.Product);
  };
  return Supplier;
};
