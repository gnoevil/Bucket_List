var mongoose = require('mongoose');
var Bucket = mongoose.model('Bucket');
module.exports = (function() 
{
	return{
		showBucket:function(req,res)
		{
			Bucket.find({}).sort({_id:'desc'}).exec(function(err, results){
				if(err)
				{}
				else
				{
					res.json(results);
				}
			});
		},
		createBucket:function(req, res)
		{
			console.log(req.body);
			var bucket = new Bucket({name: req.body.name, created_at:new Date().now});
			bucket.save(function(err)
			{
				if(err){
					console.log("fhksdhfkdjs");
				}
				else
				{
					res.redirect('/bucket');
				}

			});

		}

	}
})();