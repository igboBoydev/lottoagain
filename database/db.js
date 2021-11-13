require('dotenv').config();
var Sequelize = require('sequelize');

const db = {};

//Connect to DB
var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {
      //timestamps: false, // true by default
      freezeTableName: true
  }
});

//Check connection to DB
sequelize
  .authenticate()
  .then(() => {
      console.log('Connection has been established successfully.');
  })
  .catch(err => {
      console.error('Unable to connect to the database:', err);
});

//initialize models
db.User = require('../models/user')(sequelize, Sequelize);
db.Oauth = require('../models/oauth')(sequelize, Sequelize);
db.PasswordReset = require('../models/passwordreset')(sequelize, Sequelize);
db.MyBank = require('../models/my_banks')(sequelize, Sequelize);
db.Setting = require('../models/setting')(sequelize, Sequelize);
db.Lotto = require('../models/lotto')(sequelize, Sequelize);
db.Transaction = require('../models/transaction')(sequelize, Sequelize)
db.Bet = require('../models/bet')(sequelize, Sequelize)
db.GameResult = require('../models/game_result')(sequelize, Sequelize)

/////
db.Gameresults = require('../models/Gameresults')(sequelize, Sequelize)
db.LottoExpressOdds = require('../models/LottoExpressOdds')(sequelize, Sequelize)
db.SoftLottoOdds = require('../models/SoftLottoOdds')(sequelize, Sequelize)
/////

//User association
db.User.hasOne(db.PasswordReset, {foreignKey: 'user_id', as: "passwordreset"})
db.User.hasOne(db.MyBank, {foreignKey: 'user_id', as: "my_bank"})

//PasswordReset association
db.PasswordReset.belongsTo(db.User, {foreignKey: 'user_id', as: "passwordresets" })

db.sequelize = sequelize;

//export models
module.exports = db;