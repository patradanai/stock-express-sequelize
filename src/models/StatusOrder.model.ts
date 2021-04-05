module.exports = (sequelize, Sequelize) => {
  const StatusOrder = sequelize.define(
    "StatusOrder",
    {
      statusOrder: Sequelize.STRING,
    },
    {}
  );

  StatusOrder.associate = (models) => {
    StatusOrder.hasMany(models.OrderProduct);
  };
  return StatusOrder;
};
