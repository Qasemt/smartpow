app.controller('ctrlSensor_Infos', function ($scope, userData,global_alert, data_api, AppLog, $http, $uibModal, $log, $filter) {

    $scope.appTitleValue = userData.appValues().appTitle;
    var new_sensor_Info_instanc = function () {
        var t = {
            sensorcode: '',
            sensorserial: '',
            hastemp: '',
            hashum: '',
            hasEC: '',
            hasPH: '',
            title: "",
            description: undefined
        };
        return t;
    };
    $scope.search = function (row) {
        return $filter
    };

    $scope.sortType = 'sensorcode'; // set the default sort type
    $scope.sortReverse = false;  // set the default sort order
    //$scope._getDevicenames = userData.getDeviceItems();
    $scope.searchValue = '';
    $scope.tempAndhumiSelected = new_sensor_Info_instanc();



    //  $scope.formData = {};

    $scope.getDataList = function () {
        data_api.getSensorList().then(data => {
            $scope._Records = data;
            // for (var i = 0; i <  $scope._Records.length; i++) {
            //     $scope._Records[i].green_house_title=  $scope.findGreenHouse( $scope._Records[i].greenHouseCode).title;
            // }
        }, reason => {
            console.log('Error: ' + reason);
        });


    }

    $scope.findGreenHouse = function (green_house_code) {
        for (var i = 0; i < $scope._Green_House_Records.length; i++) {
            if ($scope._Green_House_Records[i].code == green_house_code) {
                return $scope._Green_House_Records[i];
            }
        }
        return undefined;
    }
    $scope.get_Green_House_List = function () {

        data_api.getGreenHouseList().then(data => {
            $scope._Green_House_Records = data;
        }, reason => {
            console.log('Error: ' + reason);
        });
    }

    $scope.get_Green_House_List();
    $scope.getDataList();


    //------------------ delete -----------------------------------
    $scope.deleteOpenDialog = function (size, record) {
        // $log.info('dialog -> temp and humi [id] ' + record.id);
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
                }


            }
        });
        modalInstance.result.then(function (selectedItem) {

            data_api.deleteSensorList(selectedItem.id).then(data => {
                
                $scope.getDataList();

            }, reason => {
                global_alert.danger(reason.message,10000); // can not be deleted
                AppLog.WriteError(reason);

            });
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    //------------------edit V-------------------------------------
    $scope.editOpenDialog = function (size, record) {


        $scope.tempAndhumiSelected = record;
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/home/views/templates/SensorInfoEditDialogTemplate.html',
            controller: DialogTemplateCtrlSensorInfo,
            controllerAs: '$ctrlSensor_Infos',
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
                p_green_house_list: function () {
                    return $scope._Green_House_Records;
                }
                ,
                pMode: function () {
                    return 'edit_mode';
                }
            }
        });
        modalInstance.result.then(function (allRecords) {

            $scope.getDataList();

        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    //----------------- Insert  V----------------------------------
    $scope.InsertOpenDialog = function (size) {

        $scope.tempAndhumiSelected = {}
        var modalInstance = $uibModal.open({
            templateUrl: '/home/views/templates/SensorInfoEditDialogTemplate.html',
            controller: DialogTemplateCtrlSensorInfo,
            //    size: size,
            resolve: {
                //baray pass dadan parameter to control dialog
                tempAndhumiSelected: function () {

                    return new_sensor_Info_instanc();
                }
                ,
                filter: function () {
                    return $filter;
                },
                p_green_house_list: function () {
                    return $scope._Green_House_Records;
                }
                ,
                pMode: function () {
                    return 'insert_mode'
                }
            }
        });
        modalInstance.result.then(function (allRecords) {


            $scope.getDataList();


        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.myValueFunction = function (o) {

        if ($scope.sortType == 'sensorcode') {

            return o.sensorcode;
        }
    }
});



