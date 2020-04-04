recordingController = require('./RecordingController')

module.exports = (router) => {
    router.post('/recording', recordingController.processData)
}