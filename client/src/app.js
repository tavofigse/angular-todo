(function () {

var angular = require('angular'),
    controllers = require('./controllers/main'),
    directives = require('./directives/todos'),
    services = require('./services/data')


  angular.module('todos', [
      'todos.controllers',
      'todos.directives',
      'todos.services'
    ])
})();
