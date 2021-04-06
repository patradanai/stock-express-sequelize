module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      firstname: Sequelize.STRING,
      lastname: Sequelize.STRING,
      email: Sequelize.STRING,
      username: Sequelize.STRING,
      password: Sequelize.STRING,
    },
    {}
  );
  User.associate = (models) => {
    User.belongsToMany(models.Role, { through: "user_roles" });
    User.hasMany(models.Product);
    User.hasMany(models.Supplier);
    User.hasMany(models.StockTransaction);
    User.hasMany(models.StockPlace);
    User.hasMany(models.Supplier);
    User.hasMany(models.OrderProduct);
  };

  return User;
};
