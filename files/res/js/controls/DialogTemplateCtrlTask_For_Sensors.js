
var DialogTemplateCtrlTask_For_Sensors = function ($scope, $http, userData,MyUtil, data_api, $uibModalInstance, tempAndhumiSelected, $log, filter, allRecs,param_SensorItems, pMode) {

    $scope.Mode = pMode;
    $scope.hstep = 1;
    $scope.mstep = 1;
    $scope.durationinMinutes = undefined;
    $scope._DeviceItems = userData.getDeviceItems();
    $scope._SensorItems = param_SensorItems;
    $scope._getsensitiveSensor = MyUtil.getSensitiveSensor();
    $scope.tempAndhumiSelected = tempAndhumiSelected;
    $scope._hassErrorBiggerBiggerOrLess = true;
    $scope._timeErrorMessage = '';
   

    $scope.init = function () {
        if ($scope.Mode == 'insert_mode' || $scope.Mode == 'edit_mode') {
            $scope.durationinMinutes = 3;
            $log.log('init modal');
            if (tempAndhumiSelected != null && tempAndhumiSelected.id > 0) {
                $scope.titleform = "Edit";
                $log.log('device Code ' + $scope.tempAndhumiSelected.deviceCode);
                $scope.selectedDeviceCode = userData.selectDeviceItem($scope._DeviceItems, $scope.tempAndhumiSelected.deviceCode);
                $scope.selectedSensitiveSensorCode = $scope._getsensitiveSensor[$scope.tempAndhumiSelected.sensitivesensor - 1];
                $scope.selectedSensorItem = userData.selectSensorItem($scope._SensorItems, $scope.tempAndhumiSelected.sensorcode);
            }
            else {
                $scope.titleform = "Add_New_Title";

                $scope.tempAndhumiSelected.value1 = 0;
                $scope.tempAndhumiSelected.value2 = 0;
                $scope.selectedSensorItem = $scope._SensorItems[0];
                $scope.tempAndhumiSelected.sensorcode= $scope._SensorItems[0].sensorcode;
                $scope.tempAndhumiSelected.durationofminute = 0;
                $scope.selectedDeviceCode =$scope._DeviceItems [0];
                $scope.selectedSensitiveSensorCode = $scope._getsensitiveSensor[0];
                $scope.tempAndhumiSelected.deviceCode = $scope.selectedDeviceCode.code;
                $scope.tempAndhumiSelected.sensitivesensor = $scope.selectedSensitiveSensorCode.id;
                $scope.tempAndhumiSelected.id = 0;
            }
            $scope.istimevalided();
        }

    }

    $scope.onchangeDeviceItem = function (deviceSelected) {
        $scope.tempAndhumiSelected.deviceCode = deviceSelected.code;
        $scope.istimevalided();
    };
    $scope.onchangeSensorItem = function (item) {
        $scope.tempAndhumiSelected.sensorcode = item.sensorcode;
        $scope.istimevalided();
    };

    $scope.changed = function () {

        $scope.istimevalided();

    };
    $scope.onSensitiveSensorChanged = function (value) {
        $scope.tempAndhumiSelected.sensitivesensor = value.id;

        $scope.istimevalided();
    };


    $scope.istimevalided = function () {

        var result = false;
        $scope._hassErrorBiggerBiggerOrLess = false;
        $log.log(' Change Values :) ');
        return result;
    };
    //  $scope._id=
    //$scope.selected = {
    //    item: $scope.items[0]
    //};

    $scope.yes = function () {
        if ($scope.Mode == 'insert_mode' || $scope.Mode == 'edit_mode') {
            $scope.istimevalided();
            if ($scope._hassErrorBiggerBiggerOrLess) return;

        }
        $uibModalInstance.close($scope.tempAndhumiSelected);

    };

    $scope.cancel = function () {

        $uibModalInstance.dismiss('cancel');
    };

};

