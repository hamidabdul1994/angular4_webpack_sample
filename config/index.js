'use strict'
// Add App names to apps/appsManifest
const appNames = require('./apps/appsManifest').appNames
const apps = []

appNames.forEach((appObj) => {
  apps.push({webpackConfig : require(`./webpack.dev`)(appObj.appName),route : appObj.route});
});

module.exports = apps
