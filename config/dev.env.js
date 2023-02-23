'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://localhost:8088"'
  BASE_API: '"http://192.168.150.128:8088"'
  // BASE_API: '"http://172.23.16.144:8087/cloudnote-api"'
})
