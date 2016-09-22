var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Profile Searcher' });
});

router.post('/', function (req, res) {
    console.log(req.body.title);
    console.log(req.body.description);
    res.render('search-results', {title: req.body.title, description: req.body.description});
});

module.exports = router;
