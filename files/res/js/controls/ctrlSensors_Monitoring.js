/**
 * Created by qasem on 3/10/2016.
 */
//app.factory('socket', function ($rootScope) {
//  //  var socket = io.connect(document.location.origin + "/FirstPage");
//});

app.controller('ctrlSensors_Monitoring', function ($scope, userData, global_alert, AppLog, MyUtil, data_api, socket, $http, $uibModal, $log, $filter) {
    $scope.DateSelected = { StartTime: "", EndTime: "" };
    $scope.appTitleValue = userData.appValues().appTitle;
    $scope.values_categories = [];

    $scope.series = ['Temp', 'Hum'];

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
        , sensor_item_selected: null
        , time_items: userData.get_time_items()
        , value_of_time: 20
        , time_item_selected: undefined
        , MonitorList:[]
        , active_green_house_list:[]

    };

    $scope.load_data = function () {
        data_api.getMonitorList().then(function (data) {
            $scope.PageValues.MonitorList = data;
            for (i = 0; i < $scope.PageValues.MonitorList.length; i++) {
                $scope.PageValues.MonitorList[i].isShow = true;
                $scope.PageValues.MonitorList[i].isSelected = false;
                $scope.PageValues.MonitorList[i].sensor_type_name = userData.mapSensorTypeByCode($scope.PageValues.MonitorList[i].sensortype).name;
              // -------------------
              //$scope.PageValues.active_green_house_list.push( $scope.PageValues.MonitorList[i]._sensorInfo)
            }
       
           
        });
    }

    $scope.load_data();


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

        $scope.PageValues.time_item_selected = $scope.PageValues.time_items[0];

    }


    //######################### Chart INIT #########################


    $scope.btnShowDialog_Sensor_Infos_ListOnClick = function () {
        var modalInstance = $uibModal.open({
            templateUrl: '/home/views/templates/SensorinfosList_style2_DialogTemplate.html',
            controller: DialogTemplateCtrlSensorInfosList_style2,
            // size: size,
            resolve: {
                filter: function () {
                    return $filter;
                }
            }
        });
        modalInstance.result.then(function (m) {

            if (m.sensor_type == 3 || m.sensor_type == 4) //ph =3 // EC = 4
            {
                global_alert.danger("Not Support", 5000);
                return;
            }
            data_api.insertMonitorList({ _sensorInfo: m.sensor_item, sensortype: m.sensor_type, createdAt: MyUtil.unixTime_now(), updatedAt: MyUtil.unixTime_now() }).then(data => {
                // $scope.$scope.PageValues.MonitorList.push(data);
                $scope.load_data();
            }, reason => {
                global_alert.danger(reason.message, 5000);
                AppLog.WriteError(reason);
            });


            // $scope.PageValues.CurrentSesorCode = rowSelected.sensorcode;

        })
            ;
    }

    $scope.chartConfig = {

        options: {
            //This is the Main Highcharts chart config. Any Highchart options are valid here.
            //will be overriden by values specified below.
            chart: {
                type: 'areaspline'
            },

            tooltip: {
                style: {
                    padding: 10,
                    fontWeight: 'bold'
                }
            }
        },
        //The below properties are watched separately for changes.

        //Series object (optional) - a list of series using normal highcharts series options.
        series: [{
            name: '',
            data: []
        }],
        //Title configuration (optional)
        title: {
            text: null
        },
        //Boolean to control showng loading status on chart (optional)
        //Could be a string if you want to show specific loading text.
        loading: false,
        //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
        //properties currentMin and currentMax provied 2-way binding to the chart's maximimum and minimum
        xAxis: {
            //currentMin: 0,
            //currentMax: 1000,
            categories: [],
            tickmarkPlacement: 'on',
            title: { text: 'values' },

        },

        //Whether to use HighStocks instead of HighCharts (optional). Defaults to false.
        useHighStocks: false,
        //size (optional) if left out the chart will default to size of the div or something sensible.
        // size: {
        //     width: 600,
        //     height: 600
        // },
        //function (optional)
        func: function (chart) {
            //setup some logic for the chart
        }
    };
    $scope.selected_sensor_item = function (record) {

        // record.isSelected = true;

        for (i = 0; i <  $scope.PageValues.MonitorList.length; i++) {

            if ( $scope.PageValues.MonitorList[i].id == record.id) {
                $scope.PageValues.MonitorList[i].isSelected = !$scope.PageValues.MonitorList[i].isSelected;
                if ($scope.PageValues.MonitorList[i].isSelected == false)
                    $scope.PageValues.sensor_item_selected = undefined;
                else {
                    var o = $scope.PageValues.MonitorList[i];

                    $scope.PageValues.sensor_item_selected = {
                        title: o._sensorInfo.title,
                        sensortype: o.sensortype,
                        sensor_type_name: o.sensor_type_name,
                        sensorcode: o._sensorInfo.sensorcode
                    }
                    $scope.chartConfig.series[0].name = $scope.PageValues.sensor_item_selected.sensor_type_name
                }
            }
            else
            $scope.PageValues.MonitorList[i].isSelected = false;
        }
        // $log.info('dialog -> temp and humi [id] ' + record.id);

    }
    $scope.deleteOpenDialog = function (record) {
        //   $log.info('dialog -> temp and humi [id] ' + record.id);
        $scope.PageValues.sensor_item_selected = record;
        //  $scope.clon_dailytimeSelected= record.;
        var modalInstance = $uibModal.open({
            templateUrl: '/home/views/templates/DeleteTemplate.html',
            controller: function ($scope, $http, $uibModalInstance, selectedItem) {
                //  $scope.xSelectedItem=selectedItem;
                $scope.yes = function () {

                    $uibModalInstance.close(selectedItem);

                };

                $scope.cancel = function () {

                    $uibModalInstance.dismiss('cancel');
                };
            },

            resolve: {
                //baray pass dadan parameter to control dialog
                selectedItem: function () {
                    return $scope.PageValues.sensor_item_selected;
                },
                filter: function () {
                    return $filter;
                }
                , allRecs: function () {
                    return $scope.recs_tempandhumi;
                }
                ,
                pMode: function () {
                    return 'delete_mode'
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {

            data_api.deletetMonitorList(selectedItem.id).then(data => {
                selectedItem.isShow = false;

            }, reason => {
                global_alert.danger(reason.message, 10000); // can not be deleted
                AppLog.WriteError(reason);
            });



        }, function () {
            //  $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.btnLastLogsOnClick = function () {

        GetLastLogs();
        //  GetLogsbyDateTimeDurationTimeGroup();
    }

    //--------------------------------------
    var cb_arrive_data = function (data) {

        $scope._Records = data;

        var ArrayValues = [];

        $scope.values_categories = [];
        $scope.data = [];

        angular.forEach($scope._Records, function (item) {
            var sen_type = $scope.PageValues.sensor_item_selected.sensortype;
            if (sen_type === 1) //temp
            {
                ArrayValues.push(item.value1)
            }
            else if (sen_type === 2)//hum
            {
                ArrayValues.push(item.value2)
            }
            else if (sen_type === 3)//ec
            {
                ArrayValues.push(item.value3)
            }
            else if (sen_type === 4)//ph
            {
                ArrayValues.push(item.value4)
            }
            else if (sen_type === 5)//lux 
            {
                ArrayValues.push(item.value5)
            }
            else if (sen_type === 6)//co2 
            {
                ArrayValues.push(item.value6)
            }
            var localDate = MyUtil.unixTime_to_date(item.updatedAt);
            $scope.values_categories.push(MyUtil.GetDateTimeWithFormat(localDate, "yyMMdd-HH:mm:ss", $filter));


        });

        $scope.chartConfig.xAxis.currentMax = data.length + 1;// (data.length / 3) * 2;
        $scope.chartConfig.xAxis.categories = $scope.values_categories;
        $scope.chartConfig.series[0].data = ArrayValues;
        $scope.chartConfig.series[0].name = $scope.PageValues.sensor_item_selected.sensor_type_name;
    }

    $scope.load_data_for_Current_sensor = function () {
        // data_api.getTempLogs_by_code($scope.PageValues.sensor_item_selected.sensorcode, 1000, 1).then(cb_arrive_data, reason => {
        //     AppLog.WriteError(reason);
        // });
        var isonlyDate = 0;
        var f = -($scope.PageValues.value_of_time);
        var sDate = 0;
        if ($scope.PageValues.time_item_selected.id == 1) // minutes
        {
            sDate = userData.addMinutes(MyUtil.unixTime_now(), f)
        } else if ($scope.PageValues.time_item_selected.id == 2) // hours
        {
            sDate = userData.addHours(MyUtil.unixTime_now(), f)
        }
        else if ($scope.PageValues.time_item_selected.id == 3) // days
        {
            sDate = userData.addDays(MyUtil.unixTime_now(), f)
        }


        var eDate = MyUtil.unixTime_now();
        data_api.getTempLogs_by_time($scope.PageValues.sensor_item_selected.sensorcode, sDate, eDate, 1000, isonlyDate).then(cb_arrive_data, reason => {
            AppLog.WriteError(reason);
        });
    }


})

