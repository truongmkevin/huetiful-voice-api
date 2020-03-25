const passport = require('../../auth/passport')

const UserController = {}
UserController.Auth = require('./UserAuthenticationController')

module.exports = (router) => {
    router.post('/register', UserController.Auth.register)
    router.post('/login', UserController.Auth.login)
    router.post('/logout', UserController.Auth.logout)

    return router
}