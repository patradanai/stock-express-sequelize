import { Model, DataTypes, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize) => {
  class Product extends Model {
    public id?: number;
    public product: string;
    public productDesc: string;
    public productPrice: string;
    public isActive: string;
    public createdAt?: Date;
    public updatedAt?: Date;

    static associate(models) {
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
    }
  }

  Product.init(
    {
      product: DataTypes.STRING,
      productDesc: DataTypes.STRING,
      productPrice: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
    },
    { tableName: "Products", sequelize }
  );

  // const Product = sequelize.define(
  //   "Product",
  //   {
  //     product: Sequelize.STRING,
  //     productDesc: Sequelize.STRING,
  //     productPrice: Sequelize.STRING,
  //     isActive: Sequelize.BOOLEAN,
  //   },
  //   {}
  // );
  // Product.associate = (models) => {
  //   Product.belongsTo(models.Supplier, {
  //     foreignKey: {
  //       allowNull: false,
  //     },
  //   });
  //   Product.hasMany(models.OrderProduct);
  //   Product.hasOne(models.Stock);
  //   Product.belongsTo(models.User, {
  //     foreignKey: {
  //       allowNull: false,
  //     },
  //   });
  // };

  return Product;
};
