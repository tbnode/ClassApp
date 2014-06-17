var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Welcome to ClassApp' });
});

// Host
router.get('/host', function(req, res) {
  res.render('host', { title: 'Voting Room :: ClassApp' });
});

// Client
router.get('/client', function(req, res) {
  var pageTitle = req.query.username + '\'s Estimate :: ClassApp';
  res.render('client', { title: pageTitle });
});

module.exports = router;