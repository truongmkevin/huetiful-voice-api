const HueHub = require('../../models/Hub')
const UserModel = require('../../models/User')
const HueService = require('../../services/HueService')

module.exports = {
    /**
     * get a single hub
     */
    get: (req, res) => {
        const hubId = req.params.id
        res.send(hubId)
    }
}