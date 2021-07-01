/**
 * Created by Taaheri on 11/15/2016.
 */
var DialogTemplateCtrlNetAddressList = function ($scope, $http, $uibModalInstance, $log, filter, $timeout) {

    var urltemp = "/service/home/system_params/task?code=5";
    $http.get(urltemp)
        .success(function (data) {
            $scope._Records = data;
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });


    $scope.cancel = function () {

        $uibModalInstance.dismiss('cancel');
    };

    $scope.init = function () {

    }

};