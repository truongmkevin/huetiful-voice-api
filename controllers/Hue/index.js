const HueController = {}

/** get all hubs for this account */
HueController.hubs = require('./HueHubsController')

/** modifying a single hub */
HueController.hub = require('./HueHubController')

/** get all devices */
HueController.devices =  require('./HueDevicesController')

/** get single device actions  */
HueController.device = require('./HueDeviceController')


module.exports = (router) => {
    /** hubs */
    router.get('/hubs', HueController.hubs.getAll)
    router.get('/hubs/fetch', HueController.hubs.fetchAll)
    router.get('/hubs/link', HueController.hubs.registerUser)

    /** devices */
    router.get('/hubs/:hubId/lights', HueController.devices.getLights)
    router.get('/hubs/:hubId/lights/fetch', HueController.devices.fetchAllLights)

    /** single device routes */
    router.get('/hubs/:hubId/devices/:deviceId', HueController.device.get)
    router.post('/hubs/:hubId/devices/:deviceId', HueController.device.add)
    router.put('/hubs/:hubId/devices/:deviceId', HueController.device.edit)
    router.delete('/hubs/:hubId/devices/:deviceId', HueController.device.delete)

    return router;
}