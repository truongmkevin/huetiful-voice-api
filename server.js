const express = require ('express');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');
const PORT = process.env.PORT || 3001;

const app = express();

require('./router')(app);
app.get('/testroute', (req, res) => {
  res.send("Hello, Huetiful Voice!");
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/huetiful-voice-api", { useNewUrlParser: true })
  .then(() => {
    console.log("Connection to DB successful.");
    app.listen(PORT, function() {
      console.log(`API Server now listening on PORT ${PORT}!`);
    });
  })
  .catch(err => {
    if(err) throw err;
  });


  app.listen(PORT, () => {
    console.log('running');
  })