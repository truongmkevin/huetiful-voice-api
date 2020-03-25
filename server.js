const express = require ('express');
const session = require('express-session')
const passport = require('./auth/passport');
const cors = require('cors');

const mongoose = require ('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json()) 
app.use(cors())

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

// CORS
app.use(cors())

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