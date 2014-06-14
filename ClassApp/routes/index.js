var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'ClassApp' });
});

// Host
router.get('/host', function(req, res) {
  res.render('host', { title: 'Host' });
});

// Client
router.get('/client', function(req, res) {
  res.render('client', { title: 'Client' });
});

module.exports = router;