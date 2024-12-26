const Sequelize = require('sequelize')

module.exports = class Diary extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            // 일기 내용
            content: {
               type: Sequelize.TEXT,
               allowNull: false,
               validate: {
                  notEmpty: {
                     msg: '일기 내용은 비어 있을 수 없습니다.',
                  },
                  len: {
                     args: [1, 5000],
                     msg: '일기 내용은 최소 1자에서 최대 5000자까지 입력할 수 있습니다.',
                  },
               },
            },
            // 이미지 경로 및 파일명
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

   static associate(db) {}
}
