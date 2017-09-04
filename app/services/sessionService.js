'use strict'

app.factory('sessionService',['$http',function($http){
	return {
		set : function(key, value){			
			$http.post('data/set_session.php',{key:key, value:value});			
		},
		get : function(key){
			var $checkSessionServer = $http.post('data/check_session.php',{key:key});
			return $checkSessionServer;	
		},		
		destroy : function(key){
			$http.post('data/destroy_session.php',{key:key});			
		}
	}
}]);
