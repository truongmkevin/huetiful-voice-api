const Hub = require('../../models/Hub')
const User = require('../../models/User')
const Device = require('../../models/Device')

const HueService = require('../../services/HueService')

module.exports = {
    getAll: (req, res) => {
        return true
    },
    getLights: async (req, res) => {
        try {
            const hub = await Hub.findById({_id: req.params.hubId}).populate('devices')
            res.json(hub.devices)
        } catch(err) {
            res.json(err)
        }

    },
    fetchAllLights: async (req, res) => {
        let devices = []
        const deviceHub = await Hub.findById({_id: req.params.hubId})
        const { data } = await HueService.devices.getLights(deviceHub.hub_ip, deviceHub.hub_user)
        console.log(typeof data)
        Object.keys(data).map(key => {
            devices.push({
                device_id: key, 
                name: data[key].name,
                brand: data[key].manufacturername,
                mac: data[key].uniqueid,
                type: "Light",
                state: data[key].state,
                hub: req.params.hubId,
                misc: data[key].capabilities
            })
        })

        try {
            const inserted = await Device.insertMany(devices)
            const insertedIds = inserted.map(doc => doc._id)
            await Hub.findByIdAndUpdate({_id: req.params.hubId}, {$push: {devices: insertedIds}})
            res.json({ message: `There were ${devices.length} lights added to your hub`})
        } catch(e) {
            console.log(e)
        }
    },
    add: (req) => {
        return true
    }
}