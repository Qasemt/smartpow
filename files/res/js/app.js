/**
 * Created by Qasem on 2015/7/17.
 */
'use strict';
var app = angular.module('SmartPow', ['ngRoute','ui.bootstrap', 'btford.socket-io', "highcharts-ng", 'pascalprecht.translate', 'angularCSS', 'ADM-dateTimePicker', 'ngMessages', 'ngAnimate']);



app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/task_daily_time_for_device', {
        templateUrl: '/home/views/task_daily_time_for_device.html'
    });

 

    $routeProvider.when('/task_for_sensors', {
        templateUrl: '/home/views/task_for_sensors.html'
    });
    $routeProvider.when('/sensors_report_chart', {
        templateUrl: '/home/views/sensors_report_chart.html'
    });
    $routeProvider.when('/settings', {
        templateUrl: '/home/views/settings.html'
    });
    $routeProvider.when('/sensors', {
        templateUrl: '/home/views/sensor_infos.html'
    });
    $routeProvider.when('/greenhouses', {
        templateUrl: '/home/views/green_houses.html'
    });
    $routeProvider.when('/sensors_monitoring', {
        templateUrl: '/home/views/sensors_monitoring.html'
    });
    $routeProvider.when('/', {
        templateUrl: '/home/views/home.html'

    });


}]);

