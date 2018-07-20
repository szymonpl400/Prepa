const express = require('express');
const request = require('request');
const app = express();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const PORT = process.env.PORT || 8888;

const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
};

app.use(express.static(__dirname + '/client/dist'));

app.get('/auth', (req, res) => {
    request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            res.send({
                success: true,
                accessToken: body.access_token,
                expiresIn: body.expires_in
            });
        }
        else {
            res.send({
                success: false,
                accessToken: null,
                expiresIn: 0
            });
        }
    });
});

console.log('Listening on 8888');
app.listen(PORT);