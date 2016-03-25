var BucketList = angular.module('BucketList', ['ngRoute', 'ngCookies']);
var BucketName='';
    BucketList.config(function ($routeProvider)
    {
      $routeProvider
        .when('/',
        {
            templateUrl: 'partial/bucket.html',
            resolve: {
                    factory: checkRouting
                }
        })
        .when('/dashboard',
        {
            templateUrl: 'partial/dashboard.html',
         	resolve: {
                    factory: checkRouting
                }
        })
        .when('/user/:id',{templateUrl: 'partial/show.html',
        	resolve: {
                    factory: checkRouting
                }
    		}
        	)
        .when('/logout',
        {
             templateUrl: 'partial/logout.html',
            controller:'LogoutController',
            resolve: {
                    factory: checkRouting
                }
        })
        .otherwise(
        {
          	redirectTo: '/'
        })
    });
var checkRouting=function($cookieStore){
	if($cookieStore.get('user')=='')
		$location.path("/");
}
BucketList.factory('BucketFactory', function ($http)
{
	 var factory = {};
    factory.current_user = '';
    factory.id = '';
	factory.getuserName=function(callback){
		callback(BucketName)
	}
	factory.addBucketName=function(data, callback){
		$http.post('/bucket/creates', data).success(function(output) {
			for(var i=0;i<1;i++){
				callback(output[i]._id);
			}
		});
	 }
	factory.getBucketName=function(callback){
		$http.get('/bucket').success(function(output) {
			callback(output);
		});
	}
	factory.addDash=function(data,callback){
		//data.created_at=new Date().now;
		$http.post('/dash/creates', data).success(function(output) {
			callback(output);
		});
	}
	factory.getdash=function(data,callback){
		$http.get('/dash/'+data.id).success(function(output) {
			callback(output);
		});
	}
	factory.updateDash=function(data,callback){
		$http.post('/dash/update', data).success(function(output) {
			callback(output);
		});
	}
	factory.getShowDone=function(data,callback){
		$http.get('/dash/ShowOnedone/'+data.id).success(function(output) {
			callback(output);
		});
	}
	factory.getShowPending=function(data,callback){
		$http.get('/dash/ShowPendOne/'+data.id).success(function(output) {
			callback(output);
		});
	}
	return factory;
});
BucketList.controller('LogoutController', function ($scope,$cookieStore,$location,BucketFactory)
    {
    	console.log($cookieStore.get('user'));
    	$cookieStore.remove('user');
    	$cookieStore.remove('id');
    	$location.path("/");
    });
    BucketList.controller('BucketController', function ($scope,$cookieStore,$location,BucketFactory)
    {
        $scope.addBucket =function()
        {
            BucketFactory.addBucketName({name:$scope.name}, function(name){
            	$cookieStore.put('id',name);
            	$cookieStore.put('user',$scope.name);
            	$location.path('/dashboard');
            });
        }
      });
BucketList.controller('MainController', function ($scope,$cookieStore, $location,BucketFactory){
	$scope.showBtn= false;
	if($cookieStore.get('id')){
		$scope.showBtn= true;
	}
});
    BucketList.controller('dashController', function ($scope,$cookieStore, $location,BucketFactory)
    {
      	BucketFactory.getuserName(function(name){
            	$scope.myname= $cookieStore.get('user');
            });
        BucketFactory.getBucketName(function(bname){
            	$scope.users=bname;
            });
        BucketFactory.getdash({id:$cookieStore.get('id')},function(output){
        	  	$scope.dashs=output;
            });
        $scope.addList =function()
        {
            BucketFactory.addDash($scope.newdash, function(output){
            	$scope.dashs=output;
            });
        }
        $scope.setdone=function(checkstatus,dash)
        {
        	dash.done=checkstatus?1:0;
        	BucketFactory.updateDash(dash, function(output){
            	$scope.dashs=output;
            });
        }
      });
BucketList.controller('showController', function ($scope, $route,BucketFactory)
    {
		console.log($route.current.params.id)
      	BucketFactory.getShowPending({id:$route.current.params.id},function(name){
            	$scope.pend= name;
            });
       	BucketFactory.getShowDone({id:$route.current.params.id},function(name){
            	$scope.done= name;
            });
      });
