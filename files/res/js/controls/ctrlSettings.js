/**
 * Created by Qasem on 2015/9/11.
 */


app.controller('ctrlSettings', function ($scope ,global_alert,userData,MyUtil,$http, $uibModal, $log, $filter)
{

    $scope.oneAtATime = true;
   $scope.appTitleValue=userData.appValues().appTitle;
  //  $scope.appTitleValue="jjj";
    $scope.ActionType = {
        GetSystemTime: 1,
        SetSystemTime: 2,
        SetFormIp: 3,
        GetCurrentIP: 4,
        GetMacAddress: 5,
        SystemReboot: 6
    };
 
    $scope._systemTimeIsNotValid = true;
    $scope._IpIsnotValid = true;

    $scope.IP_Pattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    $scope.wifiIpObj = {
        StaticIp: "",
        SubNetMask: "",
        WifiName: "",
        WifiPassword: "",
        CurrentIP: "",
        MacAddress: "",
        DefaultGatewayIp: "",
        WifiMode: 0
    }


    var url = 'service/home/system_params/getlist';
    $http.get(url)
        .success(function (data)
        {
            $scope._SysParams = data;
            for (ii = 0; ii < data.length; ii++)
            {
                keyval = data[ii].pkey;
                if (keyval == 1)//ip
                {
                    $scope.wifiIpObj.StaticIp = data[ii].pvalue;

                } else if (keyval == 2)// subnetmask
                {
                    $scope.wifiIpObj.SubNetMask = data[ii].pvalue;
                } else if (keyval == 3)// SSID
                {
                    $scope.wifiIpObj.WifiName = data[ii].pvalue;
                } else if (keyval == 4)// wifi password
                {
                    $scope.wifiIpObj.WifiPassword = data[ii].pvalue;
                } else if (keyval == 5)// wifi Mode  //1 hotspot 2 : wifi normal
                {
                    $scope.wifiIpObj.WifiMode = data[ii].pvalue;
                } else if (keyval == 6)//Default Gateway
                {
                    $scope.wifiIpObj.DefaultGatewayIp = data[ii].pvalue;
                }


            }
        })
        .error(function (data)
        {
            console.log('Error: ' + data);
        });


    $scope.show = true;
   


    $scope.onWifiMode = function (obj)
    {
         //$scope.wifiMode.Val=val;
        console.log("Wifi Mode " + obj);
    }

    $scope.onSystemTimeChanged = function (txtDateTime)
    {
        $scope._systemTimeIsNotValid = !validateDate(txtDateTime);
    };

    $scope.onIpChanged = function (txtIP)
    {
        $scope._IpIsnotValid = !validateIP(txtIP);
    };

    // check time...
    function validateDate(testDate)
    {
        var date_regex = /^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31) ([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
        var result = date_regex.test(testDate);
        console.log("Date time (" + testDate + ")" + result);
        return result;
    }

    function validateIP(ipValue)
    {
        var patternIp = /\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/;
        var result = patternIp.test(ipValue);
        console.log("Date time (" + ipValue + ")" + result);
        return result;
    }

    $scope.groups = [{
        title: 'Dynamic Group Header - 1', content: 'Dynamic Group Body - 1'
    }, {
        title: 'Dynamic Group Header - 2', content: 'Dynamic Group Body - 2'
    }];

    $scope.items = ['Item 1', 'Item 2', 'Item 3'];

    $scope.addItem = function ()
    {
        var newItemNo = $scope.items.length + 1;
        $scope.items.push('Item ' + newItemNo);
    };

    $scope.status = {
        isFirstOpen: true, isFirstDisabled: false
    };
    $scope.currentDatetime = "";
    $scope.GetSystemTime = function ()
    {
        var url = 'service/home/system_params/task?code=' + $scope.ActionType.GetSystemTime ;
        $http.get(url)
            .success(function (data)
            {
                var onlytimestart = $filter('date')(MyUtil.unixTime_to_date(data.unix_current_time), 'yyyy-MM-dd HH:mm:ss');
                $scope.currentDatetime = onlytimestart;
                console.log(MyUtil.unixTime_to_date(data.unix_current_time));

    })
            .error(function (data)
            {
                console.log('Error: ' + data);

            });
    };

    $scope.GetSystemReboot = function ()
    {
        var url = 'service/home/system_params/task?code='+ $scope.ActionType.SystemReboot;
        $http.get(url)
            .success(function (data)
            {
                global_alert.success( $filter('translate')('reboot_successful'));
                 

                console.log("System Reboot :"+data);
            })
            .error(function (data)
            {
                console.log('Error: ' + data);
            });
    };
    $scope._txtSetDataTime = "";
    //---------------- Define Func ----------------------

    $scope.SetSystemTime = function (passSetDataTime)
    {

        var url = 'service/home/system_params/task?code='+ $scope.ActionType.SetSystemTime;
        $http.post(url, {userTime: passSetDataTime})
            .success(function (data)
            {
                //   console.log("Message From Server : "+data.message);

                global_alert.success(  $filter('translate')('has_been_changed_successfully'));

            })
            .error(function (data)
            {
                console.log('Error: ' + data);
              
                global_alert.danger( ' System Error ');
            });
    }
    $scope.SubmitFormIP = function (passform)
    {

        // check to make sure the form is completely valid
        if (passform.$valid)
        {

            var url = 'service/home/system_params/task?code=' + $scope.ActionType.SetFormIp ;
            $http.post(url, $scope.wifiIpObj)
                .success(function (data)
                {
                    //   console.log("Message From Server : "+data.message);

                    global_alert.success( $filter('translate')('has_been_changed_successfully'));

                })
                .error(function (data)
                {
                    console.log('Error: ' + data.comment);
                    global_alert.danger( ' System Error ');

                });
        }

    };
    /*$scope.GetCurrentIP = function ()
    {

        //   $scope.wifiMode = {Val: 1};
        //   $scope.onWifiMode(1);
        var url = 'service/home/system_params/task?code=' + $scope.ActionType.GetCurrentIP ;
        $http.get(url)
            .success(function (data)
            {
                $scope.wifiIpObj.CurrentIP = data.current_ip;
            })
            .error(function (data)
            {
                console.log('Error: ' + data);
            });

    }*/
    $scope.GetNetAddressList = function ()
    {

        var modalInstance = $uibModal.open({
            templateUrl: '/home/views/templates/NetAddressList.html',
            controller: DialogTemplateCtrlNetAddressList,
            // size: size,
            resolve: {
                filter: function () {
                    return $filter;
                }
            }
        });
       /* var url = 'service/home/system_params/task?code=' + $scope.ActionType.GetMacAddress ;
        $http.get(url)
            .success(function (data)
            {
                $scope.wifiIpObj.MacAddress = data.mac_address;
            })
            .error(function (data)
            {
                console.log('Error: ' + data);
            });*/

    }
    
});