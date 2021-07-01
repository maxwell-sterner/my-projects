var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
const bodyParser = require("body-parser");
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://maxwell:dirtySocks@cluster0.w5cuu.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });

var client_id = 'ecbf7fa2e4714d36835f321f5629bf01'; // Your client id
var client_secret = 'bdec961ec7514f2f8923f5b7c0b35887'; // Your secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

var app = express();
const jsonParser = bodyParser.json();
app.use(cors());

let database =null;
let collection = null;

async function connectDB(){
  await client.connect();
  database = client.db("playlist-creator");
  collection = database.collection("songs");
}
connectDB();

//returns all playlist for the requested user
async function getPlaylists(req,res){
  const userId = req.params.userId;
  let songsCursor = await collection.aggregate(
    [
      {
        $match:
        {
          "userId":userId
        }

      },
      {
        $group:
        {
          _id:"$playlist",
          count:{
            $sum:1
          }
        }
      }
    ]
  );
  let songs = await songsCursor.toArray();
  const response = songs;
  res.json(response);
}
app.get('/playlists/:userId', getPlaylists);



async function getSongs(req,res){
  const userId = req.params.userId;
  const playlist = req.params.playlist;

  let songsCursor = await collection.find(
  {
    "userId":userId,
    playlist:playlist
  });
   
  let songs = await songsCursor.toArray();
  const response = songs;
  res.json(response);
}
app.get('/songs/:userId/:playlist', getSongs);


async function addSong(req,res){
  const userId = req.body.userId;
  const playlist = req.body.playlist;
  const songId = req.body.songId;
  const songName = req.body.songName;
  const artist = req.body.artist;

  const check = await collection.find(
  {
    "userId":userId,
    playlist:playlist,
    "songId":songId
  })

  let checkArr = await check.toArray();
  
  if(checkArr.length == 0){
      const result = await collection.insertOne(
        {
          "userId":userId,
          playlist:playlist,
          "songId":songId,
          name: songName,
          artist: artist
        });
      const response = [{
        "Added": true
      }];
      res.json(response);
  }
  else{
    const response = [{
        "Added": false
      }];
      res.json(response);

  }
    
}

app.post('/add', jsonParser, addSong);

async function deleteSong(req,res){
  const userId = req.body.userId;
  const playlist = req.body.playlist;
  const songId = req.body.songId;

  const result = await collection.deleteOne(
  {
    "userId":userId,
    playlist:playlist,
    "songId":songId
  });

  res.json();
   
}
app.post('/delete', jsonParser, deleteSong);

async function deletePlaylist(req,res){
  const userId = req.body.userId;
  const playlist = req.body.playlist;

  const result = await collection.deleteMany(
  {
    "userId":userId,
    playlist:playlist,
  });

  res.json();
   
}
app.post('/deletePlaylist', jsonParser, deletePlaylist);







//code for verification key
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';



app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email user-read-playback-state';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
        
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('http://localhost:3000/home/' + access_token);
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

console.log('Listening on 8888');
app.listen(8888);
