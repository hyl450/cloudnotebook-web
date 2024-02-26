'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://localhost:8088"'
  // BASE_API: '"http://192.168.91.130:8088"'
  BASE_API: '"http://192.168.91.130:8089/cloudnote-admin"'
  // BASE_API: '"http://g25eg8.natappfree.cc/cloudnote-admin"'
})
