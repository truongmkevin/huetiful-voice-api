const mongoose = require('mongoose')
const mongoUtils = require('../lib/mongo/utils')
const dbConf = process.env.MONGODB_URI || "mongodb://localhost/huetiful-voice-api"

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const commands = process.argv.slice(2);

const UserSeeder = require('./UserSeeder')
const HubSeeder = require('./HubSeeder')

const ClearData = async (conn, enabled = false) => {
    if(!enabled) return;

    const data = await conn.db.listCollections().toArray()

    if(data.length) {
        data.map(async collection => {
            try {
                await conn.db.dropCollection(collection.name)
                console.log(`${collection.name} has been dropped`)
            } catch(e) {
                console.log(e)
            }
        })
            
    }
}
    

const run = async () => {
    const db = await mongoose.connect(dbConf, { useNewUrlParser: true, useUnifiedTopology: true })
    await ClearData(db.connection, commands.includes('--drop-all'))
    await HubSeeder()
    await UserSeeder()
    process.exit(0)
}

run()



