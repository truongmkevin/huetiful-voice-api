const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HueHubSchema = new Schema({
    hub_id: String,
    hub_ip: String,
    user_id: String
});

const HubModel = mongoose.model('HueHub', HueHubSchema);

module.exports = HubModel;