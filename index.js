
const request = require('request');
var express = require('express');
var bodyParser = require('body-parser');

// Creates express app
const app = express();
// The port used for Express server
const PORT = 3000;
// Starts server

var fs = require('fs');

const GoogleImages = require('google-images');
 
const client = new GoogleImages('005468022246788069363:bxurpxfnjsu', 'AIzaSyBrR7LkeqFFMVVIsZlj6NXfjbVebW3xxls');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', (req, res) => {

    request('http://apiadvisor.climatempo.com.br/api/v1/weather/locale/4970/current?token=f37a348bdf887b2d1832b7840f17ab0f', { json: true }, function (err, response, body) {
        //res.json(body.data.condition);

        console.log(body.data);
        var text = body.data.condition + ' Tempo';
        console.log(text);

        var casaco = 'SIM';
        if(body.data.sensation > 20) {
            casaco = 'NÃO';
        }

        client.search(text)
        .then(images => {
            res.json({imagem: images[0].url, 'usar casaco ? ': casaco});
        });
    })
});

app.listen(process.env.PORT || PORT, function () {
    console.log('Bot is listening on port ' + PORT);
});  