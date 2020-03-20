const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HueHubSchema = new Schema({
    name: String,
    hub_id: String,
    hub_ip: String
});

const HubModel = mongoose.model('HueHub', HueHubSchema);

module.exports = HubModel;