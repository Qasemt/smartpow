
var ctrl_Home_Edit_ModalInstanceCtrl = function ($scope, data_api, AppLog, userData, MyUtil, $http, socket, $uibModalInstance, isFormEdit, pRecordSelected, $log) {

    $scope.titleform = '';

    $scope.values = { isManuallyShow: false, manually_duaration_minute: 7, _has_error_service: false, _error_service_message: "" }


    $scope.powerManullaystatus = false;

    $scope.LocalRecordSelected = pRecordSelected;
    if (isFormEdit === true) {
        data_api.getGreenHouseList().then(data => {
            $scope._green_house_list = data;
            $scope.green_house_Selected = userData.selectGreenHouseItem($scope._green_house_list, $scope.LocalRecordSelected.greenHouse.code);
        }, reason => {
            console.log('Error: ' + reason);
        });
    }
    //--------------------------------------------------------
    $scope.onchangeGreenHouseItem = function (item_Selected) {
        $scope.LocalRecordSelected.greenHouse = item_Selected;

    };


    $scope._getSchModeNames = userData.getSchMode();
    $scope._isloadingManuallyRecs = false;
    $scope.values_manually = undefined;

    // $scope.onchangeDuration = function (manuallyDuaration) {
    //     $scope.manuallyDuaration = manuallyDuaration;
    //  //   LocalRecordSelected.durationtimesecs=manuallyDuaration;
    // }
    //----------------------------------- Region Manually -------------------

    $scope.SetManuallyTime = function (isOn) {


        if ($scope.values_manually != undefined) {
            if (isOn == true) {
                $scope.values_manually.time_start = MyUtil.unixTime_now();
                $scope.values_manually.durationtimesecs = $scope.LocalRecordSelected.durationtimesecs
                $scope.values_manually.powerstatus = isOn;
                $scope.values_manually.smsalert = true;
            } else {
                $scope.values_manually.time_start = MyUtil.unixTime_now();
                $scope.values_manually.durationtimesecs = $scope.LocalRecordSelected.durationtimesecs
                $scope.values_manually.powerstatus = isOn;
                $scope.values_manually.smsalert = true;
            }

            // socket.emit('message', $scope.values_manually);
            var urlx = '/service/home/deviceinfo/manually?' +
                'code=' + pRecordSelected.code + "&" +
                'start_time=' + $scope.values_manually.time_start + "&" +
                'duration_of_seconds=' + $scope.values_manually.durationtimesecs + "&" +
                'power_status=' + $scope.values_manually.powerstatus;
            $http.get(urlx).success(function (data) {


            })
                .error(function (data) {
                    console.log('Error: ' + data);
                });

        }
        return true;
    };
    // گرفتن اخرین وضعیت دستگاه
    $scope.GetLastDeviceManually = function () {


        //------------------------------ Load Data Manually Time -------------------

        var url = '/service/home/deviceinfo/manually_last_status?devicecode=' + pRecordSelected.code;
        $scope._isloadingManuallyRecs = true;
        $http.get(url
        ).success(function (data) {

            $scope.values_manually = data;
            if (data.powerstatus == true) {
                $('#chkDeviceOnOff').bootstrapSwitch('state', true); // true || false
                $scope.powerManullaystatus = true;
                $('#txtDuration').prop('disabled', false);

            }
            else {
                $('#chkDeviceOnOff').bootstrapSwitch('state', false); // true || false
                $scope.powerManullaystatus = false;
                $('#txtDuration').prop('disabled', true);
            }
            $scope._isloadingManuallyRecs = false;
        })
            .error(function (data) {
                $scope._isloadingManuallyRecs = false;
                console.log('Error: ' + data);
            });

        // faghat dar in method [power status ] set mishavad

    }

    $scope.init = function () {

        if (isFormEdit === true) {
            $("[name='chkDeviceEnable']").bootstrapSwitch();
            $("[name='chkDeviceOnOff']").bootstrapSwitch();

            //$log.log('init modal');
            $scope.titleform = "Edit";
            $scope.values.manually_duaration_minute = $scope.LocalRecordSelected.durationtimesecs / 60;
            //  $scope.SchModeSelected = $scope._getSchModeNames[0];
            $scope.SchModeSelected = userData.getSchModeItem(pRecordSelected.schedulemode);

            if (pRecordSelected.schedulemode == 4) {// ***************  selected manaually
                $scope.values.isManuallyShow = true;
                $scope.GetLastDeviceManually();
            }

            if (pRecordSelected.deviceenable == true) {

                $('#chkDeviceEnable').bootstrapSwitch('state', true); // true || false

            }
            else $('#chkDeviceEnable').bootstrapSwitch('state', false); // true || false


            $('#chkDeviceEnable').on('switchChange.bootstrapSwitch', function () {

                var t = $('#chkDeviceEnable').bootstrapSwitch('state');
                $scope.LocalRecordSelected.deviceenable = t;

            });


            $('#chkDeviceOnOff').on('switchChange.bootstrapSwitch', function () {

                var t = $('#chkDeviceOnOff').bootstrapSwitch('state');


                $scope.powerManullaystatus = t;
                if (t)
                    $('#txtDuration').prop('disabled', false);
                else $('#txtDuration').prop('disabled', true);

            });

            socket.on('device_cmd_get_power_status', function (msg) {
                is_refresh = true;
            });
        }

    }

    $scope.onchangeSchModeItem = function (SchModeItem) {

        $scope.LocalRecordSelected.schedulemode = SchModeItem.id;

        if (SchModeItem.id == 4) {
            $scope.values.isManuallyShow = true;
            // $scope.GetRegionManually();
        }
        else {
            $scope.values.isManuallyShow = false;

        }
    };

    $scope.xsubmit = function () {
        var res = true;

        if (isFormEdit === true) {

            $scope.LocalRecordSelected.durationtimesecs = $scope.values.manually_duaration_minute * 60;
            $scope.LocalRecordSelected.powerstatus = $scope.manuallyDuaration;
            $scope.LocalRecordSelected.powerstatus = $scope.powerManullaystatus;
            
            if ($scope.LocalRecordSelected.schedulemode == 4) {
                res = $scope.SetManuallyTime($scope.powerManullaystatus);
            }
            //------------------------

            data_api.updateDeviceInfos($scope.LocalRecordSelected).then(data => {
                $uibModalInstance.close([{ obj: data }]);
                
                // if (modelManually != undefined) {

                    //  $http.put('/api/manuallytime', modelManually);
                     //  $log.info('ok model manually :)');
                // }

            }, reason => {
                $scope.values._has_error_service = true;
                $scope.values._error_service_message = err.message;
                AppLog.WriteError(err);
            });

           // $uibModalInstance.close([{ obj: $scope.LocalRecordSelected }, { obj: $scope.values_manually }]);
        } else {

            data_api.insertDeviceInfos($scope.LocalRecordSelected).then(data => {
                $uibModalInstance.close();

            }, reason => {
                $scope.values._has_error_service = true;
                $scope.values._error_service_message = reason.message;
                AppLog.WriteError(reason);
            });
        }


    };


    $scope.cancel = function () {

        $uibModalInstance.dismiss('cancel');
    };

    $scope.restTime = function () {
        var url = 'service/home/deviceinfo/?devicecode=' + pRecordSelected.code + '&isreset=' + 1;
        $http.get(url)
            .success(function (data) {
                $uibModalInstance.close();
            })
            .error(function (data) {
                console.log('Error: ' + data);
                $uibModalInstance.close();
            });

    }

};