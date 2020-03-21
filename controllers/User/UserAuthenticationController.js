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