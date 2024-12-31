const passport = require('passport')
const local = require('./localStrategy')
const { User } = require('../models')

module.exports = () => {
   passport.serializeUser((user, done) => {
      done(null, user.id)
   })

   passport.deserializeUser((id, done) => {
      User.findOne({
         where: { id },
         attributes: ['id', 'nick', 'email', 'createdAt', 'updatedAt'],
         include: [
            {
               model: User,
               as: 'Followings',
               attributes: ['id', 'nick', 'email'],
               through: { attributes: [] },
            },
         ],
      })
         .then((user) => done(null, user))
         .catch((err) => done(err))
   })

   local()
}
