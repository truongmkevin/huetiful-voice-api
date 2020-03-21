const HueHub = require('../../models/Hub')
const UserModel = require('../../models/User')
const HueService = require('../../services/HueService')

module.exports = {
    fetchAll: async (req, res) => {
        // make request
        const resp = await HueService.getAllHubs()
        if (resp.data.keys()) {
            const hubData = resp.data

            hubData.map(hub => {
                const newHub = new HueHub({
                    hub_id: hub.id,
                    hub_ip: hub.internalipaddress,
                    user_id: "test"
                });
                newHub.save().then(hub => {
                    console.log(hub)
                    UserModel
                        .findByIdAndUpdate({_id: req.params.userId}, {$push: {hubs: hub._id}}).exec((err, data) => console.log(data))
                });
            })

            res.json(resp.data)
        }
    },
    getAll: async (req, res) => {
        const userHubs = await UserModel.findById({_id: req.params.userId}).populate('hubs')
        res.json(userHubs)
    },
    registerUser: async (req, res) => {
        const userHubs = await UserModel.findById({_id: req.params.userId}).populate('hubs')
        const resp = await HueService.createUserLink('app', req.params.userId, userHubs.hubs[0].hub_ip)
        if(resp.data[0].error) {
            // handle errors
            if(resp.data[0].error.type === 101) {
                res.json({'message': 'please push the link button on your hub then link again'})
                return
            } 
        }
        HueHub.findByIdAndUpdate({_id: userHubs.hubs[0]._id}, {$set: {hub_user: resp.data[0].success.username}}).then((err, data) => console.log(err, data))
        res.json(resp.data)
        // }
    }
}