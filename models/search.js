var _ = require('lodash');

//Import our Sample Data file 
var testData = require('./data/test_data.json');



//populate the unique values that will be passed into the search form
exports.populateSearchParams = function() {

	var searchParams = {
		providers: [],
		countries: [],
		categories : [],
		prices : []
		}
//run through each user object and populate the parameter arrays 

	for (var i =0; i < testData.length; i++) {
		searchParams.providers.push(testData[i].provider);	
		searchParams.countries.push(testData[i].country);
		searchParams.categories.push(testData[i].category_title);
		searchParams.prices.push(testData[i].price_cents);
				
	}
// remove duplicates in these parameter arrays
	searchParams.providers = _.uniq(searchParams.providers);
	searchParams.countries = _.uniq(searchParams.countries);
	searchParams.categories = _.uniq(searchParams.categories);


	return searchParams;
}

// compute the match score for each user profile

exports.scoreCalc = function(formParams) {
	for (var i = 0; i < testData.length; i++) {
		var score = 0;
		
		if (formParams.setProvider == testData[i].provider) {
		score += 20;
		}
		if (formParams.setCountry == testData[i].country) {
		score += 20;
		}
		if (formParams.setCategory == testData[i].category_title){
		score += 20;
		}
		// handle proportional scoring for rating
		if (formParams.setRating == testData[i].ratings) {
		score += 20;
		}else {   
		score += (20 * (1 / (Math.abs(testData[i].ratings - formParams.setRating))) );
		}
		
		// handle proportional scoring for price as an absolut percentage difference between the two values
		if ((formParams.setPrice) == testData[i].price_cents){
		score += 20; 
		}else {
		var tempPriceList = exports.populateSearchParams().prices;
		tempPriceList.push(formParams.setPrice);
		tempPriceList = tempPriceList.sort(function (a, b) {  return a - b;  });
		var x = tempPriceList.indexOf(formParams.setPrice);
		var y = tempPriceList.indexOf(testData[i].price_cents);

		score += (20 * (1 / Math.abs(x - y)));
		
		}
    
    testData[i].score = Math.round(score);

  }
  return testData;
}