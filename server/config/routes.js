var mongoose = require('mongoose');
var bucket= require('../controllers/Buckets.js');
var dash= require('../controllers/Dashboards.js');

module.exports = function(app) {
app.get('/bucket', function(req,res){
	bucket.showBucket(req,res)
});
app.post('/bucket/creates', function(req,res){
console.log("good");
	bucket.createBucket(req,res)
});
app.get('/dash/:id', function(req,res){
	dash.showdashboard(req,res)
});
app.post('/dash/creates', function(req,res){
	dash.createdashboard(req,res)
});
app.post('/dash/update', function(req,res){
	dash.updatedashboard(req,res)
});
app.get('/dash/ShowOnedone/:id', function(req,res){
	dash.showDoneOne(req,res)
});
app.get('/dash/ShowPendOne/:id', function(req,res){
	dash.showOne(req,res)
});
}
