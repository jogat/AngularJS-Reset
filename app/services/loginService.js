'use strict'
app.factory('loginService', ['$http','$q', '$location','sessionService','localStorageService', function ($http, $q, $location, sessionService, localStorageService) {
    var authServiceFactory = {};
    
    var _authentication = {
        isAuth: false,
        userName: "",
        permisos:"",
        ramas:[],
        items:[]

    };

    var _wsIniciaSesion = function (usuario) {

        var deferred = $q.defer();        
        $http.post(wsHost + 'usuarios/login', usuario).success(function (response) {            
            var res = response;            
            
            
            if(res.uid != ''){
                
                localStorageService.remove(cookieName);
                localStorageService.set(cookieName, { 
                    userName : res.st_nombre,
                    permisos : res.st_permisos,
                    token : res.token,
                    ramas:res.ramas,
                    items:res.items
                 });
                
                _authentication.userName = res.st_nombre;
                _authentication.isAuth = true;
                _authentication.permisos = res.st_permisos;
                _authentication.ramas = res.ramas;
                _authentication.items = res.items;
                
                sessionService.set(cookieName,res.uid);                                
            }
            else{
                toastr.warning(res.errmsg,"ADVERTENCIA");
                _wsCerrarSesion();
            }
            deferred.resolve(response);            
        }).error(function (err, status) {
            
            toastr.warning(err,"ADVERTENCIA");
            _wsCerrarSesion();
            deferred.reject(err);
        });

        return deferred.promise;
    };

    var _wsCerrarSesion = function () {
        localStorageService.remove(cookieName);
        _authentication.userName = "";
        _authentication.isAuth = false;
        _authentication.permisos = "";
        _authentication.ramas = [];
        _authentication.items = [];
        

        sessionService.destroy(cookieName);
        $location.path('/login');
    };

    var _wsIsLogged = function(){       
        return sessionService.get(cookieName);
    }

    

    var _fillAuthData = function () {
        var authData = localStorageService.get(cookieName);        
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;           
            _authentication.permisos = authData.permisos; 
            _authentication.token = authData.token;
            _authentication.ramas = authData.ramas;
            _authentication.items = authData.items;
                       
        }
    }

    var _token = function () {
        var token = {};
        var authData = localStorageService.get(cookieName);        
        
        if (authData) {            
            token = authData.token;                       
        }
        return token;
    }

    //REDICCIONAMIENTO DE URL
    var _saveAttemptUrl = function () {

        if ($location.path().toLowerCase() != '/sesion') {
            _authentication.url = $location.path();

        }
        else
            _authentication.url = '/';
    };
    var _redirectToAttemptedUrl = function () {
        $location.path(_authentication.url);
    };

    authServiceFactory.wsInicioSesion           = _wsIniciaSesion;
    authServiceFactory.wsCerrarSesion           = _wsCerrarSesion;
    authServiceFactory.authentication           = _authentication;
    authServiceFactory.fillAuthData             = _fillAuthData;
    authServiceFactory.islogged                 = _wsIsLogged;
    authServiceFactory.saveAttemptUrl           = _saveAttemptUrl;
    authServiceFactory.redirectToAttemptedUrl   = _redirectToAttemptedUrl; 
    authServiceFactory.token                    = _token;

    return authServiceFactory;

}]);

