'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://localhost:8088"'
  // BASE_API: '"http://192.168.150.128:8089/cloudnote-admin"'
  BASE_API: '"http://92ym7x.natappfree.cc/cloudnote-admin"'
})
