module.exports.start = function start(callback) {
  const express = require('express');
  const path = require('path');
  const http = require('http');
  var favicon = require('serve-favicon');
  const bodyParser = require('body-parser');
  var cookieParser = require('cookie-parser');
  var morgan = require('morgan');
  const helmet = require('helmet');
  const bluebird = require('bluebird');

  const app = express();

  app.use(favicon("dist/favicon.ico")); 

  process.on('uncaughtException', function (err) {
      console.error(err);
  });

  app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "authorization,content-type,cache-control");
      next();
  });
  
  app.use(morgan('tiny'));
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '/dist')));
  app.get('*', (req, res) => { res.sendFile(path.join(__dirname, '/dist/index.html')); });

  app.listen(process.env.PORT || 8080);
}; 