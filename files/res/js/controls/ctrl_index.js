app.controller('ctrl_index', function ($scope, userData, $http, $timeout, $uibModal, socket, $translate, $log, $filter, $css) {

    $scope.appTitleValue = userData.appValues().appTitle;
    // Simply add stylesheet(s)
    
    $scope.init = function () {
  


    };
    

    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);

        //   cacheService.setdata('lang_key', langKey)

    }


});


