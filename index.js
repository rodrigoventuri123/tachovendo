
const request = require('request');
var express = require('express');
var bodyParser = require('body-parser');

// Creates express app
const app = express();
// The port used for Express server
const PORT = 3000;
// Starts server

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', (req, res) => {

    request('http://apiadvisor.climatempo.com.br/api/v1/weather/locale/4970/current?token=f37a348bdf887b2d1832b7840f17ab0f', { json: true }, function (err, response, body) {
        res.json(body.data.condition);
    })
});

app.listen(process.env.PORT || PORT, function () {
    console.log('Bot is listening on port ' + PORT);
});  