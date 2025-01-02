const passport = require('passport')
const local = require('./localStrategy')
const { User } = require('../models')

module.exports = () => {
   passport.serializeUser((user, done) => {
      done(null, user.id)
   })

   passport.deserializeUser(async (id, done) => {
      try {
         const user = await User.findOne({
            where: { id },
            attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
         })

         if (!user) {
            return done(new Error('User not found'), null)
         }

         return done(null, user)
      } catch (err) {
         return done(err, null)
      }
   })

   local()
}
