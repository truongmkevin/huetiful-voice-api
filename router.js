const router = require('express').Router({mergeParams: true})
const HueRoutes = require('./controllers/Hue')(router)
const UserRoutes = require('./controllers/User')(router)
const passport = require('./auth/passport')

module.exports = (app) => {
    app.use('/api/hue', passport.authenticate('jwt', {session: false}), HueRoutes)
    app.use('/api/users', UserRoutes)
}