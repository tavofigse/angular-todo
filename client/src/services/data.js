(function () {
'use strict';

angular.module('todos.services', [])

  .service('dataService', ['$http', function ($http) {
    let backendAPI = 'http://angular-todo:3000/api/todo/';

    this.getTodos = function(){
      return $http.get(backendAPI)
    };

    this.saveTodo = function(todo) {
      return Promise.resolve(
        $http.post(backendAPI, {todo: todo})
      ).then((res)	=> {
        return res.data
  		})
    };

    this.deleteTodo = function(todo, callback) {
      return Promise.resolve(
        $http.delete(`${backendAPI}${todo.id}`)
      ).then((res)	=> {
        return {
          done: res.status === 204,
          statusText:   res.statusText
        }
      })
    };

  }])
})()
