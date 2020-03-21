const faker = require('faker')
const Hub = require('../models/Hub')
const utils = require('../lib/mongo/utils')

module.exports = async () => {

    let hubs = new Array(20).fill(null)
            .map((hub, i) => hub = {
                hub_id: utils.generateObjectId(),
                hub_ip: faker.internet.ip(),
                name: faker.internet.mac(),
                hub_user: utils.generateObjectId(),
                hub_type: 'Hue',
            })
            
    try {
        await Hub.insertMany(hubs)
        console.log("hubs seeded")
    } catch(e) {
        console.log(e)
    }
    
}