const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
    device_id: String,
    name: String,
    mac: String,
    active: Boolean,
    state: Object,
    type: String,
    brand: String,
    hub: String,
    misc: Object
});

const Device = mongoose.model('Device', DeviceSchema);

module.exports = Device;