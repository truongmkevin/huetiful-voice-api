const HueService = require('../services/HueService')
const axios = require('axios')

const HueController = {
    index: () => HueService.fetchAll(),
    hubs: {
        getAll: (req, res) => axios.get('https://www.meethue.com/api/nupnp').then(resp => res.json(resp.data))
    },
    devices: {
        getAll: (req, res) => {
            return true
        },
        add: (req) => {
            return true
        }
    },
    device: {
        get: (req, res) => res.send(req.params.id),
        add: (req, res) => res.send(req.body),
        edit: (req, res) => res.send(req.body),
        delete: (req, res) => res.send(req.params.id)
    }
}

module.exports = (router) => {
    /**  */
    router.get('/', HueController.index)

    /** hubs */
    router.get('/hubs', HueController.hubs.getAll)
    
    /** single device routes */
    router.get('/devices/:id', HueController.device.get)
    router.post('/devices/:id', HueController.device.add)
    router.put('/devices/:id', HueController.device.edit)
    router.delete('/devices/:id', HueController.device.delete)

    return router;
}