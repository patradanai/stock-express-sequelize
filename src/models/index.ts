import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "stock.sqlite",
  models: [__dirname + "/**/*.model.ts"],
});

// let db = {};

// Add Model in db
// fs.readdirSync(__dirname)
//   .filter((file) => file != "index.ts")
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(sequelize);
//     db[model.name] = model;
//   });

// Init Associate
// Object.keys(db).forEach((model) => {
//   if (db[model].associate) {
//     db[model].associate(db);
//   }
// });

export default sequelize;
