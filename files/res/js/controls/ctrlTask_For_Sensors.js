/**
 * Created by qasem on 3/10/2016.
 */
//app.factory('socket', function ($rootScope) {
//  //  var socket = io.connect(document.location.origin + "/FirstPage");
//});
app.controller('ctrlTask_For_Sensors', function ($scope, userData,data_api,MyUtil, $http, $uibModal, $log, $filter) {

    $scope.appTitleValue = userData.appValues().appTitle;
    var newtempandhumi = function () {
        var t = {
            deviceCode: 0,
            value1: 0,
            value2: 0,
            sensitivesensor: 0,
            smsalert: 0,
            istaskactive: false
        };
        return t;
    };
    $scope.search = function (row) {
        return $filter
    };
    $scope.sortType = 'deviceCode'; // set the default sort type
    $scope.sortReverse = false;  // set the default sort order
    $scope._getDevicenames = userData.getDeviceItems();
    data_api.getSensorList().then(function(data){
        $scope._SensorItems =data;
    });
  
    $scope.searchValue = '';
    $scope.tempAndhumiSelected = newtempandhumi();


     $scope.getDataList=function()
    {
		  
       $http.get('service/home/sensors_asig_to_devs/getlist')
        .success(function (data) {
            $scope.recs_tempandhumi = data;

        })
        .error(function (data) {
            console.log('Error: ' + data);
        });
	}

   $scope.getDataList();

    //------------------ delete -----------------------------------
    $scope.deleteOpenDialog = function (size, record) {
        $log.info('dialog -> temp and humi [id] ' + record.id);
        $scope.tempAndhumiSelected = record;
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
            size: size,
            resolve: {
                //baray pass dadan parameter to control dialog
                selectedItem: function () {
                    return $scope.tempAndhumiSelected;
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
            $log.info('delete agree : ' + new Date());
            $http.get('service/home/sensors_asig_to_devs/delete_by_id?id=' + $scope.tempAndhumiSelected.id)
                .success(function (data) {
                   $scope.getDataList();
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });

        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    //------------------edit V-------------------------------------
    $scope.editOpenDialog = function (size, record) {
        $log.info(' open  edit dialog -> daily time [id] ' + record.id);

        $scope.tempAndhumiSelected = record;
        var modalInstance = $uibModal.open({
            templateUrl: '/home/views/templates/Task_for_Sensor_EditDialogTemplate.html',
            controller: DialogTemplateCtrlTask_For_Sensors,
            // size: size,
            resolve: {
                //baray pass dadan parameter to control dialog
                tempAndhumiSelected: function () {
                    return angular.copy($scope.tempAndhumiSelected);
                },

                filter: function () {
                    return $filter;
                }
                ,
                allRecs: function () {
                    return $scope.recs_tempandhumi;
                }
                ,
                param_SensorItems: function () {
                    return $scope._SensorItems;
                }
                ,
                pMode: function () {
                    return 'edit_mode';
                }
            }
        });
        modalInstance.result.then(function (editedfromDailogItem) {

            $log.info('result yes ==> edit dialog -> value 1 ' + editedfromDailogItem.value1);

            $http.post('service/home/sensors_asig_to_devs/update_sensors_assign_to_devices', editedfromDailogItem)
                .success(function (data) {
                 $scope.getDataList();
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });

        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    //----------------- Insert  V----------------------------------
    $scope.InsertOpenDialog = function (size) {
        $log.info(' open  Insert dialog -> [temp & humi] ');
        $scope.tempAndhumiSelected = {}
        var modalInstance = $uibModal.open({
            templateUrl: '/home/views/templates/Task_for_Sensor_EditDialogTemplate.html',
            controller: DialogTemplateCtrlTask_For_Sensors,
            //    size: size,
            resolve: {
                //baray pass dadan parameter to control dialog
                tempAndhumiSelected: function () {

                    return newtempandhumi();
                }
                ,
                filter: function () {
                    return $filter;
                },
                allRecs: function () {
                    return $scope.recs_tempandhumi;
                }
                ,
                param_SensorItems: function () {
                    return $scope._SensorItems;
                }
                ,
                pMode: function () {
                    return 'insert_mode'
                }
            }
        });
        modalInstance.result.then(function (insertfromDailogItem) {

            $log.info('result yes ==> Insert dialog -> temp and Humidity [DeviceCode] ' + insertfromDailogItem.starttime);

            $http.post('service/home/sensors_asig_to_devs/insert_sensors_assign_to_devices', insertfromDailogItem)
                .success(function (data) {

                   $scope.getDataList();
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });

        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.myValueFunction = function (o) {

        if ($scope.sortType == 'starttime') {
            var onlytimestart = $filter('date')(o.starttime, 'HH:mm:ss');
            return onlytimestart;

        } else if ($scope.sortType == 'deviceCode') {
            var onlytimestart = $filter('date')(o.starttime, 'HH:mm:ss');
            return o.deviceCode + onlytimestart;
        }
    }
});

