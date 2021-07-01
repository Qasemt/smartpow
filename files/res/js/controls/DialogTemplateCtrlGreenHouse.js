var DialogTemplateCtrlGreenHouse = function ($scope, $http,data_api, $uibModalInstance, p_item_selected, $log, filter, allRecs, pMode,AppLog) {

    $scope.Mode = pMode;

    $scope.item_selected = p_item_selected;
    $scope._timeErrorMessage = '';
    $scope.values = {titleform: "Add_New_Title", _has_error_service: false, _error_service_message: ''};
    $scope.init = function () {
        if ($scope.Mode == 'edit_mode') {
            $scope.values.titleform = "Edit";

        }
        else {
            $scope.values.titleform = "Add_New_Title";
        }


    }


    //  $scope._id=
    //$scope.selected = {
    //    item: $scope.items[0]
    //};

    $scope.yes = function () {
        $scope.values._has_error_service = false;
        if ($scope.Mode == 'insert_mode') {

            data_api.insertGreenHouse($scope.item_selected).then( data => {
                $uibModalInstance.close(data);
              }, reason => {
                $scope.values._has_error_service = true;
                $scope.values._error_service_message = reason.message;
                //console.log('Error: ' + err.message);
                AppLog.WriteError(reason);
              } );

          

        } else {
            data_api.updateGreenHouse($scope.item_selected).then( data => {
                $uibModalInstance.close(data);
              }, reason => {
                $scope.values._has_error_service = true;
                $scope.values._error_service_message = reason.message;
                //console.log('Error: ' + err.message);
                AppLog.WriteError(reason);
              } );
              
            $http.post('service/home/greenhouse/update', $scope.item_selected)
                .success(function (allRecords) {

                    $uibModalInstance.close(allRecords);

                })
                .error(function (err,status) {
                    $scope.values._has_error_service = true;
                    $scope.values._error_service_message = err.message;
                    AppLog.WriteError(err);

                });
        }


    };

    $scope.cancel = function () {

        $uibModalInstance.dismiss('cancel');
    };

};
