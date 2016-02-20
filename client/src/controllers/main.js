(function () {
'use strict';

angular.module('todos.controllers', [])

  .controller('mainCtrl', ['$scope', 'dataService', main])

  function main($scope, dataService) {
    $scope.addTodo = function() {
      var todo = {name: "This is a new todo."};
      $scope.todos.unshift(todo);
    };

    $scope.helloWorld = dataService.helloWorld;

    dataService.getTodos(function(response) {
        $scope.todos = response.data.todo;
      });

    $scope.deleteTodo = function(todo, $index) {
      dataService.deleteTodo(todo);
      $scope.todos.splice($index, 1);
    };

    $scope.saveTodo = function(todo) {
      dataService.saveTodo(todo);
    };
  }

})()