const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HubSchema = new Schema({
    name: String,
    hub_id: String,
    hub_ip: String,
    hub_user: String,
    hub_type: String, 
    devices: [{
        type: Schema.Types.ObjectId,
        ref: "Device"
    }]
});

const Hub = mongoose.model('Hub', HubSchema);

module.exports = Hub;