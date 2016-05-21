var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

var api = require('marvel-api');

var marvel = api.createClient({
    publicKey:'449cabaa2825ccf6facdc54bfc07a94f',
    privateKey: 'ebbb11d6a982520d38cf0564d7de05583ab9812c'
});

// Body Parser Setup
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static('client'));

var port = process.env.PORT || 8080;

//allow cors
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});


// Setup for Morgan
var logger = require('morgan');
app.use(logger('dev'));


var characterRouter = express.Router();
var comicsRouter = express.Router();
var seriesRouter = express.Router();
var storiesRouter = express.Router();


characterRouter.route('/heroByName/:name')
    .get(function(req, res){
        marvel.characters.findByName(req.params.name, function(err, results){
            if(err) {
                return console.error(err);
            } else {
                res.json({results});
            }
        });
    });

characterRouter.route('/comicsByHeroId/:heroId')
    .get(function(req, res){
        marvel.characters.comics(req.params.heroId, function(err, results){
            if(err) {
                return console.error(err);
            } else {
                res.json({results});
            }
        });
    });

characterRouter.route('/eventsByHeroId/:heroId')
    .get(function(req, res){
        marvel.characters.events(req.params.heroId, function(err, results){
            if(err) {
                return console.error(err);
            } else {
                res.json({results});
            }
        });
    });

characterRouter.route('/storiesByHeroId/:heroId')
    .get(function(req, res){
        marvel.characters.stories('1011334', function(err, results){
            if(err) {
                return console.error(err);
            } else {
                res.json({results});
            }
        });
    });

comicsRouter.route('comicById/:comicId')
    .get(function(req, res){
        marvel.comics.find(req.params.comicId, function(err, results){
            if (err) {
                return console.error(err);
            } else {
                res.json({results});
            }
        });
    });

seriesRouter.route('seriesByTitle/:seriesTitle')
    .get(function(req, res){
        marvel.series.findByTitle(req.params.seriesTitle, function(err, results){
            if (err) {
                return console.error(err);
            } else {
                res.json({results});
            }
        });
    });

seriesRouter.route('seriesById/:seriesId')
    .get(function(req, res){
        marvel.series.find(req.params.seriesId, function(err, results){
            if (err) {
                return console.error(err);
            } else {
                res.json({results});
            }
        });
    });

seriesRouter.route('comicsBySeriesId/:seriesId')
    .get(function(req, res){
        marvel.series.comics(req.params.seriesId, function(err, results){
            if (err) {
                return console.error(err);
            } else {
                res.json({results});
            }
        });
    });

seriesRouter.route('eventsBySeriesId/:seriesId')
    .get(function(req, res){
        marvel.series.events(req.params.seriesId, function(err, results){
            if (err) {
                return console.error(err);
            } else {
                res.json({results});
            }
        });
    });

seriesRouter.route('storiesBySeriesId/:seriesId')
    .get(function(req, res){
        marvel.series.stories(req.params.seriesId, function(err, results){
            if (err) {
                return console.error(err);
            } else {
                res.json({results});
            }
        });
    });

storiesRouter.route('storyById/:storyId')
    .get(function(req, res){
        marvel.stories.find(req.params.storyId, function(err, results){
            if (err) {
                return console.error(err);
            } else {
                res.json({results});
            }
        });
    });

storiesRouter.route('storyByCharacterId/:charId')
    .get(function(req, res){
        marvel.stories.character(req.params.charId, function(err, results){
            if (err) {
                return console.error(err);
            } else {
                res.json({results});
            }
        });
    });



app.use('/character', characterRouter);
app.use('/comics', comicsRouter);
app.use('/series', seriesRouter);
app.use('/stories', storiesRouter);


//catchall route
app.get('/*', function(req, res){
  res.sendFile(process.cwd() +'/client/views/index.html');
});

app.listen(port, function(){
  console.log("Magic on Port " + port);
});