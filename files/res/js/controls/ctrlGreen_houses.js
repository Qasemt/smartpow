app.controller('ctrlGreen_houses', function ($scope,data_api, global_alert,userData, $http, $uibModal, $log, $filter) {

    $scope.appTitleValue = userData.appValues().appTitle;
    var reset_new_rec = function () {
        var t = {
           code: '',
            title: "",
            description: undefined
        };
        return t;
    };
    $scope.search = function (row) {
        return $filter
    };
    $scope.sortType = 'code'; // set the default sort type
    $scope.sortReverse = false;  // set the default sort order
 
    $scope.searchValue = '';
    $scope.rec_selected = reset_new_rec();


    //  $scope.formData = {};

    $scope.getDataList=function()
    {
        data_api.getGreenHouseList().then( data => {
            $scope._Records = data;
          }, reason => {
            console.log('Error: ' + reason);
          } );
        
    }


    $scope.getDataList();


    //------------------ delete -----------------------------------
    $scope.deleteOpenDialog = function (size, record) {
      
        
        // if(record.code==1)
        // {
        //     global_alert.danger($filter('translate')('202'),5000); // can not be deleted
        //     return;
        // }
        $scope.rec_selected = record;
        //  $scope.clon_dailytimeSelected= record.;
        var modalInstance = $uibModal.open({
            templateUrl: '/home/views/templates/DeleteTemplate.html',
            controller: function ($scope, $http, $uibModalInstance, selectedItem) {
                //  $scope.xSelectedItem=selectedItem;
              
                $scope.yes = function () {
               
                    modalInstance.result.then(function (selectedItem) {

                        data_api.deleteGreenHouse(selectedItem.code).then( data => {
                            $scope.getDataList();
                          }, reason => {
                            global_alert.danger(reason.message,10000); // can not be deleted
                          } );
            
                    }, function () {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
                  

                    $uibModalInstance.close(selectedItem);

                };

                $scope.cancel = function () {

                    $uibModalInstance.dismiss('cancel');
                };
            },
            size: size,
            scope: $scope,
            resolve: {
                //baray pass dadan parameter to control dialog
                selectedItem: function () {
                    return $scope.rec_selected;
                }


            }
        });
 
    };
    //------------------edit V-------------------------------------
    $scope.editOpenDialog = function (size, record) {


        $scope.rec_selected = record;
        var modalInstance = $uibModal.open({
			 animation:true,
  		   templateUrl: '/home/views/templates/GreenHouseEditDialogTemplate.html',
            controller: DialogTemplateCtrlGreenHouse,
			  controllerAs: '$ctrlGreen_Houses',
            // size: size,
            resolve: {
                //baray pass dadan parameter to control dialog
                p_item_selected: function () {
                    return angular.copy($scope.rec_selected);
                },

                filter: function () {
                    return $filter;
                }
                ,
                allRecs: function () {
                    return $scope._Records;
                }
                ,
                pMode: function () {
                    return 'edit_mode';
                }
            }
        });
        modalInstance.result.then(function (allRecords) {

            $scope.getDataList();

        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    //----------------- Insert  V----------------------------------
    $scope.InsertOpenDialog = function (size) {

        $scope.rec_selected = {}
        var modalInstance = $uibModal.open({
            templateUrl: '/home/views/templates/GreenHouseEditDialogTemplate.html',
            controller: DialogTemplateCtrlGreenHouse,
            //    size: size,
            resolve: {
                //baray pass dadan parameter to control dialog
                p_item_selected: function () {

                    return reset_new_rec();
                }
                ,
                filter: function () {
                    return $filter;
                },
                allRecs: function () {
                    return $scope._Records;
                }
                ,
                pMode: function () {
                    return 'insert_mode'
                }
            }
        });
        modalInstance.result.then(function (allRecords) {
            $scope.getDataList();
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.myValueFunction = function (o) {

        if ($scope.sortType == 'code') {

            return o.code;
        }
    }
});



