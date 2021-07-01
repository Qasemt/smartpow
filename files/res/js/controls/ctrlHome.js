//var app = angular.module('irrigationapp', ['ui.bootstrap', 'btford.socket-io']);
//var app = angular.module('irrigationapp', [ 'ui.bootstrap']);

app.controller('ctrlHome', function ($scope, userData, data_api, MyUtil, $http, $timeout, $uibModal, socket, $log, $filter) {

    $scope.appTitleValue = userData.appValues().appTitle;

    $scope.xp = {
        SelectedDateTime: "",
        b1: '2015/12/15',
        full: "",
        g: '2015/12/15',
        g1: '2015/12/15',
        default: '1395-05-05',
        myoptions: { calType: "jalali", format: "YYYY/MM/DD  hh:mm", default: 1450197600000 },
        myoptions2: { calType: "gregorian", format: "YYYY/MM/DD  hh:mm" }
    }



    $scope.xp.SelectedDateTime = Date();
    $scope.btnTest = function () {

        console.log("gDateLocal :" + $scope.xp.SelectedDateTime);
    }
    $scope.onchangeDatePicker = function () {

        console.log("on change  :" + $scope.xp.SelectedDateTime);
    }
    var is_refresh = false;
    $scope.onTimeout = function () {
        //  $scope.$digest (function () {
        if (is_refresh) {
            $scope.refreshData()
            is_refresh = false;
        }
        //  });
        mytimeout = $timeout($scope.onTimeout, 1 * 1000);
    };
    var mytimeout = $timeout($scope.onTimeout, 1 * 1000);

    socket.on('connect', function () {
        //  socket.emit('message', {channel: 'salam'});
        // $log.log("Log  ---> " + msg.Message);
    });
    socket.on('Log', function (msg) {
        $log.log("Log  ---> " + msg.Message);
        //console.log("Log  ---> " + msg);

    });
    socket.on('home_refresh_msg', function (msg) {
        is_refresh = true;
    });
    socket.on('device_cmd_pwr_status', function (msg) {
        is_refresh = true;
    });
    $scope.showErrorMessage = false;
    $scope.ErrorMessage = "";


    //$scope.$on("$destroy", function(){
    //    socket.removeAllListeners();
    //    console.log("page destory ...........");
    //});

    //--------------------------------------------------
    $scope.formData = {};
    var newModel = function () {
        var t = {
            code: 0,
            title: '',
            powerstatus: false,
            schedulemode: false,
            deviceenable: false,
            smsalertenable: false
        };
        return t;
    };
    // in controller
    $scope.ctrlHome_init = function () {

        //var socket = io.connect('http://localhost:1010');
        //
        //socket.on('news', function(data) {
        //    console.log(data);
        //    socket.emit('my other event', {my: 'data'});
        //});


        $scope.refreshData();

    };

    $scope.refreshData = function () {

        data_api.getDeviceInfos()
            .then(function (arrItems) {

                $scope.deviceinforecs = arrItems;

            }, reason => {
                console.log('Error: ' + reason);
            });


    }
    // setTimeout(function () {
    //     $scope.$apply(function () {
    //         $scope.refreshData();
    //     });
    // }, 3000)
    $scope.DateSelected = newModel();


    //----------------not used -------------------
    $scope.activeDevicecode = 0;
    $scope.showDashboard = function (record) {
        console.log('dialog -> Record  [Device code] ' + record.code);
        $scope.activeDevicecode = record.code;
    }
    //-------------------------------------------
    $scope.getSchModeAsString = function (pCode) {

        for (i in userData.getSchMode()) {
            if (userData.getSchMode()[i].id == pCode) {
                return userData.getSchMode()[i].name;
            }
        }
        // if (userData.getSchMode()[pCode - 1] != undefined)
        //     return userData.getSchMode()[pCode - 1].name;
        return "";
    }

    $scope.showDialogEditinfo = function (size, record) {


        $scope.DateSelected = record;
        var modalInstance = $uibModal.open({
            templateUrl: '/home/views/templates/DeviceInfoEditDialogTemplate.html',
            controller: ctrl_Home_Edit_ModalInstanceCtrl,
            // size: size,
            resolve: {
                //baray pass dadan parameter to control dialog
                pRecordSelected: function () {
                    return angular.copy($scope.DateSelected);
                },
                isFormEdit: function () { return true; }


            }
        });

        modalInstance.result.then(function (jsonArrayObjetPassFromModel) {
            //  $log.info('++++++++++++++ put to server Device info ++++++++++++++++');
            //  if (jsonArrayObjetPassFromModel == undefined || jsonArrayObjetPassFromModel.length == 0)
            //    return;

            var editedfromDailogItem = jsonArrayObjetPassFromModel[0].obj;

            for (var t = 0; t < $scope.deviceinforecs.length; t++) {
                if ($scope.deviceinforecs[t].code == editedfromDailogItem.code) {

                    $scope.deviceinforecs[t] = editedfromDailogItem;
                    break;

                }
            }
         


        }, function () {
            //  $log.info('Modal dismissed at: ' + new Date());
        });

    };

    $scope.showDialogInsertinfo = function (size, record) {
        var modalInstance = $uibModal.open({
            templateUrl: '/home/views/templates/DeviceInfoInsertDialogTemplate.html',
            controller: ctrl_Home_Edit_ModalInstanceCtrl,
            // size: size,
            resolve: {
                //baray pass dadan parameter to control dialog
                pRecordSelected: function () {
                    var now = MyUtil.unixTime_now();
                    var new_item = {
                        code: "",
                        createdAt: now,
                        deviceenable: false,
                        durationtimesecs: 60,
                        green_house_code: 1,
                        powerstatus: false,
                        schedulemode: 4,
                        smsalertenable: false,
                        starttime: 0,
                        title: "",
                        updatedAt: now
                    }

                    return angular.copy(new_item);
                }, isFormEdit: function () { return false; }


            }
        });

        modalInstance.result.then(function (jsonArrayObjetPassFromModel) {

            $scope.refreshData();

        });
    }

    $scope.delete_device_info_OpenDialog = function (record) {

        $scope.recordtemp = record;
        var size = 0;
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

                selectedItem: function () {
                    return $scope.recordtemp;
                }


            }
        });
        modalInstance.result.then(function (selectedItem) {

            data_api.deleteDeviceInfos(selectedItem.code).then(data => {

                $scope.refreshData();

            }, reason => {
                AppLog.WriteError(reason);

            });
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };


});

