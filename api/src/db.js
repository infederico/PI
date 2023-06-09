require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const database = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/food`, {
  logging: false, // set to true to console.log and see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(database));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(database.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
database.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Recipe } = database.models;
const { Diet } = database.models;
const { User } = database.models;
const { Favorite } = database.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Recipe.belongsToMany(Diet, { through: 'Recipe_Diet' });
Diet.belongsToMany(Recipe, { through: 'Recipe_Diet' });

User.belongsToMany(Favorite, { through: 'User_Favorite' });
Favorite.belongsToMany(User, { through: 'User_Favorite' });
Favorite.belongsToMany(Diet, { through: 'Favorite_Diet' });
Diet.belongsToMany(Favorite, { through: 'Favorite_Diet' });

module.exports = {
  ...database.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: database,     // para importart la conexión { conn } = require('./db.js');
};
