/**
 * Module dependencies
**/
var express = require('express'),
    logger  = require('./api/logger'),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    cors        = require('cors'),
    todoRoutes  = require('./api/todos')


/**
 * LOCALS VARS
**/
var server  = module.exports = express()
var port    = process.env.PORT || 3000


/**
 * ROUTER
**/
server.use(todoRoutes)


/**
 * CONFIGURATIONS
 *
 * enable request origin form localhost
**/
server.use(cors({allowedOrigins: ['localohst']}))
/**
 * parse json requests
**/
server.use(bodyParser.json('application/json'))
/**
 * where are the assets?
**/
server.use(express.static('client/public'))


/**
 * START SERVER if we're not someone else's dependency
**/
if (!module.parent) {
  mongoose.connect('mongodb://localhost/angular_todos', function() {
    server.listen(port, function() {
      logger.info('Server on http://localhost:%s/', port)
    })
  })
}
