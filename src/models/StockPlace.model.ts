module.exports = (sequelize, Sequelize) => {
  const StockPlace = sequelize.define(
    "StockPlace",
    {
      stockPlace: Sequelize.STRING,
    },
    {}
  );

  StockPlace.associate = (models) => {
    StockPlace.hasMany(models.Stock);
  };
  return StockPlace;
};
