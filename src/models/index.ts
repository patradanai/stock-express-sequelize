import * as Sequelize from "sequelize";
import path from "path";
import fs from "fs";

const sequelize = new Sequelize.Sequelize({
  dialect: "sqlite",
  storage: "stock.sqlite",
});
let db: any = {};

// Add Model in db
fs.readdirSync(__dirname)
  .filter((file) => file != "index.ts")
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    db[model.name] = model;
  });

// Init Associate
Object.keys(db).forEach((model) => {
  if (db[model].associate) {
    db[model].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;
