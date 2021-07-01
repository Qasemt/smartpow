/**
 * Created by qasem on 3/10/2016.
 */
//app.factory('socket', function ($rootScope) {
//  //  var socket = io.connect(document.location.origin + "/FirstPage");
//});

app.controller('ctrlSensors_Report_Chart', function ($scope,data_api,AppLog, userData,MyUtil, socket, $http, $uibModal, $log, $filter) {
    $scope.DateSelected = {StartTime: "", EndTime: ""};
    $scope.appTitleValue = userData.appValues().appTitle;
    $scope.labels = [];
    $scope.series = ['Temp', 'Hum'];
    $scope.data = [];


    $scope.PageValues = {
        LimitValue: 100
        , NumberOfLoadRecrds: 0
        , CurrentBaseSensorType: 1
        , CurrentSesorCode: 1
        , CurrenSensorSerial: 12345
        , CurrentBaseSensorTypeName: ""
        , LastTempValueAsSensorCode: undefined
        , LastHumValueAsSensorCode: 0
        , accordion_isFirstOpen: true

    };

    socket.on('connect', function (data) {
        //  socket.emit('message', {channel: 'salam'});

        socket.on('TempSensorMessage', function (msg) {

            console.log("Message Client Temp---> " + msg.value1);
            $scope.PageValues.LastTempValueAsSensorCode = msg.value1;
            $scope.PageValues.LastHumValueAsSensorCode = msg.value2;
            // $scope.refreshData();
        });
    });
    $scope.init = function () {
        $("[name='chkSensorSelected']").bootstrapSwitch();
        //   $scope.$apply(function () {

        //$('#chkSensorSelected').bootstrapSwitch('state', false); // true || false

        // $('#chkSensorSelected').on('switchChange.bootstrapSwitch', function (e, state) {


        //     var t = $('#chkSensorSelected').bootstrapSwitch('state');
        //     if (e.target.checked == true) {

        //         $scope.PageValues.CurrentBaseSensorType = 2;//set ph-ec
        //         $scope.$apply(function () {
        //             $scope.PageValues.CurrentBaseSensorTypeName = "PH-EC";
        //         });

        //     } else {

        //         $scope.PageValues.CurrentBaseSensorType = 1;
        //         $scope.$apply(function () {
        //             $scope.PageValues.CurrentBaseSensorTypeName = "Temp-Hum";
        //         });
        //     }


        // });
        //     });


    }


    //######################### Chart INIT #########################
    $scope.chartConfig = {
        options: {

            chart: {
                type: 'areaspline',
                backgroundColor: 'rgba(0,0,0,0)',

            },

            tooltip: {
               // split: true,
                shared: true,
               // pointFormat: '<span style="color:{series.color}">{series.name} :</span> <span >{point.y}</span><br> ',
                useHTML: true,

                /*   valueSuffix: ' millions'*/
            },
            xAxis: {
                categories: [],
                tickmarkPlacement: 'on',
                title: {
                    enabled: false
                },

            },
         /*   xAxis: {
                type: 'datetime',
                labels: {
                    formatter: function() {
                        return Highcharts.dateFormat('%I:%M %P', this.value);
                    },
                },
                gridLineDashStyle: 'dot',
                gridLineWidth: 1,
                tickInterval: 60 * 60 * 1000,
                lineWidth: 2,
                lineColor: '#92A8CD',
                tickWidth: 3,
                tickLength: 6,
                tickColor: '#92A8CD',
            },*/
            yAxis: [{
                title: null,
                /*  title: {
                 text: 'temp'
                 },*/
                labels: {
                  /*  format: '{value}°C',*/
                    formatter: function()
                    {
                        return  '<b >'+this.value +' °C </b>';
                    },
                    style: {
                        color: '#ee1700'
                    }

                }
                , opposite: true
            }, {
                title: null,
                /*title: {
                 text: 'hum1'
                 },*/

                labels: {
                /*    format: '{value} %',*/
                    formatter: function()
                    {
                        return  '<b>'+this.value +' %</b>';
                    },
                    style: {
                        color: Highcharts.getOptions().colors[0],

                    }
                },

            }],
            plotOptions: {
                areaspline: {
                    fillOpacity: 0.200
                }
            },

           /*   tooltip: {

             style: {
             fontSize: '10px',
             fontFamily: 'tahoma',
            // direction: 'ltr',
             },
             useHTML: true
             }
*/
        },

        title: {
            text: ' '
        }

        ,
        series: [{
            pointStart:undefined,
            pointInterval:undefined,
            name: $filter('translate')('Temp'),
            data: [],
            color: '#FF5252',

        }, {
            pointStart:undefined,
            pointInterval:undefined,
            color: '#203fdb',
            name: $filter('translate')('Hum'),
            data: [],
            yAxis: 1,
        }],

        loading: false
    }

    var TodayLoad = function () {

        var today = new Date().toString();
        // var dateonly = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var s = today;
        var e = today;

        LoadLoggsbyDurationTimes(s, e, $scope.PageValues.LimitValue, 1);


    }

    var GetLastLogs = function () {

        LoadLoggsbyDurationTimes(-1, -1, $scope.PageValues.LimitValue, 1);


    }

    var GetLogsbyDateTimeDurationTimeGroup = function () {
        // for exam : by hour , month, year

        var urltemp = "/api/LogsbyDateTimeDurationTimeGroup/-1/" + $scope.PageValues.CurrentSesorCode +
            "/" + "1" + "/" + $scope.PageValues.LimitValue;
        $http.get(urltemp)
            .success(function (data) {
                $scope._Records = data;

                var ArrayTempValues = [];
                var ArrayHumValues = [];
                $scope.labels = [];
                $scope.data = [];

                angular.forEach($scope._Records, function (item) {
                    var localDate = MyUtil.unixTime_to_date(item.updatedAt);
                    $scope.labels.push(MyUtil.GetDateTimeWithFormat(localDate, "yyMMdd-HH:mm:ss", $filter));
                    ArrayTempValues.push(item.value1.toFixed(2))
                    ArrayHumValues.push(item.value2.toFixed(2))
                })

                $scope.data.push(ArrayTempValues);
                $scope.data.push(ArrayHumValues);
                $scope.PageValues.NumberOfLoadRecrds = $scope._Records.length;


            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }
    //######################### when landing on the page, get all records #########################
    //Call Today Func for default 
    // TodayLoad();

    var LoadLoggsbyDurationTimes = function (pStartTime_localTime, pEndTime_localTime, pRecordLimit, isonlyDate) {
        if (pRecordLimit == undefined || pRecordLimit == null)
            pRecordLimit = -1;
        var sDate = "-1";
        var eDate = "-1";

        if (pStartTime_localTime != -1)
            sDate = MyUtil.date_to_unixTime(pStartTime_localTime);

        if (pEndTime_localTime != -1)
            eDate = MyUtil.date_to_unixTime(pEndTime_localTime);


            var cb_arrive_data = function (data) {
                
                    $scope._Records = data;
    
                    var ArrayTempValues = [];
                    var ArrayHumValues = [];
                    $scope.labels = [];
                    $scope.data = [];
    
                    angular.forEach($scope._Records, function (item) {
                        var localDate = MyUtil.unixTime_to_date(item.updatedAt);
                        $scope.labels.push(MyUtil.GetDateTimeWithFormat(localDate, "yyMMdd-HH:mm:ss", $filter));
                        ArrayTempValues.push(item.value1)
                        ArrayHumValues.push(item.value2)
                    })
    
                    $scope.data.push(ArrayTempValues);
                    $scope.data.push(ArrayHumValues);
                    $scope.chartConfig.series[1].data = ArrayHumValues;
                    $scope.chartConfig.series[0].data = ArrayTempValues;
    
                    $scope.chartConfig.options.xAxis.categories = $scope.labels;
                    $scope.PageValues.NumberOfLoadRecrds = $scope._Records.length;
    
                }
            
    
            if (pStartTime_localTime == -1 && pEndTime_localTime == -1) {
    
                data_api.getTempLogs_by_code($scope.PageValues.CurrentSesorCode, pRecordLimit, isonlyDate).then( cb_arrive_data, reason => {
                    AppLog.WriteError(reason);
                });
               
            } else {
              
                data_api.getTempLogs_by_time($scope.PageValues.CurrentSesorCode,sDate,eDate, pRecordLimit, isonlyDate).then( cb_arrive_data, reason => {
                    AppLog.WriteError(reason);
                });
            }
 
    }

    //######################### Button On click ##########################
    $scope.btnShowDialogDateTimeBetween = function () {
        var modalInstance = $uibModal.open({
            templateUrl: '/home/views/templates/DateTimeBetweenTemplate.html',
            controller: DialogTemplateCtrlBetweenDateTime,
            // size: size,
            resolve: {
                //baray pass dadan parameter to control dialog
                pDateSelected: function () {
                    return angular.copy($scope.DateSelected);
                },

                filter: function () {
                    return $filter;
                }
            }
        });
        modalInstance.result.then(function (DateTimesSelectedFromDailog) {
            $scope.DateSelected = DateTimesSelectedFromDailog;

            LoadLoggsbyDurationTimes($scope.DateSelected.StartTime, $scope.DateSelected.EndTime, $scope.PageValues.LimitValue, 0);
            $log.info('Result Between Dates');

        }, function () {
            $log.info('Modal Between Date time dismissed at: ' + new Date());
        })
        ;
    }

    $scope.btnTodayOnClick = function () {

        TodayLoad();
    }

    $scope.btnLastLogsOnClick = function () {

        GetLastLogs();
        //  GetLogsbyDateTimeDurationTimeGroup();
    }

    $scope.btnShowDialogSensorInfosListOnClick = function () {
        var modalInstance = $uibModal.open({
            templateUrl: '/home/views/templates/SensorinfosListDialogTemplate.html',
            controller: DialogTemplateCtrlSensorInfosList,
            // size: size,
            resolve: {
                filter: function () {
                    return $filter;
                }
            }
        });
        modalInstance.result.then(function (rowSelected) {
            $scope.PageValues.CurrentSesorCode = rowSelected.sensorcode;
            $scope.PageValues.CurrentBaseSensorTypeName ="";
           if(rowSelected.hastemp==1){
               $scope.PageValues.CurrentBaseSensorTypeName +=$filter('translate')('Temp')+"-"
           }
            if(rowSelected.hashum==1){
                $scope.PageValues.CurrentBaseSensorTypeName +=$filter('translate')('Hum')+"-"
            }

            if(rowSelected.hasEC==1){
                $scope.PageValues.CurrentBaseSensorTypeName +=$filter('translate')('EC')+"-"
            }
            if(rowSelected.hasPH==1){
                $scope.PageValues.CurrentBaseSensorTypeName +=$filter('translate')('PH')+"-"
            }

            $scope.PageValues.CurrentBaseSensorTypeName=    $scope.PageValues.CurrentBaseSensorTypeName.substring(0,  $scope.PageValues.CurrentBaseSensorTypeName.length - 1);
        })
        ;
    }

    $scope.btnGetLastLogBySensorCodeorSerial = function () {

        var urltemp = "service/home/last_sensor_values/find?sensor_code=" + $scope.PageValues.CurrentSesorCode;


        $http.get(urltemp)
            .success(function (data) {

			if(data.id==undefined|| data.id!=0)
			{
                    $scope.PageValues.LastTempValueAsSensorCode = data.value1.toFixed(1);
                    $scope.PageValues.LastHumValueAsSensorCode = data.value2.toFixed(2);

                    /*  $scope.PageValues.LastTempValueAsSensorCode =  Math.floor(Math.random() * 20) +1;*/

			}

            })
            .error(function (data) {
                console.log('Error: ' + data);
            });

    }

    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };


})

