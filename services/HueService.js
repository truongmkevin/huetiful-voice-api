const axios = require('axios')

const HueService = {
    getAllHubs: async () => {
        return await axios.get('https://www.meethue.com/api/nupnp')
    },
    testUser: async (hub_ip)  => {
        return await axios.get(`http://${hub_ip}/api/newdeveloper`)
    },
    createUserLink: async (app, username, hub_ip) => {
        const postBody = {
            devicetype: `${app}#${username}`
        }

        return await axios.post(`http://${hub_ip}/api`, postBody)
    }
}

module.exports = HueService;