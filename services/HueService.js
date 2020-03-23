const axios = require('axios')

const HueService = {
    getBaseUrl: function(ip, username, register = false) {
        if(register) return `http://${ip}/api`
        return `http://${ip}/api/${username}`
    },
    getAllHubs: async () => {
        return await axios.get('https://www.meethue.com/api/nupnp')
    },
    testUser: async (hub_ip)  => {
        return await axios.get(`${this.getBaseUrl(hub_ip, null, true)}/newdeveloper`)
    },
    createUserLink: async (app, username, hub_ip) => {
        const postBody = {
            devicetype: `${app}#${username}`
        }

        return await axios.post(`http://${hub_ip}/api`, postBody)
    },
    devices: {
        getDevices: async function(ip, username, type) {
            return await axios.get(`${HueService.getBaseUrl(ip, username)}/${type}`)
        }
    }
}

module.exports = HueService;