/**
 * Created by Qasem on 2015/7/17.
 */
'use strict';
var app = angular.module('AppLogin', ['ngRoute','pascalprecht.translate', 'angularCSS', 'ngAnimate']);

app.controller('ctrl_login', function ($scope,userData, $http,MyUtil, $timeout, $translate, $log, $filter, $css, localstorage) {

    $scope.values = {remember_me: (localstorage.get("rememberMe")=="true"),_has_error_service: false, _error_service_message: ''};
    $scope.user ={login: "", pass: ""}

    if($scope.values.remember_me==true)
    {
        $scope.user = {login: localstorage.get("login"), pass: localstorage.get("pass")};
    }else {
        $scope.user ={login: "", pass: ""}
    }




    // Simply add stylesheet(s)
    //  $css.add('../../node_modules/bootstrap-rtl/dist/css/bootstrap-rtl.min.css');
    $scope.init = function () {

        $scope.appTitleValue = userData.appValues().appTitle;


    };

    $scope.checkAuth = function (frmlogin) {
        var url = '/public/home/login';
        var config = {
            headers : {
                'Content-type': 'application/json'
            }};
        $scope.values._has_error_service = false;
        $scope.values._error_service_message = 0;

         $http.post(url, $scope.user ,config )
         .success(function (data){
         console.log('Error: ' + data);
                // $location.path('/');
                 window.location.href='/';
             if($scope.values.remember_me==true) {
                 localstorage.set("login", $scope.user.login);
                 localstorage.set("pass", $scope.user.pass);
             }else {
                 localstorage.set("login", "");
                 localstorage.set("pass","");
             }
         }
         )
         .error(function (err)
         {
             $scope.values._has_error_service = true;
             $scope.values._error_service_message = err.message;
             AppLog.WriteError(err);

         /*  $scope.addAlert({type: 'danger', msg: ' System Error '});*/

         });


    };

    $scope.onRememberMe = function () {
        if($scope.values.remember_me==true)
            localstorage.set("rememberMe",true);
        else   localstorage.set("rememberMe",false);

    };

});


