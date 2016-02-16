(function () {
'use strict';

angular.module('todos.services', [])

  .service('dataService', ['$http', function($http) {
    let backAPI = 'http://localhost:3000/todo/';

    this.helloWorld = function() {
      console.log("This is the data service's method!!");
    };

    this.getTodos = function(callback){
      console.log('consulto a :' + backAPI);
      $http.get(backAPI)
        .then(callback)
    };

    this.deleteTodo = function(todo) {
      console.log("The " + todo.name + " todo has been deleted!")
      // other logic
    };

    this.saveTodo = function(todo) {
      console.log("The " + todo.name + " todo has been saved!");
      // other logic...
    };

  }]);
})()
