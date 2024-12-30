const Sequelize = require('sequelize')

module.exports = class Diary extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            title: {
               type: Sequelize.STRING(255),
               allowNull: false,
            },
            content: {
               type: Sequelize.TEXT,
               allowNull: false,
            },
            authorId: {
               type: Sequelize.INTEGER,
               allowNull: false,
               references: {
                  model: 'Users',
                  key: 'id',
               },
            },
            img: {
               type: Sequelize.STRING(200),
               allowNull: true,
            },
         },
         {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Diary',
            tableName: 'diaries',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }

   static associate(db) {
      this.belongsTo(db.User, { foreignKey: 'authorId', targetKey: 'id' })
   }
}
