var mongoose = require('mongoose'),
	Schema = mongoose.Schema

var noteSchema = new Schema({
	name: 'string',
	description: 'string',
	id: 'string'
})

module.exports = mongoose.model('todo', noteSchema)
