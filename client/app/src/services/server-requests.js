angular.module('myApp.services',[])
.factory('Goals', function($http) {

  var getGoalsArray = function() {
    return $http({
    	method: 'GET',
    	url: '/allGoals/5814ee4d6a443ff8bf513563'
    }).then(function(res){
      console.log(res.data);
    	return res.data;
    })
  };

  // var postChange = function(){
  // 	return $http().then
  // }









  return {
  	getGoalsArray: getGoalsArray
  }

});