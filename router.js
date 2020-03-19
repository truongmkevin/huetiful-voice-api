const router = require('express').Router()
const HueRoutes = require('./controllers/HueController')(router)

module.exports = (app) => {
    app.use('/api/hue', HueRoutes)
}