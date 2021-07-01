//app.factory('socket', function ($rootScope) {
//  //  var socket = io.connect(document.location.origin + "/FirstPage");
//});
app.controller('ctrlTask_daily_time_for_device', function ($scope, userData,MyUtil, $http, $uibModal, $log, $filter) {

    $scope.appTitleValue = userData.appValues().appTitle;
    var newDailytime = function () {
        var t = {
            deviceCode: null,
            starttime: null,
            endtime: null,
            durationofsecond: 0,
            durationofminute: 0,
            smsalert: false,
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
    
    $scope.searchValue = '';
    $scope.dailytimeSelected = newDailytime();

    $scope.DateDiffStr = function (d1, d2) {
        return MyUtil.dateDiffStr(d1, d2);
    };

      $scope.getDataList=function()
    {
           //  when landing on the page, get all records
    $http.get('service/home/taskdailytime/getlist')
        .success(function (data) {
            $scope.recs_dailytimes = data;

        })
        .error(function (data) {
            console.log('Error: ' + data);
        });
    }
$scope.getDataList();


    $scope.deleteOpenDialog = function (size, record) {
        $log.info('dialog -> daily time [id] ' + record.id);
        $scope.dailytimeSelected = record;
        //  $scope.clon_dailytimeSelected= record.;
        var modalInstance = $uibModal.open({
            templateUrl: '/home/views/templates/DeleteTemplate.html',
            controller: DialogTemplateCtrl_Task_DailyTimes,
            size: size,
            resolve: {
                //baray pass dadan parameter to control dialog
                dailytimeSelected: function () {
                    return $scope.dailytimeSelected;
                },
                filter: function () {
                    return $filter;
                }
                , allRecs: function () {
                    return $scope.recs_dailytimes;
                }
                ,
                pMode: function () {
                    return 'delete_mode'
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $log.info('delete agree : ' + new Date());
            $http.delete('service/home/taskdailytime/delete_by_id?id=' + $scope.dailytimeSelected.id)
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

    //------------------edit V-------------------------------------------------------------

    $scope.editOpenDialog = function (size, record) {
        $log.info(' open  edit dialog -> daily time [id] ' + record.id);

        $scope.dailytimeSelected = record;
        var modalInstance = $uibModal.open({
            templateUrl: '/home/views/templates/Task_Daily_TimeForDevice_EditDialogTemplate.html',
            controller: DialogTemplateCtrl_Task_DailyTimes,
            // size: size,
            resolve: {
                //baray pass dadan parameter to control dialog
                dailytimeSelected: function () {
                    return angular.copy($scope.dailytimeSelected);
                },

                filter: function () {
                    return $filter;
                }
                ,
                allRecs: function () {
                    return $scope.recs_dailytimes;
                }
                ,
                pMode: function () {
                    return 'edit_mode';
                }
            }
        });
        modalInstance.result.then(function (editedfromDailogItem) {

         //   $log.info('result yes ==> edit dialog -> daily time [DeviceCode] ' + editedfromDailogItem.durationofsecond);

            $http.post('service/home/taskdailytime/update_task_daily_time', editedfromDailogItem)
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


    //----------------- Insert  V-------------------------------------------------------
    $scope.InsertOpenDialog = function (size) {
        $log.info(' open  Insert dialog -> daily time ');

        $scope.dailytimeSelected = {}

        var modalInstance = $uibModal.open({
            templateUrl:  '/home/views/templates/Task_Daily_TimeForDevice_EditDialogTemplate.html',
            controller: DialogTemplateCtrl_Task_DailyTimes,
            //    size: size,
            resolve: {
                //baray pass dadan parameter to control dialog
                dailytimeSelected: function () {

                    return newDailytime();
                }
                ,
                filter: function () {
                    return $filter;
                },
                allRecs: function () {
                    return $scope.recs_dailytimes;
                }
                ,
                pMode: function () {
                    return 'insert_mode'
                }
            }
        });
        modalInstance.result.then(function (insertfromDailogItem) {

            $log.info('result yes ==> Insert dialog -> daily time [DeviceCode] ' + insertfromDailogItem.starttime);

            $http.post('service/home/taskdailytime/insert_task_daily_time', insertfromDailogItem)
                .success(function (data) {

                     $scope.getDataList();
                })
                .error(function (data) {
                    console.log('Error: ' + data.message);
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

