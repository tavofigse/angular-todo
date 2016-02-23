(function() {
  'use strict';

  angular.module('todos.directives', [])

    .directive('todos', function () {
      return {
        templateUrl: 'templates/todos.html',
        controller: 'mainCtrl',
        replace: true
      }
    });
})();
