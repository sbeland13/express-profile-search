'use strict';

var express = require('express');
//var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var router = express.Router();
//var users = require('./routes/users');

//Import our Sample Data file 
var testData = require('./data/test_data.json');
var providerList = [];
var countryList = [];
var categoryList = [];
var priceList = [];


//add all possible search variables from data set that we will pass into the search form template 
for (var i =0; i < testData.length; i++) {
  if(providerList.indexOf(testData[i].provider.toString()) === -1) {
  providerList.push(testData[i].provider);
  }
  if(countryList.indexOf(testData[i].country.toString()) === -1) {
  countryList.push(testData[i].country);
  }
  if(categoryList.indexOf(testData[i].category_title.toString()) === -1) {
  categoryList.push(testData[i].category_title);
  }
  
  priceList.push(testData[i].price_cents);
}
var app = express();

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//Import static css & js files from public folder
app.use(express.static(__dirname + '/public'));

// GET home page.
app.get('/', function(req, res, next) {
  res.render('search', { 
    title: 'Profile Searcher',
    providerList: providerList,
    countryList: countryList,
    categoryList: categoryList
  });
});

app.get('/data', function(req, res, next) {
  res.render('search-results', {priceList: priceList});
});

app.post('/search-results', function(req, res, next) {
  // set variables to each form entry value
  var setProvider = req.body.provider;
  var setCountry = req.body.country;
  var setPrice = (req.body.price * 100);
  var setRating = req.body.range;
  var setCategory = req.body.category;
  console.log(req.body.country)
  for (var i = 0; i < testData.length; i++) {
    var score = 0;
    
    if (setProvider == testData[i].provider) {
      score += 20;
    }
    if (setCountry == testData[i].country) {
      score += 20;
    }
    if (setCategory == testData[i].category_title){
      score += 20;
    }
    // handle proportional scoring for rating
    if (setRating == testData[i].ratings) {
      score += 20;
    }else {   
    score += (20 * (1 / (Math.abs(testData[i].ratings - setRating))) );
    }
    
    // handle proportional scoring for price as an absolut percentage difference between the two values
    if ((setPrice) == testData[i].price_cents){
      score += 20; 
    }else {
      var tempPriceList = priceList;
      tempPriceList.push(setPrice);
      tempPriceList = tempPriceList.sort(function (a, b) {  return a - b;  });
      var x = tempPriceList.indexOf(setPrice);
      var y = tempPriceList.indexOf(testData[i].price_cents);

      score += (20 * (1 / Math.abs(x - y)));
      tempPriceList = [];
    }
    
    testData[i].score = Math.round(score);
  }

  res.render('search-results', {
    testData: testData.sort(function(a, b) { 
      return parseFloat(b.score) - parseFloat(a.score); 
    }) 
  });
  
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
