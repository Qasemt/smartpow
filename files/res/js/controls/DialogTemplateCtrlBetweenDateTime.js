/**
 * Created by Taaheri on 11/15/2016.
 */
var DialogTemplateCtrlBetweenDateTime = function ($scope, $http, $uibModalInstance, pDateSelected, $log, filter, $timeout) {
    // $scope.mytime = new Date('2011-04-11 11:51:00');

    $scope.hstep = 1;
    $scope.mstep = 1;


    $scope._hassErrorBiggerBiggerOrLess = true;
    $scope._timeErrorMessage = '';



    // both calendar need to be close by default
    $scope.opened = {
        start: false,
        end: false
    };

    //..................................

    $scope.startDatePickerOpen = function () {
        $timeout(function () {

            $scope.opened.start = true;
        });

    };

    $scope.endDatePickerOpen = function () {

        $timeout(function () {
            $scope.opened.end = true;
        });
    };


    $scope.changed = function () {
        $scope.istimevalided();

    };


    $scope.istimevalided = function () {


        $scope._hassErrorBiggerBiggerOrLess = false;
        if ($scope.DateSelected.StartTime >= $scope.DateSelected.EndTime) {

            $scope._timeErrorMessage = "Error_2005_End_time_must_be_bigger_then_Start_time";
            $scope._hassErrorBiggerBiggerOrLess = true;
        }


        $log.log('_hassErrorBiggerBiggerOrLess  : ' + $scope._hassErrorBiggerBiggerOrLess);


    };



    $scope.yes = function () {

        $scope.istimevalided();
        if ($scope._hassErrorBiggerBiggerOrLess) return;
        $uibModalInstance.close($scope.DateSelected);

    };

    $scope.cancel = function () {

        $uibModalInstance.dismiss('cancel');
    };

    $scope.init = function () {
        $scope._hassErrorBiggerBiggerOrLess = false;
        $scope.titleform = "Select Date Times";
        $log.log('init modal');
        $scope.DateSelected = pDateSelected;
        if ($scope.DateSelected.StartTime != undefined && $scope.DateSelected.StartTime =="" )
            $scope.DateSelected.StartTime = new Date();

        if ($scope.DateSelected.EndTime != undefined && $scope.DateSelected.EndTime =="" )
            $scope.DateSelected.EndTime = new Date();
    }

};