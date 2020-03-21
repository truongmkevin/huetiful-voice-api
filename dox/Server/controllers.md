## Controllers

The Controllers for the application are setup in a module-style, with some Rails-like leanings for organization and architecture. 

For each business domain, a Folder will exist as the package, followed by index file whose job it is to pull in all the other sub-controllers, mount them on a router object, and export it for use by the main [Router](routing.md) of the application. 

The folder structure is as follows:

```
controllers
-- ControllerModule
  -- index.js // where all sub controllers meet
  -- SubControllerModule.js
  -- SubControllerModule2.js
```

### index.js
This file will import the other controllers, and mount their routes as resources for router we inject. It will also take care of using the [passport middleware](../Auth/architecture.md) for any auth-enabled routes.

Let's take The User Controller module for example.

```
index.js

const passport = require('../../auth/passport')

const UserController = {}
UserController.Auth = require('./UserAuthenticationController')

module.exports = (router) => {
    router.post('/register', UserController.Auth.register)
    router.post('/login', passport.authenticate('local'), UserController.Auth.login)
    router.post('/logout', UserController.Auth.logout)

    return router
}
```

```
UserAuthenticationController.js

const User = require('../../models/User')

const UserAuthenticationController = {
    register: async (req, res) => {
        const {email, password} = req.body
        const user = await User.findOne({email: email})
        console.log(`user: ${user}`)
        if(user) {
            return res.status(400).json({error: {message: 'User already exists'}})
        }

        try {
            const newUser = new User(req.body)
            newUser.save().then((user) => {
                console.log("user", user)
                res.json(user)
            })
        } catch(e) {
            res.status(400).json({error: {e}})
        }  
    },

    login: async (req, res) => {
        console.log('logged in: ', req.user)
        console.log('passport?', req.session)
        res.json(req.user)
    },

    logout: async (req, res) => {
        if (req.user) {
            req.logout()
            res.json({ msg: 'logging out' })
        } else {
            res.json({ msg: 'no user to log out' })
        }
    }
}

module.exports = UserAuthenticationController
```

We define the handlers for specific functionality in each Sub Controller logic. In this example, the logic for registering a user, logging in and logging out all reside in UserAuthenticationController.js. 

We export this object and import into Index, which creates a master UserController object for all the Controllers to connect under. 

In this index.js file, we export our routes, attaching our Controllers to them in one place. This keeps our specialized logic and handling within a separate file, and all of our Controller level routing in the one place it matters. 

