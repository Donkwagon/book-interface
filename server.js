
var express =         require("express");
var bodyParser =      require("body-parser");
var mongoose =        require('mongoose');
var http =            require('http');

//////////////////////////////////////////
//Initialize app and start express server
var app = express();
app.use(bodyParser.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

const server = http.createServer(app);

server.listen(process.env.PORT || 8080, function (err) {
    if (err) {console.log(err);process.exit(1);}
    var port = server.address().port;
    console.log("App now running on port",port);
});
//////////////////////////////////////////


//////////////////////////////////////////
//Connect to mongoose db
// Use native promises
var MongoDbConStr = "mongodb://donkw:Idhap007@ds111204.mlab.com:11204/heroku_rvmvn6sz";
global.db = mongoose.createConnection(MongoDbConStr);

//////////////////////////////////////////


//////////////////////////////////////////
//Connect to io
var io = require('socket.io').listen(server.listen(8080));

io.sockets.on('connection', function (socket) {
    console.log('client connect');
    socket.on('echo', function (data) {
        io.sockets.emit('message', data);
    });
});

global.io = io;
//////////////////////////////////////////

const apis = require('./server/routes/apis');
app.use('/apis',apis);

module.exports = app;