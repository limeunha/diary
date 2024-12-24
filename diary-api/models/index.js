const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require('../config/config')[env]

const User = require('./user')
const Diary = require('./diary')

const db = {}
const sequelize = new Sequelize(config.database, config.username, config.password, config)

db.sequelize = sequelize
db.User = User
db.Diary = Diary

User.init(sequelize)
Diary.init(sequelize)

User.associate(db)
Diary.associate(db)

module.exports = db
