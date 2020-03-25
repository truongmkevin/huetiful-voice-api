const User = require('../../models/User')
const passport = require('passport')
const jwt = require('jsonwebtoken')

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

    login: async (req, res, next) => {
        passport.authenticate('local', async (err, user, info) => {
            try {
                if(err) console.log(err)
                if(info !== undefined) return res.send(info)
                req.login(user, {session: false}, async (error) => {
                    if(error) return next(error)
                    //We don't want to store the sensitive information such as the
                    //user password in the token so we pick only the email and id
                    const body = {_id: user._id, email: user.email};
                    //Sign the JWT token and populate the payload with the user email and id
                    const token = jwt.sign({ user : body },'top_secret');
                    //Send back the token to the user
                    return res.json({token});
                });     
            } catch (error) {
              return next(error);
            }
        })(req, res, next)
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