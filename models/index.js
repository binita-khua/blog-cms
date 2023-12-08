const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.user = require('./user.js')(sequelize, Sequelize);
db.post = require('./post.js')(sequelize, Sequelize);
db.comment = require('./comment.js')(sequelize, Sequelize);

// Define relationships
db.post.belongsTo(db.user);
db.comment.belongsTo(db.user);
db.comment.belongsTo(db.post);

module.exports = db;
