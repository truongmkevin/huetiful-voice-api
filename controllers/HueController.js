const axios = require('axios')
const HueHub = require('../models/Hub');
const HueService = require('../services/HueService')

const HueController = {
    /** demo route */
    // index: () => HueService.fetchAll(),

    /** get all hubs for this account */
    hubs: {
        getAll: async (req, res) => {
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
                    newHub.save();
                })

                res.json(resp.data)
            }
        }
    },

    /** 
     * modifying a single hub  
     * */
    hub: {

        /**
         * get a single hub
         */
        get: (req, res) => {
            const hubId = req.params.id
            res.send(hubId)
        }
    },

    /** get all devices */
    devices: {
        getAll: (req, res) => {
            return true
        },
        add: (req) => {
            return true
        }
    },

    /** get single device actions  */
    device: {
        get: (req, res) => res.send(req.params.id),
        add: (req, res) => res.send(req.body),
        edit: (req, res) => res.send(req.body),
        delete: (req, res) => res.send(req.params.id)
    }
}

module.exports = (router) => {
    /**  */
    // router.get('/', HueController.index)

    /** hubs */
    router.get('/hubs', HueController.hubs.getAll)
    
    /** single device routes */
    router.get('/devices/:id', HueController.device.get)
    router.post('/devices/:id', HueController.device.add)
    router.put('/devices/:id', HueController.device.edit)
    router.delete('/devices/:id', HueController.device.delete)

    return router;
}