define(['angular'], function(angular) {

angular.module('ionicApp', [])
	
	.controller('MainCtrl', function($scope, $http) {
	  $http.get('http://echo.jsontest.com/conditions/frightful').then(function(resp) {
		$scope.conditions = resp.data.conditions;
	  }, function(err) {
		console.error('ERR', err);
		// err.status will contain the status code
	  })
});
}
