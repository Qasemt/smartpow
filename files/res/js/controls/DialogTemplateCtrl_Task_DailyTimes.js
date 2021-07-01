
var DialogTemplateCtrl_Task_DailyTimes = function ($scope, userData,MyUtil,$http, $uibModalInstance, dailytimeSelected, $log, filter, allRecs, pMode) {
    // $scope.mytime = new Date('2011-04-11 11:51:00');

    $scope.Mode = pMode;
    $scope.hstep = 1;
    $scope.mstep = 1;
    $scope.durationinMinutes = undefined;

    $scope._getDevicenames = userData.getDeviceItems();
    $scope.dailytimeSelected = dailytimeSelected;
    $scope._hassErrorBiggerBiggerOrLess = true;
    $scope._timeErrorMessage = '';
    $scope.init = function () {
        if ($scope.Mode == 'insert_mode' || $scope.Mode == 'edit_mode') {
            $scope.durationinMinutes = 3;
            $log.log('init modal');
            if (dailytimeSelected != null && dailytimeSelected.id > 0) {
                $scope.titleform = "Edit";
                $scope.dailytimeSelected.starttime = MyUtil.unixTime_to_date($scope.dailytimeSelected.starttime);
                $scope.dailytimeSelected.endtime = MyUtil.unixTime_to_date($scope.dailytimeSelected.endtime);
                $scope.durationinMinutes = MyUtil.myGetMinutes($scope.dailytimeSelected.starttime, $scope.dailytimeSelected.endtime);
                //    $log.log('daily '+Date.( $scope.dailytimeSelected.starttime));
                $log.log('device Code ' + $scope.dailytimeSelected.deviceCode);
                $scope.selectedDeviceCode =  userData.selectDeviceItem($scope._getDevicenames,$scope.dailytimeSelected.deviceCode);

            }
            else {
                $scope.titleform = "Add_New_Title";

                $scope.dailytimeSelected.starttime = new Date();
                $scope.dailytimeSelected.endtime = $scope.dailytimeSelected.starttime.clone().addMinutes($scope.durationinMinutes);
                $scope.selectedDeviceCode = $scope._getDevicenames[0];
                $scope.dailytimeSelected.deviceCode = $scope.selectedDeviceCode.code;
                $scope.dailytimeSelected.id = 0;
            }
            $scope.istimevalided();
        }

    }

    $scope.onchangeDeviceItem = function (deviceSelected) {

        $scope.dailytimeSelected.deviceCode = deviceSelected.code;
        $scope.istimevalided();

    };

    $scope.changed = function () {

        $scope.istimevalided();

    };
    $scope.onDurationInMinutesChanged = function (value) {
        $scope.durationinMinutes = value;

        $scope.istimevalided();
    };


    $scope.istimevalided = function () {

        var result = false;
        $scope.dailytimeSelected.endtime = $scope.dailytimeSelected.starttime.clone().addMinutes($scope.durationinMinutes);
        $scope._hassErrorBiggerBiggerOrLess = false;
       
        if (MyUtil.myGetMinutes($scope.dailytimeSelected.starttime, $scope.dailytimeSelected.endtime) <= 0) {
            $scope._timeErrorMessage = "Must be bigger 1 minute.";
            $scope._hassErrorBiggerBiggerOrLess = true;
        } else if (hasconflictTime($scope.dailytimeSelected.id, $scope.dailytimeSelected.deviceCode, $scope.dailytimeSelected.starttime, $scope.dailytimeSelected.endtime)) {
            $scope._timeErrorMessage = "Error_2011_Conflicts_With_Other_Records";
            $scope._hassErrorBiggerBiggerOrLess = true;
        }

        $log.log('_hassErrorBiggerBiggerOrLess  : ' + $scope._hassErrorBiggerBiggerOrLess);
        return result;

    };
    //  $scope._id=
    //$scope.selected = {
    //    item: $scope.items[0]
    //};

    var hasconflictTime = function (id, devicCode, sTime, eTime) {
        //  var ishass = false;
        var con = 0;
        for (var i = 0; i < allRecs.length; i++) {

            var iid = allRecs[i].id;
            if (id == iid)
                continue;

            if (devicCode != allRecs[i].deviceCode)
                continue;


            var istart = new Date(allRecs[i].starttime);
            var iend = new Date(allRecs[i].endtime);

            var sEntry = sTime.HourAndMinuteToSecondsOfDay();
            var eEntry = eTime.HourAndMinuteToSecondsOfDay();
            var si = istart.HourAndMinuteToSecondsOfDay();
            var ei = iend.HourAndMinuteToSecondsOfDay();
            if (ei < si) {

                if ((sEntry <= ei || sEntry >= si) || (eEntry <= ei || eEntry >= si))
                    con++;

            } else if (sEntry <= ei && eEntry >= si) {
                // ishass = true;
                con++;
            }

        }
        return con > 0;
    };

    $scope.yes = function () {
        if ($scope.Mode == 'insert_mode' || $scope.Mode == 'edit_mode') {
            $scope.istimevalided();
            if ($scope._hassErrorBiggerBiggerOrLess) return;

            $scope.dailytimeSelected.durationofsecond = ($scope.dailytimeSelected.endtime - $scope.dailytimeSelected.starttime) / 1000;
            $scope.dailytimeSelected.durationofminute = $scope.dailytimeSelected.durationofsecond / 60;
            $scope.dailytimeSelected.endtime = MyUtil.date_to_unixTime($scope.dailytimeSelected.endtime);
            $scope.dailytimeSelected.starttime = MyUtil.date_to_unixTime($scope.dailytimeSelected.starttime);
        }
        $uibModalInstance.close($scope.dailytimeSelected);

    };

    $scope.cancel = function () {

        $uibModalInstance.dismiss('cancel');
    };

};

