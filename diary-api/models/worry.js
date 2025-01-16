const Sequelize = require('sequelize')

module.exports = class Worry extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            title: {
               type: Sequelize.STRING(100),
               allowNull: false,
            },
            content: {
               type: Sequelize.TEXT,
               allowNull: false,
            },
         },
         {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Worry',
            tableName: 'Worries',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }

   static associate(db) {
      db.Worry.belongsTo(db.User, { foreignKey: 'userId' })
   }
}
