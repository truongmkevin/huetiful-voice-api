const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
    name: String,
    status: String,
    active: Boolean,
    state: Integer,
    type: String,
    hubs: [
        {
            type: Schema.Types.ObjectId,
            ref: "Hub"
        }
    ]
});

const Device = mongoose.model('Device', DeviceSchema);

module.exports = Device;