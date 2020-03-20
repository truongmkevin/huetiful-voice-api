const router = require('express').Router({mergeParams: true})
const HueRoutes = require('./controllers/Hue/HueController')(router)

module.exports = (app) => {
    app.use('/api/user/:userId/hue', HueRoutes)
}