var express = require('express');
var path = require('path');
// var open = require('open');
var webpack = require('webpack');
var configs = require('./webpack.config');

/* eslint-disable no-console */

const port = process.env.PORT || 4200;
const app = express();
// const compiler = webpack(config);
configs.forEach(function (config) {
    app.use(config.route,require('webpack-dev-middleware')(webpack(config.webpackConfig), {
      noInfo: true,
      publicPath: config.webpackConfig.output.publicPath
    }));
});

app.get('/users', function(req, res) {
  // Hard coding for simplicity. Pretend this hits a real database
  res.json([
    {"id": 1,"firstName":"Bob","lastName":"Smith","email":"bob@gmail.com"},
    {"id": 2,"firstName":"Tammy","lastName":"Norton","email":"tnorton@yahoo.com"},
    {"id": 3,"firstName":"Tina","lastName":"Lee","email":"lee.tina@hotmail.com"}
  ]);
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    // open('http://localhost:' + port);
  }
});
