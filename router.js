const router = require('express').Router({mergeParams: true})
const HueRoutes = require('./controllers/HueController')(router)
const UserRoutes = require('./controllers/User')(router)

module.exports = (app) => {
    app.use('/api/hue', HueRoutes)
    app.use('/api/user', UserRoutes)
}