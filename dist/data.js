'use strict';

var todoListApp = angular.module('todoListApp');


todoListApp.service('dataService', ['$http', function($http) {
  this.helloWorld = function() {
    console.log("This is the data service's method!!");
  };

  this.getTodos = function(callback){
    $http.get('mock/todos.json')
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
