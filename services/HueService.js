const axios = require('axios')

const HueService = {
    getAllHubs: async () => {
        return await axios.get('https://www.meethue.com/api/nupnp')
    }
}

module.exports = HueService;