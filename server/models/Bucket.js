var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BucketSchema = new mongoose.Schema({
 name: String,
 created_at: Date
});
var Bucket = mongoose.model('Bucket', BucketSchema);
