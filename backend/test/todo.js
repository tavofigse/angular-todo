var request = require('supertest-as-promised'),
    api = require('../server.js'),
    async = require('async'),
    host = process.env.API_TEST_HOST || api,
    logger = require('../lib/logger'),
    mongoose = require('mongoose');

request = request(host)


function createTodo(data, callback) {
  // crear todo nueva
  request
    .post('/todo/')
    .set('Accept', 'application/json')
    .send(data)
    .expect(201)
    .end(callback)
}

function assertions(res, data, callback) {
  var todo = res.body.todo

  expect(todo).to.have.property('name', data.todo.name)
  expect(todo).to.have.property('description', data.todo.description)
  // expect(todo).to.have.property('id', data.todo.id)
  callback(null, todo)
}

function getTodo(res, callback) {
  id = res.body.todo.id

  request
    .get('/todo/' + id)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .end(callback)
}

function deleteTodo(res, callback) {
  var id = res.body.todo.id

  request
    .delete('/todo/' + id)
    .expect(204)
    .end(callback)
}


describe('Coleccion de Todos [/todo]', function() {

  before(function(done) {
    mongoose.connect('mongodb://localhost/angular-todo-test', done)
  })

  after(function(done) {
    mongoose.disconnect(done)
    mongoose.models = {}
  })

  describe('POST creo una todo', function() {
    it('deberia crear una todo', function(done) {
      var data = {
        "todo": {
          "name": "Creo MI TODO #node #node-pro",
          "description": "Introduccion a clase"
        }
      }

      async.waterfall([
        function (callback) {
          createTodo(data, callback)
        },
        function (res, callback) {
          assertions(res, data, callback)
        }
      ], done)
    })
  })

  describe('PUT Modificar una todo', function () {
    it('deberia obtener una todo y modificarla', function (done) {
      var data = {
        "todo": {
          "name": "MI TODO #node #node-pro",
          "description": "Introduccion a clase"
        }
      }

      var newData = {
        "todo": {
          "name": "MI TODO 'Actualizada'",
          "description": "Utilizando PUT"
        }
      }
      var id;

      async.waterfall([
        function (callback) {
          createTodo(data, callback)
        },
        function (res, callback) {
          getTodo(res, callback)
        },
        function (res, callback){
          assertions(res, data, callback)
        },
        function (res, callback) {
          // Ya cree la todo, ahora la actualizo
          newData.todo.id = res.id
          request
            .put('/todo/' + res.id)
            .set('Accept', 'application/json')
            .send(newData)
            .expect(200)
            .end(callback)
        },
        function (res, callback) {
          assertions(res, newData, callback)
        }
      ], done)
    })
  })

  describe('DELETE de una todo', function () {
    it('Deberia eliminar una todo', function (done) {
      var data = {
        "todo": {
          "name": "MI TODO #node #node-pro",
          "description": "Introduccion a clase"
        }
      }

      var id

      async.waterfall([
        // create a note
        function (callback) {
          createTodo(data, callback)
        },
        // delete this note
        function (res, callback) {
          deleteTodo(res, callback)
          id = res.body.todo.id
        },
        // check that not exist after
        function (res, callback) {
          request
            .get('/todo/' + id)
            .expect(400)
            .end(callback)
        }
      ], done)
    })
  })

  describe('GET obtengo una TODO', function () {
    var data = {
      "todo": {
        "name": "MI TODO #node #node-pro",
        "description": "Introduccion a clase"
      }
    }

    it('deberia obtener una todo existente', function (done) {
      var id

      async.waterfall([
        function (callback) {
          createTodo(data, callback)
        },
        function (res, callback) {
          getTodo(res, callback)
        },
        function (res, callback){
          assertions(res, data, callback)
        }
      ], done)
    })

    it('deberia obtener todas las todos', function (done) {

      async.waterfall([
        function (callback) {
          createTodo(data, callback)
          createTodo(data, callback)
        }
      ], done())

      request
        .get('/todo/')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .then(function (res) {
          var body = res.body
          expect(body).to.have.property('todo')

          var bodyLength = Object.keys(body.todo).length
          expect(bodyLength).above(0)
        })
    })
  })

})
