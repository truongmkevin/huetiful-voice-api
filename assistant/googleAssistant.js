// Gain access to node events to manually fire them 
const events = require('events');
let eventEmitter = new events.EventEmitter();

const path = require('path');
const GoogleAssistant = require('google-assistant');
const config = {
    auth: {
        keyFilePath: path.resolve(__dirname, 'YOUR_API_KEY_FILE_PATH.json'),
        // where you want the tokens to be saved
        // will create the directory if not already there
        savedTokensPath: path.resolve(__dirname, 'tokens.json'),
        // you can also pass an oauth2 client instead if you've handled
        // auth in a different workflow. This trumps the other params.
        oauth2Client: YOUR_CLIENT,
    },
    // this param is optional, but all options will be shown
    conversation: {
        audio: {
            encodingIn: 'LINEAR16', // supported are LINEAR16 / FLAC (defaults to LINEAR16)
            sampleRateIn: 16000, // supported rates are between 16000-24000 (defaults to 16000)
            encodingOut: 'LINEAR16', // supported are LINEAR16 / MP3 / OPUS_IN_OGG (defaults to LINEAR16)
            sampleRateOut: 24000, // supported are 16000 / 24000 (defaults to 24000)
        },
        lang: 'en-US', // language code for input/output (defaults to en-US)
        deviceModelId: 'xxxxxxxx', // use if you've gone through the Device Registration process
        deviceId: 'xxxxxx', // use if you've gone through the Device Registration process
        deviceLocation: {
            coordinates: { // set the latitude and longitude of the device
                latitude: xxxxxx,
                longitude: xxxxx,
            },
        },
        textQuery: 'What time is it?', // if this is set, audio input is ignored
        isNew: true, // set this to true if you want to force a new conversation and ignore the old state
        screen: {
            isOn: true, // set this to true if you want to output results to a screen
        },
    },
};

const assistant = new GoogleAssistant(config.auth);

// starts a new conversation with the assistant
const startConversation = (conversation) => {
    // setup the conversation and send data to it
    // for a full example, see `examples/mic-speaker.js`

    conversation
        .on('audio-data', (data) => {
            // do stuff with the audio data from the server
            // usually send it to some audio output / file
            console.log(`googleAssistant.js:53
            got audio data`)
        })
        .on('end-of-utterance', () => {
            // do stuff when done speaking to the assistant
            // usually just stop your audio input
            console.log(`googleAssistant.js:59
            got an utterance`)
        })
        .on('transcription', (data) => {
            // do stuff with the words you are saying to the assistant
            console.log(`googleAssistant.js:64
            transctiption happened`)
        })
        .on('response', (text) => {
            // do stuff with the text that the assistant said back
            console.log(`googleAssistant.js:69
            assistant response event`)
        })
        .on('volume-percent', (percent) => {
            // do stuff with a volume percent change (range from 1-100)
            console.log(`googleAssistant.js:74
            volume change event
            ${percent}`)
        })
        .on('device-action', (action) => {
            // if you've set this device up to handle actions, you'll get that here
            console.log(`googleAssistant.js:80
            action event
            ${action}`)
        })
        .on('screen-data', (screen) => {
            // if the screen.isOn flag was set to true, you'll get the format and data of the output
            console.log(`googleAssistant.js:86
            screenisOn flag set to true
            ${screen}`)
        })
        .on('ended', (error, continueConversation) => {
            // once the conversation is ended, see if we need to follow up
            if (error) console.log('Conversation Ended Error:', error);
            else if (continueConversation) assistant.start();
            else console.log('Conversation Complete');
        })
        .on('error', error => console.error(error));
};

// will start a conversation and wait for audio data
// as soon as it's ready
assistant
    .on('ready', () => assistant.start(config.conversation))
    .on('started', startConversation);