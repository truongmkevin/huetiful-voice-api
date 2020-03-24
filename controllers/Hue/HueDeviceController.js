const Hub = require('../../models/Hub')
const User = require('../../models/User')
const Device = require('../../models/Device')

const HueService = require('../../services/HueService')

module.exports = {
    /**
     * body signature
     * 
     * {
     *  on: Boolean - sets light on or off
     *  bri: Integer - Range(1, 254) scale of brightness
     *  hue: Integer - Range(1, 65536) 16-bit scale of color
     *  sat: Integer - Range(1, 254) 8-bit scale of saturation (1 is white, 254 is full color)
     *  alert: String - Temporary alert/breathing light setting ("none", "select" (once), "lselect" (15 seconds))
     *  effect: String - only "none" and "colorloop" is accepted
     *  transitiontime: Integer - multiple of 100ms to transition to new state. (4 = 400ms, which is the default)
     *  
     * }
     */
    setState: async (req, res) => {
        const {state} = req.body

        try {
            const device = await Device.findById({_id: req.params.deviceId})
            const hub = await Hub.findById({_id: req.params.hubId})
            const resp = HueService.setDeviceState(hub.hub_ip, hub.hub_user, `${device.type}s`, device.device_id, state)

            if(resp.data[0].error) {
                if(resp.data[0].error.type === 7) {
                    return res.status(400).json({error: {message: 'The effect value is incorrect. Please use "none" or "colorloop"' }})
                }
            }

            const response = {
                message: 'Your light state has successfully changed',
                status: resp.data.map(status => status.success)
            }

            await Device.update({device_id: device.device_id}, {state: state})
            return res.json(response)
        } catch(e) {
            return res.status(500).json(e)
        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             mDevice.findOne({device_id: req.params.deviceId})
    },

    delete: async (req, res) => {
        try {
            const device = await Device.findById({_id: req.params.deviceId})
            const hub = await Hub.findById({_id: req.params.hubId})
            const resp = await HueService.deleteDevice(hub.hub_ip, hub.hub_user, `${device.type}s`, device.device_id, state)

            if(resp.data.status === 200 || resp.data.status === 204) {
                device.remove()
                return res.json(resp.data)
            }
        } catch (e) {
            res.status(400).json(e)
        }
    }
}