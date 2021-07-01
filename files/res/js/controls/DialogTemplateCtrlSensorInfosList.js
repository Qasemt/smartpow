/**
 * Created by Taaheri on 11/15/2016.
 */
var DialogTemplateCtrlSensorInfosList = function ($scope, data_api, userData, $http, $uibModalInstance, $log, filter, $timeout) {


    data_api.getSensorList().then(data => {
        $scope._Records = data;
    }, reason => {
        console.log('Error: ' + reason);
    });


    $scope.setSelected = function () {
        $scope.selected = this.d;
        $uibModalInstance.close($scope.selected);
        console.log($scope.selected);
    };

    $scope.cancel = function () {

        $uibModalInstance.dismiss('cancel');
    };

    $scope.init = function () {

    }

};

var DialogTemplateCtrlSensorInfosList_style2 = function ($scope, data_api, userData, $http, $uibModalInstance, $log, filter, $timeout) {


    data_api.getSensorList().then(data => {
        $scope._Records = data;
        for (i = 0; i < $scope._Records.length; i++) {
            $scope._Records[i].hide = false;
        }
    }, reason => {
        console.log('Error: ' + reason);
    });

    $scope.params = { is_selected_type: true }
    $scope.last_index_open = undefined;
    $scope.onSelectType = function (k) {
        if ($scope.last_index_open == undefined) {
            for (i = 0; i < $scope._Records.length; i++) {
                $scope._Records[i].hide = false;
            }

            $scope._Records[k].hide = true;
            $scope.last_index_open=k;
        }else{
            $scope._Records[k].hide = false;
            $scope.last_index_open=undefined;
        }

    }
    $scope.onItemSelectType=function(item,type)
    {
        $uibModalInstance.close({sensor_item:item,sensor_type:type});

    }


    $scope.cancel = function () {

        $uibModalInstance.dismiss('cancel');
    };

    $scope.init = function () {

    }

};