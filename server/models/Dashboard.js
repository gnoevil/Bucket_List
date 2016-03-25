var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DashSchema = new mongoose.Schema({
	created_at: Date,
	title:String,
	desc:String,
	 name_id:{type: Schema.ObjectId, ref: 'Bucket'},
	 done:Number

});
var Dash = mongoose.model('Dash', DashSchema);
