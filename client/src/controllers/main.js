(function () {
'use strict'

angular.module('todos.controllers', [])

  .controller('mainCtrl', ['$scope', 'dataService', main])

  function main($mainScope, dataService) {

    /*
     * init
    */
    dataService.getTodos()
      .then(function (response) {
        $mainScope.todos = response.data.todo
      })

    /*
     * controller functions
    */
    $mainScope.addTodo = (() => {
      var todo = {name: "This is a new todo.", id: Date.now()}
      dataService.saveTodo(todo)
        .then((data) => {
          $mainScope.todos.unshift(data.todo)
        })
    })

    $mainScope.deleteTodo = ((todo) => {
      dataService.deleteTodo(todo)
        .then((res) => {
          if (res.done) {
            let todos = $mainScope.todos
            todos = todos.filter(((item) => {
              return item.id !== todo.id;
            }));
            $mainScope.todos = todos
          }else{
            console.log(res.statusText)
          }
        })
    })

    $mainScope.saveTodo = ((todo) => {
      dataService.saveTodo(todo)
        .then((data) => {
          console.log(data)
        })
    })
  }

})()
