var keystone = require('keystone');

var todos = new keystone.List('todos');

todos.add({
	name: {
		type: String
	},
	completed: {
		type: Boolean,
		default: false
	},
	note: {
		type: String
	},
	update_at: {
		type: Date,
		default: Date.now()
	}
});
todos.defaultColumns = 'name, note|20%, update_at|20%, completed|20%';

todos.register();
