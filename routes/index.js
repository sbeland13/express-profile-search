var express = require('express'),
	router = express.Router(),
	search = require('../models/search')



// GET home page and pass-in drop-down list variables
router.get('/', function(req, res) {
  var parameters = search.populateSearchParams(); 
	  res.render('search', { 
		title: 'Profile Searcher',
		providerList: parameters.providers,
		countryList: parameters.countries,
		categoryList: parameters.categories
  });
  
});


router.post('/search-results', function(req, res, next) {
  // define an object containing the form entry values
  var setParameters =  {
      setProvider: req.body.provider,
      setCountry: req.body.country,
      setPrice: req.body.price,
      setRating: req.body.range,
      setCategory: req.body.category
    }
 //generate the scores by passing-in out search parameters
  var calculatedScores = search.scoreCalc(setParameters);
  
  res.render('search-results', {
    testData: calculatedScores.sort(function(a, b) { 
      return parseFloat(b.score) - parseFloat(a.score); 
    }) 
  });
  
});


module.exports = router;	