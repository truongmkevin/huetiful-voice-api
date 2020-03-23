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
            res.json(hub.devices.map(device => device.type === 'Light'))
        } catch(err) {
            res.json(err)
        }

    },
    getSensors: async (req, res) => {
        try {
            const hub = await Hub.findById({_id: req.params.hubId}).populate('devices')
            res.json(hub.devices.map(device => device.type === 'Sensor'))
        } catch(err) {
            res.json(err)
        }

    },
    fetchAllLights: async (req, res) => {
        let devices = []
        const deviceHub = await Hub.findById({_id: req.params.hubId})
        const { data } = await HueService.devices.getDevices(deviceHub.hub_ip, deviceHub.hub_user, "lights")
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
    fetchSensors: async (req, res) => {
        let devices = []
        const deviceHub = await Hub.findById({_id: req.params.hubId})
        const { data } = await HueService.devices.getDevices(deviceHub.hub_ip, deviceHub.hub_user, "sensors")
        Object.keys(data).map(key => {
            devices.push({
                device_id: key, 
                name: data[key].name,
                brand: data[key].manufacturername,
                mac: data[key].uniqueid,
                type: "Sensor",
                state: data[key].state,
                hub: req.params.hubId,
                misc: data[key].config
            })
        })

        try {
            const inserted = await Device.insertMany(devices)
            const insertedIds = inserted.map(doc => doc._id)
            await Hub.findByIdAndUpdate({_id: req.params.hubId}, {$push: {devices: insertedIds}})
            res.json({ message: `There were ${devices.length} sensors added to your hub`})
        } catch(e) {
            console.log(e)
            res.status(500).json(e)
        }
    },
    add: (req) => {
        return true
    }
}