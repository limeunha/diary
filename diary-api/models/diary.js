const Sequelize = require('sequelize')

module.exports = class Diary extends Sequelize.Model {
   static init(sequelize) {
      return super.init()
   }
   static associate(db) {}
}
