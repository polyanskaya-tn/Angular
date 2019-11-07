var mongoose = require('mongoose');

var eventsSchema = new mongoose.Schema({
	category : { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
	title: { type: String, required: true },
	info: { type: String, required: true },
	date: { type: Date, default: Date.now },
	authors : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }]
});

module.exports = mongoose.model('Events', eventsSchema);


