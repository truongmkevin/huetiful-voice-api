const mongoose = require('mongoose')
const mongoUtils = require('../lib/mongo/utils')
const dbConf = process.env.MONGODB_URI || "mongodb://localhost/huetiful-voice-api"

const UserSeeder = require('./UserSeeder')
const HubSeeder = require('./HubSeeder')

const ClearData = async (conn) => {
    const data = await conn.db.listCollections().toArray()

    if(data.length) {
        data.map(collection => {
            conn.db.dropCollection(collection.name)
            console.log(`${collection.name} has been dropped`)
        })
            
    }
}
    

const run = async () => {
    const db = await mongoose.connect(dbConf, { useNewUrlParser: true, useUnifiedTopology: true })
    await ClearData(db.connection)
    await HubSeeder()
    await UserSeeder()
    process.exit(0)
}

run()



