const faker = require('faker')
const User = require('../models/User')
const Hub = require('../models/Hub')

module.exports = async () => {

    /**
     * Grab hub ids to populate users with matching hub seeds
     */
    const hubs = await Hub.find().exec()

    /**
     * Seed users with related hue hub ids and faker data
     */
    const users = new Array(20)
                .fill(null)
                .map((obj, i) => 
                    obj =  {
                        first_name: faker.name.firstName(),
                        last_name: faker.name.lastName(),
                        email: faker.internet.email(),
                        password: '0AbCdEf%',
                        hubs: [hubs[i]._id || null]
                    })
    
    try {
        await User.insertMany(users)
        console.log("users seeded")
    } catch(e) {
        console.log(e)
    }
    
}