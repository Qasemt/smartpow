var DialogTemplateCtrlSensorInfo = function ($scope, userData, data_api,$http, $uibModalInstance, tempAndhumiSelected, $log, filter, p_green_house_list, pMode, AppLog) {

    $scope.Mode = pMode;
    $scope._green_house_list = p_green_house_list;
    $scope.userData = userData;
    $scope.tempAndhumiSelected = tempAndhumiSelected;

    $scope.findGreenHouse = function (green_house_code) {
        for (i = 0; i < $scope._green_house_list.length; i++) {
            if ($scope._green_house_list[i].code == green_house_code) {
                return $scope._green_house_list[i];
            }
        }
        return undefined;
    }
   
    $scope._timeErrorMessage = '';

    $scope.values = { titleform: "Add_New_Title", _has_error_service: false, _error_service_message: '' };
    $scope.init = function () {
        if ($scope.Mode == 'edit_mode') {
            $scope.values.titleform = "Edit";
            $scope.green_house_Selected = userData.selectGreenHouseItem($scope._green_house_list, $scope.tempAndhumiSelected.greenHouse.code);
        }
        else {
            $scope.values.titleform = "Add_New_Title";
            $scope.tempAndhumiSelected.hastemp=0;
            $scope.tempAndhumiSelected.hashum=0;
            $scope.tempAndhumiSelected.hasEC=0;
            $scope.tempAndhumiSelected.hasPH=0;
            $scope.tempAndhumiSelected.haslux=0;
            
        }


    }

    $scope.onchangeGreenHouseItem = function (item_Selected) {
        $scope.tempAndhumiSelected.greenHouse = item_Selected;

    };



    $scope.yes = function () {
        $scope.values._has_error_service = false;
        if ($scope.Mode == 'insert_mode') {

            data_api.insertSensorList( $scope.tempAndhumiSelected).then(data => {
                $uibModalInstance.close(data);

            }, reason => {
                $scope.values._has_error_service = true;
                $scope.values._error_service_message = err.message;
                AppLog.WriteError(err);
            });

         

        } else {

            data_api.updateSensorList( $scope.tempAndhumiSelected).then(data => {
                $uibModalInstance.close(data);

            }, reason => {
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
