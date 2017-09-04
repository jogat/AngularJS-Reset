'use strict'

var app = angular.module('app',['ngRoute','ng.deviceDetector']);
var wsHost = 'http://localhost/reset_api/';
var cookieName = "authDataScroll";

app.factory('httpRequestInterceptor', function ($q, $location,$rootScope,deviceDetector) {
	var interceptorFactory = {};
	
    if(!deviceDetector.isDesktop()){
        wsHost = 'http://192.168.0.9/reset_api/';       
    }     	
	return interceptorFactory;
       
});

app.config( function ($httpProvider,$routeProvider){
	$httpProvider.interceptors.push('httpRequestInterceptor');

	$routeProvider.when('/home',{
		templateUrl : 'app/views/home.html'
		,controller : 'homeController'
	});

	$routeProvider.otherwise({redirectTo : '/home'});
});