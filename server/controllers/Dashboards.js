var mongoose = require('mongoose');
var Dashboard = mongoose.model('Dash');
module.exports = (function() 
{
	return{
		showdashboard:function(req,res)
		{
			Dashboard.find({name_id:req.params.id}).populate('name_id').sort({_id:'desc'}).exec(function(err, results){
				if(err)
				{}
				else
				{
					res.json(results);
				}
			})
		},
		showOne:function(req,res)
		{
			console.log(req.params.id)
			Dashboard.find({name_id:req.params.id, done:0}).populate('name_id').sort({_id:'desc'}).exec(function(err, results){
				if(err)
				{}
				else
				{
					console.log(results);
					res.json(results);
				}
			});
		},
		showDoneOne:function(req,res)
		{
			
			Dashboard.find({name_id:req.params.id, done:1}).populate('name_id').sort({_id:'desc'}).exec(function(err, results){
				if(err)
				{}
				else
				{
					console.log(results);
					res.json(results);
				}
			});
		},
		createdashboard:function(req, res)
		{
			var dd=new Date();
			console.log(dd);
			var dash = new Dashboard({title:req.body.title,
				desc:req.body.description,done:0,name_id: req.body.name, created_at:dd});
			console.log(dash);
			dash.save(function(err)
			{
				if(err){
					console.log("fhksdhfkdjs");
				}
				else
				{
					res.redirect('/dash/'+req.body.name);
				}

			});

		},
		updatedashboard:function(req, res)
		{
			
			Dashboard.findOne({_id:req.body._id}).exec(function(err, results){
				if(err)
				{}
				else
				{
					results.done=req.body.done;
					results.save(function(err)
					{
						if(err){
							console.log("fhksdhfkdjs");
						}
						else
						{
							res.redirect('/dash/'+req.body.name);
						}

					})

				}
			});
			

		}



	}
})();