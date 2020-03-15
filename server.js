const express = require ('express');
const bodyParser = require ('body-parser');
const PORT = process.env.PORT || 3001;

const app = express();

app.get('/testroute', (req, res) => {
  res.send("Hello, Huetiful Voice!");
})

app.listen(PORT, function() {
  console.log(`API Server now listening on PORT ${PORT}!`);
});