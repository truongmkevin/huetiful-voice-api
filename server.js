const express = require ('express');
const session = require('express-session')
const bodyParser = require ('body-parser');
const passport = require('./auth/passport');

const mongoose = require ('mongoose');
mmongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json()) 
// Sessions
app.use(
	session({
		secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
		resave: false, //required
		saveUninitialized: false //required
	})
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser

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