/**
 * Created by qasem on 2016-11-30.
 */
Number.prototype.AddSecs = function (secs) {
    return this + (secs);
};
Number.prototype.AddMinutes = function (minutes) {
    return this + (minutes * 60);
};

String.prototype.padZero = function (len, c) {
    var s = '', c = c || '0', len = (len || 2) - this.length;
    while (s.length < len) s += c;
    return s + this;
};
Number.prototype.padZero = function (len, c) {
    return String(this).padZero(len, c);
};

app.directive('parseBool', [function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attrs, controller) {
            controller.$formatters.push(function (modelValue) {
                console.log('model', modelValue, typeof modelValue);
                return Boolean(modelValue);
            });

            controller.$parsers.push(function (viewValue) {
                console.log('view', viewValue, typeof viewValue);
                return viewValue;
            });
        }
    }
}])

app.service('data_api', function ($http, $q) {
    var api = {};

    api.getDeviceInfos = function () {
        var defer = $q.defer();
        $http({ method: 'GET', url: 'service/home/deviceinfo/getlist', headers: { 'Access-Control-Allow-Origin': 'localhost:*' } }).
            success(function (data) {
                // alter data if needed
                defer.resolve(data);
            }).
            error(function (data, status, headers, config) {
                defer.reject();
            });
        return defer.promise;
    }

    api.updateDeviceInfos = function (record) {

        var defer = $q.defer();
        $http.put('service/home/deviceinfo/', record)
            .success(function (data) {
                defer.resolve(data);
            })
            .error(function (err) {
                defer.reject(err);
            });
        return defer.promise;
    }
    api.deleteDeviceInfos = function (code) {
        var defer = $q.defer();
        $http.delete('/service/home/deviceinfo/delete_by_code?code=' + code)
            .success(function (data) {
                defer.resolve(data);
            })
            .error(function (data) {
                defer.reject(data);
            });
        return defer.promise;
    }
    api.insertDeviceInfos = function (record) {

        var defer = $q.defer();
        $http.post('service/home/deviceinfo/', record)
            .success(function (data) {
                defer.resolve(data);
            })
            .error(function (err) {
                defer.reject(err);
            });
        return defer.promise;
    }

    api.getSensorList = function () {
        var defer = $q.defer();
        $http.get('service/home/sensorinfo/getlist')
            .success(function (data) {
                defer.resolve(data);
            })
            .error(function (data) {
                defer.reject(data);
            });
        return defer.promise;
    }

    api.insertSensorList = function (record) {
        var defer = $q.defer();
        $http.post('service/home/sensorinfo/insert_sensorinfo', record)
            .success(function (data) {
                defer.resolve(data);
            })
            .error(function (err) {
                defer.reject(err);
            });
        return defer.promise;
    }

    api.updateSensorList = function (record) {

        var defer = $q.defer();
        $http.post('service/home/sensorinfo/update_sensorinfo', record)
            .success(function (data) {
                defer.resolve(data);
            })
            .error(function (err) {
                defer.reject(err);
            });
        return defer.promise;
    }
    api.deleteSensorList = function (xid) {
        var defer = $q.defer();
        $http.delete('service/home/sensorinfo/delete_by_id?id=' + xid)
            .success(function (data) {
                defer.resolve(data);
            })
            .error(function (data) {
                defer.reject(data);
            });
        return defer.promise;
    }


    api.getGreenHouseList = function () {
        var defer = $q.defer();
        $http.get('/service/home/greenhouse/getlist')
            .success(function (data) {
                defer.resolve(data);
            })
            .error(function (data) {
                defer.reject(data);
            });
        return defer.promise;
    }
    api.insertGreenHouse = function (record) {
        var defer = $q.defer();
        $http.post('service/home/greenhouse/insert', record)
            .success(function (data) {
                defer.resolve(data);
            })
            .error(function (err) {
                defer.reject(err);
            });
        return defer.promise;
    }
    api.updateGreenHouse = function (record) {

        var defer = $q.defer();
        $http.post('service/home/greenhouse/update', record)
            .success(function (data) {
                defer.resolve(data);
            })
            .error(function (err) {
                defer.reject(err);
            });
        return defer.promise;
    }
    api.deleteGreenHouse = function (code) {
        var defer = $q.defer();
        $http.delete('service/home/greenhouse/delete_by_code?code=' + code)
            .success(function (data) {
                defer.resolve(data);
            })
            .error(function (data) {
                defer.reject(data);
            });
        return defer.promise;
    }

    api.getMonitorList = function () {
        var defer = $q.defer();
        $http.get('service/home/monitorlist/getlist')
            .success(function (data) {
                defer.resolve(data);
            })
            .error(function (data) {
                defer.reject(data);
            });
        return defer.promise;
    }
    api.insertMonitorList = function (record) {
        var defer = $q.defer();
        $http.post('/service/home/monitorlist/insert', record)
            .success(function (data) {
                defer.resolve(data);
            })
            .error(function (err) {
                defer.reject(err);
            });
        return defer.promise;
    }
    api.deletetMonitorList = function (id) {
        var defer = $q.defer();
        $http.delete('/service/home/monitorlist/delete_by_id?id=' + id)
            .success(function (data) {
                defer.resolve(data);
            })
            .error(function (data) {
                defer.reject(data);
            });
        return defer.promise;
    }
    api.getTempLogs_by_code = function (sensor_code, record_limit, isonlyDate) {
        var defer = $q.defer();
        $http.get("service/home/templogs/getlist_by_code?sensor_code=" + sensor_code + "&number_of_read_logs=" + record_limit + "&is_only_date=" + isonlyDate)
            .success(function (data) {
                defer.resolve(data);
            })
            .error(function (err) {
                defer.reject(err);
            });
        return defer.promise;
    }

    api.getTempLogs_by_time = function (sensor_code, sDate, eDate, record_limit, isonlyDate) {
        var defer = $q.defer();
        $http.get("service/home/templogs/getlist_by_time?sensor_code=" + sensor_code + "&sdate_unix=" + sDate + "&edate_unix=" + eDate + "&number_of_read_logs=" + record_limit + "&is_only_date=" + isonlyDate)
            .success(function (data) {
                defer.resolve(data);
            })
            .error(function (err) {
                defer.reject(err);
            });
        return defer.promise;
    }
    return api;
});
app.service('userData', function ($translate, data_api, $q) {

    var arrSchMode = [{ id: 1, name: $translate.instant('Daily') }, { id: 4, name: $translate.instant('Manually') }, { id: 5, name: $translate.instant('Sensor') }];
    var arr_time_items = [
        { id: 1, name: $translate.instant('minutes') },
        { id: 2, name: $translate.instant('hours') },
        { id: 3, name: $translate.instant('days') }];
    var device_list = [];
    var sensor_list = [];
    var enum_sensor = {
        NAN: -1,
        TEMP: 1 << 0,
        HUM: 1 << 1,
        AC: 1 << 2,
        PH: 1 << 3,
        LUX: 1 << 4,
        CO2: 1 << 5,
        TEM_HUM: 1 << 0 | 1 << 1 //temp and hum
    };
    var map_sensor = [{ "name": "temp", "code": 1 }, { "name": "hum", "code": 2 }, { "name": "ph", "code": 3 }, { "name": "ec", "code": 4 }, { "name": "lux", "code": 5 }];
    this.get = function () {
        // do your ajax call to get your user data and in the response data = response;
    }

    this.appValues = function () {
        return { appTitle: "Smart Pow new" };
    }

    this.getSchMode = function () {

        return arrSchMode;
    };
    this.getSchModeName = function (pCode) {

        for (i in arrSchMode) {
            if (arrSchMode[i].id == pCode) {
                return arrSchMode[i].name;
            }
        }

        return "";
    };
    this.getSchModeItem = function (pCode) {

        for (i in arrSchMode) {
            if (arrSchMode[i].id == pCode) {
                return arrSchMode[i];
            }
        }

        return "";
    };

    this.addMinutes = function (currentDate, minutes_epoch) {
        return currentDate + (minutes_epoch * 60);
    };
    this.addHours = function (currentDate, minutes_epoch) {
        return currentDate + (minutes_epoch * 3600); //3600 secs= 1 hour
    };
    this.addDays = function (currentDate, minutes_epoch) {
        return currentDate + (minutes_epoch * 86400); //86400 secs= 1 days
    };

    this.getDeviceItems = function () {

        if (device_list.length == 0) {
            data_api.getDeviceInfos()
                .then(function (items) {
                    device_list = items;
                });
        }

        return device_list;
    }
    this.selectDeviceItem = function (devices, pcode) {
        for (i in devices) {
            if (devices[i].code == pcode) {
                return devices[i];
            }
        }
        return "";
    }

    // this.getSensorList = function () {

    //     if (sensor_list.length == 0) {
    //        data_api.getSensorList()
    //             .then(function (data) {
    //                 sensor_list = data;
    //             })

    //     }
    //     return sensor_list;

    // }
    this.get_enum_sensor = function () {
        return enum_sensor;
    }
    this.selectSensorItem = function (sensors, p_sensor_code) {
        for (i in sensors) {
            if (sensors[i].sensorcode == p_sensor_code) {
                return sensors[i];
            }
        }
        return undefined;
    }
    this.selectGreenHouseItem = function (greenHouses, p_greenHouse_code) {
        for (i in greenHouses) {
            if (greenHouses[i].code == p_greenHouse_code) {
                return greenHouses[i];
            }
        }
        return undefined;
    }
    this.mapSensorTypeByCode = function (code) {

        for (let index = 0; index < map_sensor.length; index++) {
            const element = map_sensor[index];
            if (element.code == code)
                return element

        }

        return {};
    }
    this.mapSensorTypeByName = function (name) {

        for (let index = 0; index < map_sensor.length; index++) {
            const element = map_sensor[index];
            if (element.name === name)
                return element
        }

        return {};
    }
    this.get_time_items = function () {
        return arr_time_items;
    }
});

app.factory('MyUtil', function ($translate, $rootScope) {

    var MyUtil = {};
    //-------- marbot be jalali date ------
    g_days_in_month = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    j_days_in_month = new Array(31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29);
    //_______________

    var statusCodes = {};
    statusCodes[100] = "Continue";

    statusCodes[101] = "Switching Protocols";
    statusCodes[102] = "Processing";
    statusCodes[200] = "OK";
    statusCodes[201] = "Created";
    statusCodes[202] = "Accepted";
    statusCodes[203] = "Non Authoritative Information";
    statusCodes[204] = "No Content";
    statusCodes[205] = "Reset Content";
    statusCodes[206] = "Partial Content";
    statusCodes[207] = "Multi-Status";
    statusCodes[300] = "Multiple Choices";
    statusCodes[301] = "Moved Permanently";
    statusCodes[302] = "Moved Temporarily";
    statusCodes[303] = "See Other";
    statusCodes[304] = "Not Modified";
    statusCodes[305] = "Use Proxy";
    statusCodes[307] = "Temporary Redirect";
    statusCodes[308] = "Permanent Redirect";
    statusCodes[400] = "Bad Request";
    statusCodes[401] = "Unauthorized";
    statusCodes[402] = "Payment Required";
    statusCodes[403] = "Forbidden";
    statusCodes[404] = "Not Found";
    statusCodes[405] = "Method Not Allowed";
    statusCodes[406] = "Not Acceptable";
    statusCodes[407] = "Proxy Authentication Required";
    statusCodes[408] = "Request Timeout";
    statusCodes[409] = "Conflict";
    statusCodes[410] = "Gone";
    statusCodes[411] = "Length Required";
    statusCodes[412] = "Precondition Failed";
    statusCodes[413] = "Request Entity Too Large";
    statusCodes[414] = "Request-URI Too Long";
    statusCodes[415] = "Unsupported Media Type";
    statusCodes[416] = "Requested Range Not Satisfiable";
    statusCodes[417] = "Expectation Failed";
    statusCodes[419] = "Insufficient Space on Resource";
    statusCodes[420] = "Method Failure";
    statusCodes[422] = "Unprocessable Entity";
    statusCodes[423] = "Locked";
    statusCodes[424] = "Failed Dependency";
    statusCodes[428] = "Precondition Required";
    statusCodes[429] = "Too Many Requests";
    statusCodes[431] = "Request Header Fields Too Large";
    statusCodes[500] = "Internal Server Error";
    statusCodes[501] = "Not Implemented";
    statusCodes[502] = "Bad Gateway";
    statusCodes[503] = "Service Unavailable";
    statusCodes[504] = "Gateway Timeout";
    statusCodes[505] = "HTTP Version Not Supported";
    statusCodes[507] = "Insufficient Storage";
    statusCodes[511] = "Network Authentication Required";

    arrDayOfWeek = [{ id: 0, name: 'Monday' }, { id: 1, name: 'Tuesday' }, { id: 2, name: 'Wednesday' }, {
        id: 3,
        name: 'Thursday'
    }, { id: 4, name: 'Friday' }, { id: 5, name: 'Saturday' }, { id: 6, name: 'Sunday' }];


    arrSensitiveSensor = [{ id: 1, name: 'Temperature' }, { id: 2, name: 'Humidity' }, { id: 3, name: 'EC' }, { id: 4, name: 'PH' }];


    MyUtil.getSensitiveSensor = function () {

        return arrSensitiveSensor
    };

    MyUtil.ToHttpCodeToName = function (statusCode) {

        if (statusCodes.hasOwnProperty(statusCode)) {
            return statusCodes[statusCode];
        } else {
            throw new Error("Status code does not exist: " + statusCode);
        }
    }

    MyUtil.isRTL = function () {


        var languageKey = $translate.use();
        if (languageKey.indexOf('en') > -1)
            return false;
        else return true;

        return false;
    }

    MyUtil.changeLanguage = function (keylang) {

        $translate.use(keylang);
        $rootScope.global_values = { x: "true" }

    }
    MyUtil.getSeconds = function (sTime, eTime) {

        if (sTime == 0) return 0;

        var secs = (eTime - sTime);
        if (secs < 0) return 0;
        return Math.abs(secs);
    };
    MyUtil.myGetMinutes = function (sTime, eTime) {

        var secs = (eTime - sTime) / 1000;
        var totalmin = secs / 60;
        return Math.abs(totalmin);
    };


    MyUtil.date_to_unixTime = function (date) {
        return Math.round(date.getTime() / 1000);
    }
    MyUtil.unixTime_to_date = function (unix_Time) {
        return new Date(unix_Time * 1000);
    }
    MyUtil.unixTime_now = function (unix_Time) {
        return Math.floor((new Date()).getTime() / 1000);
    }

    MyUtil.GetDateTimeWithFormat = function (mydatetime, formatestring, filter) {
        var final = filter('date')(mydatetime, formatestring);

        return final;
    };
    MyUtil.dayOfWeekAsString = function (dayIndex) {
        return arrDayOfWeek[dayIndex];
    };

    // MyUtil.GetmyFormatTime = function (mydatetime, filter) {
    //     var final;
    //     var onlytimestart = filter('date')(new Date(mydatetime), 'HH:mm:ss');
    //     final = '2015-01-01 ' + onlytimestart;
    //     return new Date(final);
    // };
    MyUtil.dateDiffStr = function (unix_d1, unix_d2) {
        var ms = new Date(unix_d1 * 1000) - new Date(unix_d2 * 1000);
        ms = Math.abs(ms);
        var d, h, m, s;
        s = Math.floor(ms / 1000);
        m = Math.floor(s / 60);
        s = s % 60;
        h = Math.floor(m / 60);
        m = m % 60;
        //d = Math.floor(h / 24);
        //h = h % 24;

        // this.days = d;
        // this.hours = h;
        // this.minutes = m;
        // this.seconds = s;
        return h.padZero(2, '0') + ":" + m.padZero(2, '0') + ":" + s.padZero(2, '0');
    };

    MyUtil.secondsToString = function (temp) {

        // TIP: to find current time in milliseconds, use:
        // var  current_time_milliseconds = new Date().getTime();

        function numberEnding(number) {
            return (number > 1) ? 's' : '';
        }

        // var temp = Math.floor(milliseconds / 1000);

        var years = Math.floor(temp / 31536000);
        if (years) {
            return years + ' year' + numberEnding(years);
        }
        //TODO: Months! Maybe weeks? 
        var days = Math.floor((temp %= 31536000) / 86400);
        if (days) {
            return days + ' day' + numberEnding(days);
        }
        var hours = Math.floor((temp %= 86400) / 3600);
        if (hours) {
            return hours + ' hour' + numberEnding(hours);
        }
        var minutes = Math.floor((temp %= 3600) / 60);
        if (minutes) {
            return minutes + ' minute' + numberEnding(minutes);
        }
        var seconds = temp % 60;
        if (seconds) {
            return seconds + ' second' + numberEnding(seconds);
        }
        return 'less than a second'; //'just now' //or other string you like;

    }


    function div(a, b) {
        return Math.floor(a / b);
    }
    MyUtil.gregorianToJalali = function (g /* array containing year, month, day*/) {
        var gy, gm, gd;
        var jy, jm, jd;
        var g_day_no, j_day_no;
        var j_np;

        var i;

        gy = g[0] - 1600;
        gm = g[1] - 1;
        gd = g[2] - 1;

        g_day_no = 365 * gy + div((gy + 3), 4) - div((gy + 99), 100) + div((gy + 399), 400);
        for (i = 0; i < gm; ++i)
            g_day_no += g_days_in_month[i];
        if (gm > 1 && ((gy % 4 == 0 && gy % 100 != 0) || (gy % 400 == 0)))
            /* leap and after Feb */
            ++g_day_no;
        g_day_no += gd;

        j_day_no = g_day_no - 79;

        j_np = div(j_day_no, 12053);
        j_day_no %= 12053;

        jy = 979 + 33 * j_np + 4 * div(j_day_no, 1461);
        j_day_no %= 1461;

        if (j_day_no >= 366) {
            jy += div((j_day_no - 1), 365);
            j_day_no = (j_day_no - 1) % 365;
        }

        for (i = 0; i < 11 && j_day_no >= j_days_in_month[i]; ++i) {
            j_day_no -= j_days_in_month[i];
        }
        jm = i + 1;
        jd = j_day_no + 1;

        return new Array(jy, jm, jd);
    }

    MyUtil.jalaliToGregorian = function (j /* array containing year, month, day*/) {
        var gy, gm, gd;
        var jy, jm, jd;
        var g_day_no, j_day_no;
        var leap;

        var i;

        jy = j[0] - 979;
        jm = j[1] - 1;
        jd = j[2] - 1;

        j_day_no = 365 * jy + div(jy, 33) * 8 + div((jy % 33 + 3), 4);
        for (i = 0; i < jm; ++i)
            j_day_no += j_days_in_month[i];

        j_day_no += jd;

        g_day_no = j_day_no + 79;

        gy = 1600 + 400 * div(g_day_no, 146097); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
        g_day_no = g_day_no % 146097;

        leap = 1;
        if (g_day_no >= 36525) /* 36525 = 365*100 + 100/4 */ {
            g_day_no--;
            gy += 100 * div(g_day_no, 36524); /* 36524 = 365*100 + 100/4 - 100/100 */
            g_day_no = g_day_no % 36524;

            if (g_day_no >= 365)
                g_day_no++;
            else
                leap = 0;
        }

        gy += 4 * div(g_day_no, 1461); /* 1461 = 365*4 + 4/4 */
        g_day_no %= 1461;

        if (g_day_no >= 366) {
            leap = 0;

            g_day_no--;
            gy += div(g_day_no, 365);
            g_day_no = g_day_no % 365;
        }

        for (i = 0; g_day_no >= g_days_in_month[i] + (i == 1 && leap); i++)
            g_day_no -= g_days_in_month[i] + (i == 1 && leap);
        gm = i + 1;
        gd = g_day_no + 1;

        return new Array(gy, gm, gd);
    }

    return MyUtil;
});

app.service("dataservice", function ($http, $scope) {
    this.WriteError = function (error) {
        var def = $q.defer();
        $http.get('service/home/deviceinfo/getlist')
            .success(function (data) {

                if (data.errorCode != undefined && data.errorCode == 1) //SQLITE_BUSY: database is locked
                {
                    $scope.showErrorMessage = true;
                    $scope.ErrorMessage = "Database Busy Please Try Again...";
                } else if (data.errorCode != undefined && data.errorCode == 100) //any error
                {
                    $scope.showErrorMessage = true;
                    $scope.ErrorMessage = "Error Process";
                } else {

                    $scope.deviceinforecs = data;
                    $scope.showErrorMessage = false;


                }


            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }
})



app.factory('socket', function ($rootScope) {

    // var socket = io.connect("http://192.168.1.102:8082/FirstPage");
    //var socket = io(document.location.origin);
    var socket = io.connect("http://" + document.domain + ":551"); // hatman http bashad chon ba ssl moshkel dare.
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        },
        emitToGroup: function (group, eventName, data, callback) {
            socket.in(group).emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});

app.factory('PersianDateDTO', function (MyUtil) {

    var self = this;


    var PersianDateDTO = function (jsonDate) {

        //   Object.assign(self, {year: year, month: month, day: day});
        if (jsonDate != undefined) {
            validatePdate(self);
            if (jsonDate.year != undefined) this.year = jsonDate.year;
            if (jsonDate.month != undefined) this.month = jsonDate.month;
            if (jsonDate.day != undefined) this.day = jsonDate.day;
            if (jsonDate.hour != undefined) this.hour = jsonDate.hour;
            if (jsonDate.minute != undefined) this.minute = jsonDate.minute;
            if (jsonDate.second != undefined) this.second = jsonDate.second;
        }


        this.toGregorian = function () {


            return MyUtil.jalaliToGregorian([this.year, this.month, this.day]);
        };

        this.toJsDate = function () {
            var gDate = this.toGregorian();
            return new Date(gDate[0], gDate[1] - 1, gDate[2], this.hour, this.minute, this.second);
        };

        /* Based on the work of Reza Babakhani <babakahni.reza@gmail.com> */
        this.isLeapYear = function () {
            return ((((((this.year - ((this.year > 0) ? 474 : 473)) % 2820) + 474) + 38) * 682) % 2816) < 682;
        };

    }


    PersianDateDTO.prototype.fromJsDate = function (jsDate) {

        var self = this;
        var t = self.fromGregorian(jsDate.getFullYear(), jsDate.getMonth() + 1, jsDate.getDate(), jsDate.getHours(), jsDate.getMinutes(), jsDate.getSeconds());

        return t;
    }

    PersianDateDTO.prototype.fromGregorian = function (year, month, day, hour, minute, second) {


        var jdate = MyUtil.gregorianToJalali([year, month, day]);
        var t = new PersianDateDTO({
            year: jdate[0],
            month: jdate[1],
            day: jdate[2],
            hour: hour,
            minute: minute,
            second: second
        });
        return t;
    }
    PersianDateDTO.prototype.toString = function () {
        var self = this;
        var t = (self.year.padZero(4, '0') + "/" + self.month.padZero(2, '0') + "/" + self.day.padZero(2, '0') + " "
            + self.hour.padZero(2, '0') + ":" + self.minute.padZero(2, '0') + ":" + self.second.padZero(2, '0'));
        console.log(t);
        return t;
    }

    function validatePdate(pdate) {
        if (pdate.month <= 6 && pdate.day > 31) {
            throw new Error('invalid days for the months in the first half of the year');
        }

        if (pdate.month >= 7 && pdate.month <= 12 && pdate.day > 30) {
            throw new Error('invalid days for the months in the second half of the year');
        }

        if (pdate.month === 12 && !pdate.isLeapYear() && pdate.day > 29) {
            throw new Error('invalid days for the Esfand of a nonleap year');
        }
    }

    return PersianDateDTO;


});

app.factory('localstorage', ['$window', function ($window) {
    return {
        set: function (key, value) {
            $window.localStorage[key] = value;
        },
        get: function (key, defaultValue) {
            return $window.localStorage[key] || defaultValue || false;
        },
        setObject: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function (key, defaultValue) {
            if ($window.localStorage[key] != undefined) {
                return JSON.parse($window.localStorage[key]);
            } else {
                return defaultValue || false;
            }
        },
        remove: function (key) {
            $window.localStorage.removeItem(key);
        },
        clear: function () {
            $window.localStorage.clear();
        }
    }
}]);
app.service('PersianDateConvert', function (PersianDateDTO) {
    this.ToPersianDate = function (jsDate) {

        var persian_dto = new PersianDateDTO();
        var t = persian_dto.fromJsDate(jsDate);
        return t;
    }
});

app.service('AppLog', function ($log, $translate, MyUtil) {

    this.WriteError = function (error) {

        var f_explantion;
        var f_error_code;
        var f_http_status;
        var f_response;
        var f_message;
        var f_name;
        if (error.explanation != null) f_explantion = error.explanation;
        if (error.status != null) f_http_status = error.status;
        else ToHttpCodeToName = 500;
        if (error.response != null) f_response = error.response;
        if (error.name != null) f_name = error.name;
        if (error.message != null) f_message = error.message;
        if (error.code != null) f_error_code = error.code;

        var result = "_________________" + "\n\r";
        if (f_http_status != undefined)
            result += "http status code : " + f_http_status + " [" + MyUtil.ToHttpCodeToName(f_http_status) + "]\n\r";

        result += "error code : " + f_error_code + "\n\r";
        result += "name : " + f_name + "\n\r";
        result += "message : " + f_message + "\n\r";
        result += "explanation : " + f_explantion + "\n\r";
        result += "translate message: " + $translate.instant(f_name) + "\n\r";
        result += "response : " + JSON.stringify(f_response) + "\n\r";
        $log.info(result);


    }
    this.WriteInfo = function (error) {

        $log.info("for test ...");

    }
});
//**************************************
app.directive('datepickerPopup', function () {
    // in method baray dorost kardan formate control date picker besorate yyyy-mm-dd chizi ke to attribiute
    // khodesh tarif shode dorost mikonad
    return {
        restrict: 'EAC',
        require: 'ngModel',
        link: function (scope, element, attr, controller) {
            //remove the default formatter from the input directive to prevent conflict
            controller.$formatters.shift();
        }
    }
});
app.directive("serverMessage", function () {
    return {
        restrict: 'EA',
        scope: {
            bind: '=', //use 2-way binding instead.
            text: '@'
        },
        controller: function ($scope) {
            if (angular.isUndefined($scope.bind))
                $scope.bind = "values._has_error_service";

        },
        templateUrl: "/home/views/templates/SeverMessageTemplate.html"

    };
});
//---------------------------Define Buttons--------------------------
app.directive("btnSave", function () {
    return {
        restrict: 'EA',
        scope: {
            setclass: '@',
            isDisabled: '=', //use 2-way binding instead.
            btntype: '@'
        },
        controller: function ($scope) {
            if (angular.isUndefined($scope.btntype))
                $scope.btntype = "button";

        },
        templateUrl: "/home/views/templates/SaveButtonTemplate.html"

    };
});

app.directive("btnCancel", function () {
    return {
        restrict: 'EA',
        scope: {
            setclass: '@',
            isDisabled: '=', //use 2-way binding instead.
            btntype: '@'
        },
        controller: function ($scope) {
            if (angular.isUndefined($scope.btntype))
                $scope.btntype = "button";

        },
        templateUrl: "/home/views/templates/CancelButtonTemplate.html"

    };
});

app.directive("btnOk", function () {
    return {
        restrict: 'EA',
        scope: {
            setclass: '@',
            isDisabled: '=', //use 2-way binding instead.
            btntype: '@'
        },
        controller: function ($scope) {
            if (angular.isUndefined($scope.btntype))
                $scope.btntype = "button";

        },
        templateUrl: "/home/views/templates/OkButtonTemplate.html"

    };
});

app.directive("btnInsert", function (MyUtil) {
    return {
        restrict: 'EA',
        scope: {
            setclass: '@',
            isDisabled: '=',//use 2-way binding instead.
            btntype: '@'
        },
        controller: function ($scope, MyUtil, $rootScope) {

            $rootScope.$on('$translateChangeSuccess', function () {
                $scope.params = { x: MyUtil.isRTL() }
            });
            $rootScope.$on('$translateChangeStart', function () {
                $scope.params = { x: MyUtil.isRTL() }
            });
            $scope.params = { x: MyUtil.isRTL() }

            if (angular.isUndefined($scope.btntype))
                $scope.btntype = "button";

        },
        template: "<button type=\"{{btntype}}\"  class=\"btn btn-primary   {{setclass}}\" ng-disabled=\"isDisabled\" > <i class=\"glyphicon glyphicon-plus\"></i>  &nbsp&nbsp {{'Add_New_Title'|translate}} </button>"
        //templateUrl: "/home/views/templates/InsertButtonTemplate.html"

    };
});

app.directive("btnCheck", function () {
    return {
        restrict: 'EA',
        scope: {
            setclass: '@',
            isDisabled: '=',//use 2-way binding instead.
            btntype: '@'
        },
        controller: function ($scope) {
            if (angular.isUndefined($scope.btntype))
                $scope.btntype = "button";

        },
        template: "<button type=\"{{btntype}}\"  class=\"btn {{setclass}}\" ng-disabled=\"isDisabled\" > <i class=\"glyphicon glyphicon-check\"></i>  </button>"

    };
});
app.directive("btnList", function () {
    return {
        restrict: 'EA',
        scope: {
            setclass: '@',
            isDisabled: '=',//use 2-way binding instead.
            btntype: '@'
        },
        controller: function ($scope) {
            if (angular.isUndefined($scope.btntype))
                $scope.btntype = "button";

        },
        template: "<button type=\"{{btntype}}\"  class=\"btn {{setclass}}\" ng-disabled=\"isDisabled\" > <i class=\"glyphicon glyphicon-list-alt\"></i>  </button>"

    };
});
app.directive("btnLoad", function () {
    return {
        restrict: 'EA',
        scope: {
            setclass: '@',
            isDisabled: '=',//use 2-way binding instead.
            btntype: '@',

        },
        controller: function ($scope) {
            if (angular.isUndefined($scope.btntype))
                $scope.btntype = "button";

        },
        template: "<button type=\"{{btntype}}\"  class=\"btn btn-info   {{setclass}}\" ng-disabled=\"isDisabled\" > <i class=\"glyphicon glyphicon-refresh\"></i>  &nbsp&nbsp {{'Refresh'|translate}} </button>"

    };
});

app.directive("btnEdit", function () {
    return {
        restrict: 'EA',
        scope: {
            setclass: '@',
            isDisabled: '=',//use 2-way binding instead.
            onlyIcon: '=?',
            widthDefault: '@',
            btntype: '@'

        },
        controller: function ($scope) {
            if (angular.isUndefined($scope.onlyIcon))
                $scope.onlyIcon = false;


            if ($scope.onlyIcon == false && angular.isUndefined($scope.widthDefault))
                $scope.widthDefault = "width100";

            if (angular.isUndefined($scope.btnType))
                $scope.btnType = "button";

        },

        templateUrl: "/home/views/templates/EditButtonTemplate.html"

    };
});

app.directive("btnRemove", function () {
    return {
        restrict: 'EA',
        scope: {
            setclass: '@',
            isDisabled: '=',//use 2-way binding instead.
            onlyIcon: '=?',
            widthDefault: '@',
            btntype: '@'

        },
        controller: function ($scope) {
            if (angular.isUndefined($scope.onlyIcon))
                $scope.onlyIcon = false;


            if ($scope.onlyIcon == false && angular.isUndefined($scope.widthDefault))
                $scope.widthDefault = "width100";

            if (angular.isUndefined($scope.btnType))
                $scope.btnType = "button";

        },

        templateUrl: "/home/views/templates/DeleteButtonTemplate.html"

    };
});


app.directive("btnClose", function () {
    return {
        restrict: 'EA',
        scope: {
            setclass: '@',
            isDisabled: '=',//use 2-way binding instead.
            onlyIcon: '=?',
            widthDefault: '@',
            btntype: '@'

        },
        controller: function ($scope) {
            if (angular.isUndefined($scope.onlyIcon))
                $scope.onlyIcon = false;


            if ($scope.onlyIcon == false && angular.isUndefined($scope.widthDefault))
                $scope.widthDefault = "width100";

            if (angular.isUndefined($scope.btnType))
                $scope.btnType = "button";

        },

        templateUrl: "/home/views/templates/CloseButtonTemplate.html"

    };
});
//https://umur.blog/2013/07/02/angularjs-directives-using-isolated-scope-with-attributes/
app.directive("monitorTempHum", function (socket, MyUtil, userData) {
    return {
        restrict: 'A',
        scope: {
            xsensor_title: "@title",
            xsensor_code: "@code",
            xsensor_serial: "@serial",
            xsersor_type: "@sensorType",
            x_on_delete_Fn: "&onDeleteFn",
            x_on_sensor_selected_fn: "&onSensorSelectedFn",
            x_is_show: "=isShow",
            x_is_selected: "=isSelected"
        },
        controller: function ($scope, $timeout, MyUtil, $interval, AppLog, userData, data_api, $element) {


            $scope.params = {
                sensor_code: parseInt($scope.xsensor_code),
                sensor_title: $scope.xsensor_title,
                sensor_serial: parseInt($scope.xsensor_serial),
                sensor_type: $scope.xsersor_type,
                sensor_value: null,
                sensor_time_last_receive_str: "NAN",
                sensor_time_last_receive: 0,
                is_switch_to_chart: false,



            }


            $scope.chartConfig = {

                options: {

                    chart: {
                        type: 'areaspline'
                    },
                    tooltip: {
                        style: {
                            padding: 10,
                            fontWeight: 'bold'
                        }
                    }
                },

                series: [{
                    showInLegend: false,
                    data: [7, 2, 1, 0, 22, 00, 50, 30, 20, 10, 5, 0, 10, 15, 12, 8, 7, 2, 1, 0, 22, 100, 50, 30, 20, 10, 5, 0]
                }],

                title: {
                    text: null
                },
                useHighStocks: false,


                xAxis: {
                    currentMin: 0,
                    currentMax: 50,
                    title: { text: null },
                    labels: {
                        enabled: false
                    }
                },


                yAxis: {
                    title: {
                        text: null
                    },
                    labels: {
                        enabled: true
                    }
                },

                legend: {
                    enabled: false
                },

                size: {
                    // width: document.getElementById($element[0]).width,
                    // height: document.getElementById($element[0]).height
                    // height: $element[0].clientHeight + 100,
                    // width: $element[0].clientWidth - 30

                },
                //function (optional)
                func: function (chart) {

                },


            };
            var ArrayTempValues = [];
            var ArrayHumValues = [];
            var cb_arrive_data = function (data) {

                $scope._Records = data;

                var ArrayValues = [];

                $scope.labels = [];
                $scope.data = [];

                angular.forEach($scope._Records, function (item) {
                    if ($scope.params.sensor_type === "hum") {
                        if (item.value2 != null)
                            ArrayValues.push(item.value2)
                    }
                    else {
                        if (item.value1 != null)
                            ArrayValues.push(item.value1)
                    }


                })
                $scope.chartConfig.series[0].data = ArrayValues;
            }
            data_api.getTempLogs_by_code($scope.params.sensor_code, 100, 1).then(cb_arrive_data, reason => {
                AppLog.WriteError(reason);
            });

            var code_sensor_code = userData.mapSensorTypeByName($scope.xsersor_type).code;


            //  $scope.params.sensor_value=0;




            // $scope.close_panel = function () {
            //      $scope.x_is_show = false;
            // }

            $scope.refresh_value = function () {

                if ($scope.params.sensor_time_last_receive == 0) return;


                var diff = MyUtil.getSeconds($scope.params.sensor_time_last_receive, MyUtil.unixTime_now());

                $scope.params.sensor_time_last_receive_str = MyUtil.secondsToString(diff);


            }
            $scope.on_switch = function () {
                $scope.params.is_switch_to_chart = !$scope.params.is_switch_to_chart;

                if ($scope.params.is_switch_to_chart === true) {
                    data_api.getTempLogs_by_code($scope.params.sensor_code, 100, 1).then(cb_arrive_data, reason => {
                        AppLog.WriteError(reason);
                    });
                }
            }
            $interval(function () {
                $scope.refresh_value();
            }, 1000 * 30);


            socket.on('sensor_cmd_any_data', function (msg) {
                if ($scope.params.sensor_serial == msg.sensor_cmd_any_data.sensor_serial && msg.sensor_cmd_any_data.sensor_type & userData.get_enum_sensor().TEM_HUM) {
                    if ($scope.params.sensor_type === "temp") {
                        $scope.params.sensor_value = parseFloat(parseFloat(msg.sensor_cmd_any_data.sensor_value1).toFixed(2));
                    } else if ($scope.params.sensor_type === "hum") {
                        $scope.params.sensor_value = parseInt(msg.sensor_cmd_any_data.sensor_value2);
                    }

                    $scope.params.sensor_time_last_receive = msg.sensor_cmd_any_data.time_receive;
                    $scope.refresh_value();
                }


            });
        },

        templateUrl: "/home/views/templates/sensorTempHumTemplate.html"



    };
});

app.directive("monitorLux", function (socket, MyUtil, userData) {
    return {
        restrict: 'A',
        scope: {
            xsensor_title: "@title",
            xsensor_code: "@code",
            xsensor_serial: "@serial",
            xsersor_type: "@sensorType",
            x_on_delete_Fn: "&onDeleteFn",
            x_on_sensor_selected_fn: "&onSensorSelectedFn",
            x_is_show: "=isShow",
            x_is_selected: "=isSelected"
        },
        controller: function ($scope, $timeout, MyUtil, $interval, AppLog, userData, data_api, $element) {


            $scope.params = {
                sensor_code: parseInt($scope.xsensor_code),
                sensor_title: $scope.xsensor_title,
                sensor_serial: parseInt($scope.xsensor_serial),
                sensor_type: $scope.xsersor_type,
                sensor_value: null,
                sensor_time_last_receive_str: "NAN",
                sensor_time_last_receive: 0,
                is_switch_to_chart: false,
            }


            $scope.chartConfig = {

                options: {

                    chart: {
                        type: 'areaspline'
                    },
                    tooltip: {
                        style: {
                            padding: 10,
                            fontWeight: 'bold'
                        }
                    }
                },

                series: [{
                    showInLegend: false,
                    data: [7, 2, 1, 0, 22, 00, 50, 30, 20, 10, 5, 0, 10, 15, 12, 8, 7, 2, 1, 0, 22, 100, 50, 30, 20, 10, 5, 0]
                }],

                title: {
                    text: null
                },
                useHighStocks: false,


                xAxis: {
                    currentMin: 0,
                    currentMax: 50,
                    title: { text: null },
                    labels: {
                        enabled: false
                    }
                },


                yAxis: {
                    title: {
                        text: null
                    },
                    labels: {
                        enabled: true
                    }
                },

                legend: {
                    enabled: false
                },

                size: {
                    // width: document.getElementById($element[0]).width,
                    // height: document.getElementById($element[0]).height
                    // height: $element[0].clientHeight + 100,
                    // width: $element[0].clientWidth - 30

                },
                //function (optional)
                func: function (chart) {

                },


            };
            var ArrayTempValues = [];
            var ArrayHumValues = [];
            var cb_arrive_data = function (data) {

                $scope._Records = data;

                var ArrayValues = [];

                $scope.labels = [];
                $scope.data = [];

                angular.forEach($scope._Records, function (item) {

                    if (item.value5 != null)
                        ArrayValues.push(item.value5)



                })
                $scope.chartConfig.series[0].data = ArrayValues;
            }
            data_api.getTempLogs_by_code($scope.params.sensor_code, 100, 1).then(cb_arrive_data, reason => {
                AppLog.WriteError(reason);
            });

            var code_sensor_code = userData.mapSensorTypeByName($scope.xsersor_type).code;


            //  $scope.params.sensor_value=0;




            // $scope.close_panel = function () {
            //      $scope.x_is_show = false;
            // }

            $scope.refresh_value = function () {

                if ($scope.params.sensor_time_last_receive == 0) return;


                var diff = MyUtil.getSeconds($scope.params.sensor_time_last_receive, MyUtil.unixTime_now());

                $scope.params.sensor_time_last_receive_str = MyUtil.secondsToString(diff);


            }
            $scope.on_switch = function () {
                $scope.params.is_switch_to_chart = !$scope.params.is_switch_to_chart;

                if ($scope.params.is_switch_to_chart === true) {
                    data_api.getTempLogs_by_code($scope.params.sensor_code, 100, 1).then(cb_arrive_data, reason => {
                        AppLog.WriteError(reason);
                    });
                }
            }
            $interval(function () {
                $scope.refresh_value();
            }, 1000 * 30);


            socket.on('sensor_cmd_any_data', function (msg) {
                if ($scope.params.sensor_serial == msg.sensor_cmd_any_data.sensor_serial && msg.sensor_cmd_any_data.sensor_type & userData.get_enum_sensor().LUX) {

                    $scope.params.sensor_value = parseInt(msg.sensor_cmd_any_data.sensor_value5);

                    $scope.params.sensor_time_last_receive = msg.sensor_cmd_any_data.time_receive;
                    $scope.refresh_value();
                }


            });
        },

        templateUrl: "/home/views/templates/SensorLuxTemplate.html"



    };
});

app.directive("monitorCo2", function (socket, MyUtil, userData) {
    return {
        restrict: 'A',
        scope: {
            xsensor_title: "@title",
            xsensor_code: "@code",
            xsensor_serial: "@serial",
            xsersor_type: "@sensorType",
            x_on_delete_Fn: "&onDeleteFn",
            x_on_sensor_selected_fn: "&onSensorSelectedFn",
            x_is_show: "=isShow",
            x_is_selected: "=isSelected"
        },
        controller: function ($scope, $timeout, MyUtil, $interval, AppLog, userData, data_api, $element) {


            $scope.params = {
                sensor_code: parseInt($scope.xsensor_code),
                sensor_title: $scope.xsensor_title,
                sensor_serial: parseInt($scope.xsensor_serial),
                sensor_type: $scope.xsersor_type,
                sensor_value: null,
                sensor_time_last_receive_str: "NAN",
                sensor_time_last_receive: 0,
                is_switch_to_chart: false,
            }


            $scope.chartConfig = {

                options: {

                    chart: {
                        type: 'areaspline'
                    },
                    tooltip: {
                        style: {
                            padding: 10,
                            fontWeight: 'bold'
                        }
                    }
                },

                series: [{
                    showInLegend: false,
                    data: [7, 2, 1, 0, 22, 00, 50, 30, 20, 10, 5, 0, 10, 15, 12, 8, 7, 2, 1, 0, 22, 100, 50, 30, 20, 10, 5, 0]
                }],

                title: {
                    text: null
                },
                useHighStocks: false,


                xAxis: {
                    currentMin: 0,
                    currentMax: 50,
                    title: { text: null },
                    labels: {
                        enabled: false
                    }
                },


                yAxis: {
                    title: {
                        text: null
                    },
                    labels: {
                        enabled: true
                    }
                },

                legend: {
                    enabled: false
                },

                size: {
                    // width: document.getElementById($element[0]).width,
                    // height: document.getElementById($element[0]).height
                    // height: $element[0].clientHeight + 100,
                    // width: $element[0].clientWidth - 30

                },
                //function (optional)
                func: function (chart) {

                },


            };
            var ArrayTempValues = [];
            var ArrayHumValues = [];
            var cb_arrive_data = function (data) {

                $scope._Records = data;

                var ArrayValues = [];

                $scope.labels = [];
                $scope.data = [];

                angular.forEach($scope._Records, function (item) {

                    if (item.value6 != null)
                        ArrayValues.push(item.value6)



                })
                $scope.chartConfig.series[0].data = ArrayValues;
            }
            data_api.getTempLogs_by_code($scope.params.sensor_code, 100, 1).then(cb_arrive_data, reason => {
                AppLog.WriteError(reason);
            });

            var code_sensor_code = userData.mapSensorTypeByName($scope.xsersor_type).code;


            //  $scope.params.sensor_value=0;




            // $scope.close_panel = function () {
            //      $scope.x_is_show = false;
            // }

            $scope.refresh_value = function () {

                if ($scope.params.sensor_time_last_receive == 0) return;


                var diff = MyUtil.getSeconds($scope.params.sensor_time_last_receive, MyUtil.unixTime_now());

                $scope.params.sensor_time_last_receive_str = MyUtil.secondsToString(diff);


            }
            $scope.on_switch = function () {
                $scope.params.is_switch_to_chart = !$scope.params.is_switch_to_chart;

                if ($scope.params.is_switch_to_chart === true) {
                    data_api.getTempLogs_by_code($scope.params.sensor_code, 100, 1).then(cb_arrive_data, reason => {
                        AppLog.WriteError(reason);
                    });
                }
            }
            $interval(function () {
                $scope.refresh_value();
            }, 1000 * 30);


            socket.on('sensor_cmd_any_data', function (msg) {
                if ($scope.params.sensor_serial == msg.sensor_cmd_any_data.sensor_serial && msg.sensor_cmd_any_data.sensor_type & userData.get_enum_sensor().CO2) {

                    $scope.params.sensor_value = parseFloat(parseFloat(msg.sensor_cmd_any_data.sensor_value6).toFixed(2));

                    $scope.params.sensor_time_last_receive = msg.sensor_cmd_any_data.time_receive;
                    $scope.refresh_value();
                }


            });
        },

        templateUrl: "/home/views/templates/SensorCO2Template.html"



    };
});
app.directive("pageHeader", function () {
    return {
        restrict: 'A',
        scope: {
            xheadename: '@headerName',
            xicon: '@icon'
        },
        controller: function ($scope, MyUtil, $rootScope, $timeout) {
            $rootScope.$on('$translateChangeSuccess', function () {
                $scope.params = { x: MyUtil.isRTL() }
            });
            $rootScope.$on('$translateChangeStart', function () {
                $scope.params = { x: MyUtil.isRTL() }
            });
            $scope.params = { x: MyUtil.isRTL() }


        },


        template: "<div class=\"modal-header\" style=\" padding-bottom: 1px;padding-top: 0px;\"  dir=\"{{params.x?'rtl':'ltr'}} \" >  <h3 class=\"modal-title\"><i class=\"{{params.x?'pull-right':'pull-left'}}  {{xicon }}\"> </i>&nbsp; {{ xheadename | translate  }} </h3></div>"

    };
});


//----------------------- Global Persian Picker-----------------------

app.directive("globalDatePicker", function () {
    return {
        restrict: 'EA',
        scope: {
            fullData: '=?',
            selectedJsDate: '=?',
            myOptions: "=?",
            isShamsi: "=?",
            dateTimeFormat: "@",
            defaultTime: "=?",
            linkDateObj: "=?",
            onChange: "&"


        },

        templateUrl: "/home/views/templates/GlobalDatePickerTemplate.html",

        link: function (scope) {


            /*  scope.myWatchOnAnyChange = function (date) {

             scope.gDateLocal = date.gDate;
             //  console.log("U::>>"+ JSON.stringify( scope.fullData.gDate))
             };*/
            /*    scope.setDefualt(date)
             {
             defualt=date;
             }*/


        },
        controller: function ($scope, $filter, PersianDateConvert) {

            var tempoption = { calType: "jalali", format: "YYYY/MM/DD hh:mm", default: undefined };

            //   var tempoption = {calType: "gregorian", format: "YYYY/MM/DD  hh:mm"};

            $scope.OnAnyChange = function (date) {

                $scope.selectedJsDate = date.gDate;
                //  console.log("from directive : " + $filter('date')(new Date($scope.selectedJsDate), 'yyyy/MM/dd hh:mm:ss'))
                setTimeout(function () {
                    $scope.onChange();
                }, 1200)

            };


            if ($scope.isShamsi != undefined && $scope.isShamsi == true) {
                tempoption.calType = "jalali";
                //این فیلد linkDataObj می تواند هم تاریخ فارسی باشد هم میلادی برای این پروژه من فارسی را هندل کردم
                $scope.linkDateObj = PersianDateConvert.ToPersianDate(new Date($scope.selectedJsDate)).toString();
            }
            else {
                tempoption.calType = "gregorian";
                //این فیلد linkDataObj می تواند هم تاریخ فارسی باشد هم میلادی برای این پروژه من فارسی را هندل کردم
                //تغییر کلندر اشکال دارد باید صبر کرد تا نسخه جدید داده شود
                $scope.linkDateObj = $filter('date')(new Date($scope.selectedJsDate), 'yyyy/MM/dd hh:mm:ss');
            }


            if ($scope.selectedJsDate != undefined)
                tempoption.default = (new Date($scope.selectedJsDate)).getTime();


            if ($scope.dateTimeFormat == undefined)
                tempoption.format = "YYYY/MM/DD";
            else tempoption.format = $scope.dateTimeFormat;

            $scope.myOptions = tempoption;


        }
    };
});

//---------------------- Translator Message --------------------------
/*
 app.directive("translate-Error", function () {
 return {
 restrict: 'EA',
 scope: {
 keyString: '@',
 isDisabled: '=' //use 2-way binding instead.

 },
 template: "<span ng-disabled=\"isDisabled\" style='background: #8b0000'>{{keyString|translate}}</span>"

 };
 });*/
app.directive("gaugeGlobal", function () {
    return {
        restrict: 'E',
        scope: {
            gaugeId: "@",
            gaugeValue: '=?',
            minValue: "=?",
            maxValue: "=?",
            hasShowLabel: "=?",
            title: "@",
            symbolLabel: "@"
        },

        templateUrl: "/home/views/templates/Gauge_Temp_Template.html",
        controller: function ($scope) {

            // $scope.hasShowLabel = false;
            $scope.TempGauge = {
                options: {
                    chart: {
                        type: 'solidgauge',
                    },

                    title: null,
                    pane: {
                        size: '80%',
                        startAngle: -180,
                        endAngle: 90,
                        background: {
                            backgroundColor: '#EEE',
                            innerRadius: '95%',
                            outerRadius: '100%',
                            shape: 'arc'
                        }
                    },
                    tooltip: {
                        enabled: false
                    },

                    // the value axis
                    yAxis: {
                        stops: [
                            [0, '#000088'],
                            [29 / 90, '#000088'],
                            [30 / 90, '#5555ff'],
                            [41 / 90, '#5555ff'],
                            [42 / 90, '#00ff00'],
                            [54 / 90, '#00ff00'],
                            [55 / 90, '#ff8c00'],
                            [59 / 90, '#ff8c00'],
                            [60 / 90, '#ff0000']
                        ],
                        lineWidth: 0,
                        minorTickInterval: 0,
                        tickPixelInterval: 50,
                        tickWidth: 1,

                        labels: {
                            enabled: Boolean($scope.hasShowLabel),
                            distance: 10
                        }
                    },
                    plotOptions: {
                        solidgauge: {
                            innerRadius: '95%',
                            dataLabels: {
                                y: -20,
                                borderWidth: 0,
                                useHTML: true
                            }
                        }
                    },

                },
                yAxis: {
                    min: $scope.minValue,
                    max: $scope.maxValue,
                    /*  tickInterval:5,
                     startOnTick:true,*/
                },
                credits: {
                    enabled: false
                },
                series: [],

            };

            $scope.$watch('gaugeValue', function (value) {


                var arraytemp = [];
                arraytemp.push(parseFloat(value));

                /* var rnd = []
                 for (var i = 0; i < 1; i++) {
                 rnd.push(Math.floor(Math.random() * 20) + 1)
                 }*/
                // $scope.TempGauge.series[0].data = arraytemp;
                if ($scope.TempGauge.series.length == 0) {
                    $scope.TempGauge.series = [{
                        name: 'inTemp',
                        data: arraytemp, /////// Temp Value //////////
                        dataLabels: {
                            format: '<div style="text-align:center;font-family: Tahoma;"><h5><strong  >{y}&nbsp;' + $scope.symbolLabel + '</strong><br>' + $scope.title + '</h5></div>'
                        }
                    }]
                } else {
                    var t = '#' + $scope.gaugeId;
                    var point = $(t).highcharts().series[0].points[0];
                    point.update(value);


                }
                // symbol for Temp °C

            });


        }
    };
});


//---------------------- Icon s --------------------------
app.directive("logoImage", function () {
    return {
        restrict: 'EA',
        scope: {
            sizeLogo: '@',
            selectedLogo: '@',
            styleBind: '@',


        },
        controller: function ($scope) {

            if (angular.isUndefined($scope.sizeLogo)) {
                $scope.selectedLogo = "/public/home/res/files/nav_img_48.png";
            }
            var sizevalue = parseInt($scope.sizeLogo);
            if (sizevalue == 48) {
                $scope.selectedLogo = "/public/home/res/files/nav_img_48.png";
            }


        },

        template: "<img src=\"{{selectedLogo}}\" class=\"img-responsive\"style='{{styleBind}}' />"

    };
});


app.directive("iconCheck", function () {
    return {
        restrict: 'EA',
        scope: {
            stateValue: '=?',
            iconSelectedName: '@',
            iconSelectedColor: '@',
            iconTrue: '@',
            iconFalse: '@',
            iconTrueColor: '@',
            iconFalseColor: '@',

        },
        controller: function ($scope) {
            // اگر ایکن خالی می خوای ست شود اسم اشتباه ست کن در falsو true
            if (angular.isUndefined($scope.iconTrue)) {
                $scope.iconTrue = "glyphicon glyphicon-ok";
            }

            if (angular.isUndefined($scope.iconFalse)) {
                $scope.iconFalse = "glyphicon glyphicon-remove";
            }

            if (angular.isUndefined($scope.iconTrueColor)) {
                $scope.iconTrueColor = "darkgreen";
            }

            if (angular.isUndefined($scope.iconFalseColor)) {
                $scope.iconFalseColor = "darkgreen";
            }

            if (angular.isUndefined($scope.stateValue)) {
                $scope.iconSelectedName = "";
            } else if ($scope.stateValue == true) {
                $scope.iconSelectedName = $scope.iconTrue
                $scope.iconSelectedColor = $scope.iconTrueColor;
            } else {
                $scope.iconSelectedName = $scope.iconFalse;
                $scope.iconSelectedColor = $scope.iconFalseColor;
            }

        },

        template: "<span class=\"{{iconSelectedName}}\" aria-hidden=\"true\"  style=\"color:{{iconSelectedColor}};\"></span>"

    };
});



app.factory('global_alert', function ($rootScope) {

    var global_alert = {};

    $rootScope.alerts = [];
    $rootScope.closeAlert = function (index) {

        $rootScope.alerts.splice(index, 1);
    };
    // will automatidally close
    // types are success, warning, info, danger
    global_alert.success = function (msg, xdelay) {
        // if (!xdelay) {
        //     xdelay = 2500; // default delay is 2500ms
        // }

        var alert = { 'type': 'success', 'msg': msg, 'delay': xdelay };
        $rootScope.alerts.push(alert);


    }
    global_alert.info = function (msg, xdelay) {
        var alert = { 'type': 'info', 'msg': msg, 'delay': xdelay };
        $rootScope.alerts.push(alert);
    }
    global_alert.warning = function (msg, xdelay) {
        var alert = { 'type': 'warning', 'msg': msg, 'delay': xdelay };
        $rootScope.alerts.push(alert);
    }
    global_alert.danger = function (msg, xdelay) {
        var alert = { 'type': 'danger', 'msg': msg, 'delay': xdelay };
        $rootScope.alerts.push(alert);
    }


    return global_alert;
}

);
app.directive('globalAlert', function () {
    return {
        template: '<div id="alertRow" class="row  top-buffer">' +
            '<div uib-alert ng-repeat="alert in alerts" ng-class="\'alert-\' + (alert.type || \'warning\')"' +
            'dismiss-on-timeout="{{alert.delay}}" close="closeAlert($index)">{{alert.msg}}' +
            ' </div></div>'
    }
});

/////////////---
app.run(function ($rootScope, MyUtil) {
    //make the service available     
    $rootScope.MyUtil = MyUtil;

})