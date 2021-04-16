import { Model, DataTypes, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize) => {
  class StockPlace extends Model {
    public id?: number;
    public stockPlace: string;
    public createdAt?: Date;
    public updatedAt?: Date;

    static associate(models) {
      StockPlace.hasMany(models.Stock);
      StockPlace.belongsTo(models.User);
    }
  }

  StockPlace.init(
    { stockPlace: DataTypes.STRING },
    { tableName: "StockPlaces", sequelize }
  );
  // const StockPlace = sequelize.define(
  //   "StockPlace",
  //   {
  //     stockPlace: Sequelize.STRING,
  //   },
  //   {}
  // );

  // StockPlace.associate = (models) => {
  //   StockPlace.hasMany(models.Stock);
  //   StockPlace.belongsTo(models.User);
  // };
  return StockPlace;
};
