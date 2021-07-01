'use strict';

app.config(function ($translateProvider) {
    $translateProvider.translations('en', {
        latest:'latest',
        minutes:'minutes',
        hours:'hours',
        days:'days',
        Languages: 'Languages',
        Network: "Network",
        Date_Time: "Date Time",
        Reboot: "Reboot",
        Settings: "Settings",
        Today: "Today",
        Between: "Between",
        Duration_Dates: "Duration Dates",
        Last_Logs: "Last Logs",
        Current_Sensor_Code: "Sensor Code",
        SensorCode: "Sensor Code",
        SensorSerial: "Serial",
        Information: 'Information',
        Last_Status: "Last Status",
        End_Datetime: "End Date Time ",
        Start_Datetime: "Start Date Time ",
        Select: "Select",
        Cancel: "Cancel",
        Date_Title: "Date",
        Save_Title: "Save",
        Manually: "Manually",
        Daily: "Daily",
        Edit: "Edit",
        Insert_Title: "Insert",
        Add_New_Title: "Add",
        Device_Code: "Device Code",
        Sensor_Type: "Sensor Type ",
        Sensitive_sensor: "Sensitive sensor",
        Search_for_Device_Code: "Search for Device Code",
        Disable: "Disable",
        Enable: "Enable",
        Stop: "Stop", Start: "Start",
        SMS_Alert: "SMS Alert",
        numberOfRecords: "Number Of Records: {{NumberOfLoadRecrds}}",
        LimitOfLoadRecord: "Limit",
        Sensor_List: "Sensor List",
        Description: "Description",
        Title: "Title",
        Current_DateTime: "Current DateTime",
        Show_Title: "Show",
        Set_DateTime: "Set DateTime ",
        SettingPage_ResetMessage: "Click this button to reboot the device.",
        Reset: "Reset",
        Change_Language: "Change Language",
        sensors_report_chart: 'Report Chart',
        task_for_sensors: "Task For Sensors",
        task_for_sensors_Title_page: "Task for sensors",
        task_daily_time_for_device_Title_Nav: "Task Daily",
        task_daily_time_for_device_Title_Page: "Task daily for Device",
        Yes: "Yes",
        Delete_Confirm_Message: " Are you sure you want to delete?",
        Delete: "Delete",
        Delete_Title_Page: "Delete",
        Is_Task_Active: "is task active",
        Minutes: "Minutes",
        Close: "Close",
        Login: "Login",
        Login_To_System: "ورود به سیستم ",
        Logout: "Logout",
        Remember_Me: "Remember me",
        User_Name: "User Name",
        Is_Device_Enable: "Device Status",
        Power: "Power",
        Refresh: "Refresh",
        Device_Name: "Device Name",
        sensor_code:"Sensor Code",
        Schedule_mode_name: "Schedule mode",
        Device_Enable: "Device enable",
        Reset_Times: "ّReset Times",
        On: "On",
        Off: "Off",
        Wifi_Name: "Wifi Name (SSID)",
        Password: "Password",
        Net_List: "Net List",
        Sensors: "Sensors",
        Sensor_infos_Title_page: "Sensors",
        Serial: "Serial",
        Temperature: "Temperature",
        Humidity: "Humidity",
        Temp: "Temp",
        Hum: "Hum",
        Sensor: "Sensor",
        EC: "EC",
        PH: "PH",
        sensors_monitoring:"monitoring",
        sensors_monitoring:"monitoring",
        Base_Info: "Base info",
        Green_House: "Green house",
        Green_House_Title_Page: "Green house",
        Green_House_Code: "Code",
        Search_for_SenSor_Code: "Sensor code",
        Search_for_green_house_Code: "Green House Code",
        has_been_changed_successfully: "has been changed successfully",
        Manually_on_off_with_Duration_Time_minute: " Manually on-off with Duration Time (minute)",
        reboot_successful: "Reboot Successful",
        Error_2000_Done: "Done",
        Error_2001_Failed: "Failed",
        Error_2002_Not_ّFound: "Not Found",
        Error_2003_Service_MSG_General_unknown_Error: "Service MSG General unknown Error",
        Error_2004_Message_Duration_is_required: "Duration is required.",
        Error_2005_End_time_must_be_bigger_then_Start_time: "End-time must be bigger then Start-time.",
        Error_2006_Required: "Required",
        Error_2007_No_Valid_IP: "no valid ip   [xxx.xxx.xxx.xxx]",
        Error_2008_No_Valid: "no valid",
        Error_2009_Password_is_too_short: "Password is too short.",
        Error_2010_Password_is_too_long: "Password is too long.",
        Error_2011_Conflicts_With_Other_Records: "conflicts with other records",
        Error_2012_Min_Value: "must be over {{num}} ",
        Error_2013_Max_Value: "must not exceed {{num}} ",
        Error_2014_Min_Length_String: "must be over {{num}} characters",
        Error_2015_Max_Length_String: "must not exceed {{num}}  characters",
        Error_2015_SqlBusy: "SQL BUSY",

        200: "Sensor Code must be unique",
        201: "Sensor Serial must be unique",
        202: "The record cannot be deleted"

    });
    $translateProvider.translations('fa', {
        latest:'گذشته',
        minutes:'دقیقه',
        hours:'ساعت',
        days:'روز',
        Languages: 'زبان',
        Network: 'شبکه',
        Date_Time: "تاریخ و ساعت",
        Reboot: "راه اندازی دوباره",
        Settings: "پیکربندی",
        Today: "امروز",
        Between: 'بین تاریخ',
        Duration_Dates: "بازه زمانی",
        Last_Logs: "آخرین رکورد",
        Current_Sensor_Code: "کد سنسور",
        Information: 'اطلاعات',
        Last_Status: "آخرین وضعیت",
        End_Datetime: "زمان پایان ",
        Start_Datetime: "زمان شروع ",
        Select: "انتخاب",
        Cancel: "لغو",
        Date_Title: "تاریخ",
        Save_Title: "ثبت",
        sensor_code:"کد سنسور",
        Edit: "ویرایش",
        Insert_Title: "اضافه",
        Add_New_Title: "اضافه",
        sensors_monitoring:"مانیتورینگ",
        Device_Code: "کد دستگاه",
        Sensor_Type: "نوع سنسور",
        Sensitive_sensor: "حساس به سنسور",
        Search_for_Device_Code: "جستجو کد دستگاه",
        Disable: "غیر فعال",
        Enable: "فعال",
        Stop: "متوقف", Start: "در حال کار",
        SMS_Alert: "هشدار پیامکی",
        numberOfRecords: "تعداد رکورد ها:{{NumberOfLoadRecrds}}",
        LimitOfLoadRecord: "رکورد مجاز",
        Sensor_List: "لیست سنسورها",
        Description: "توضیحات",
        Title: "عنوان",
        Current_DateTime: "زمان جاری سیستم",
        Show_Title: "نمایش",
        Set_DateTime: "ثبت زمان جدید",
        SettingPage_ResetMessage: "برای راه اندازی مجدد کلید را فشار دهید.",
        Reset: "راه اندازی",
        Change_Language: "تغییر زبان",
        sensors_report_chart: 'گزارش نموداری',
        task_for_sensors: "کار سنسور",
        task_for_sensors_Title_page: "تعریف کار برای سنسور",
        task_daily_time_for_device_Title_Nav: "کار روزانه ",
        task_daily_time_for_device_Title_Page: "تعریف کار روزانه برای دستگاه",
        Manually_on_off_with_Duration_Time_minute: " خاموش و روشن کردن دستی در بازه زمانی به دقیقه",
        Yes: "خب",
        Delete_Confirm_Message: "آیا شما مطمئن هستید ؟",
        Delete: "حذف",
        Delete_Title_Page: "حذف",
        Is_Task_Active: "در حال کار",
        Minutes: "دقیقه",
        Manually: "دستی",
        Daily: "روزانه",
        Is_Device_Enable: " وضعیت",
        Device_Enable: "فعال باشد",
        Power: "تغذیه",
        Refresh: "بازیابی",
        Device_Name: "نام دستگاه",
        Schedule_mode_name: "مد زمانبند",
        Reset_Times: "صفر کردن زمان ها",
        On: "روشن",
        Off: "خاموش",
        Wifi_Name: "نام وای فای",
        Password: "رمز",
        Sensors: "سنسورها",
        Sensor_infos_Title_page: "سنسورها",
        Serial: "سریال",
        Sensor: "سنسور",
        Temperature: "دما",
        Humidity: "رطوبت",
        Temp: "دما",
        Hum: "رطوبت",
        EC: "EC",
        PH: "PH",
        Search_for_SenSor_Code: "کد سنسور",
        Search_for_green_house_Code: "کد گلخانه",
        SensorCode: "کد سنسور",
        SensorSerial: "سریال",
        has_been_changed_successfully: "با موفقیت ثبت شد",
        reboot_successful: "رست سیستم با موفقیت انجام شد",
        Net_List: "Net لیست",
        Close: "ّبستن",
        Login_To_System: "ورود به سیستم ",
        Login: "ورود",
        Logout: "خروج",
        Base_Info: "اطلاعات پایه",
        Green_House: "گلخانه",
        Green_House_Title_Page: "تعریف گلخانه",
        Green_House_Code: "کد گلخانه",
        User_Name: "نام کاربری",
        Remember_Me: "مرا به خاطر بسپار",
        Error_2000_Done: "Done",
        Error_2001_Failed: "نا موفق",
        Error_2002_Not_ّFound: "پیدا نشد",
        Error_2003_Service_MSG_General_unknown_Error: "Service MSG General unknown Error",
        Error_2004_Message_Duration_is_required: "بازه زمانی را وارد نمایید",
        Error_2005_End_time_must_be_bigger_then_Start_time: "تاریخ پایان باید از تاریخ شروع بزرگتر باشد",
        Error_2006_Required: "مقدار را وارد نمایید",
        Error_2007_No_Valid_IP: "مقدار IP معتبر نیست  [xxx.xxx.xxx.xxx] ",
        Error_2008_No_Valid: "مقدار وارد شده معتبر نیست   ",
        Error_2009_Password_is_too_short: "رمز کوتاه است",
        Error_2010_Password_is_too_long: "رمز بلند است",
        Error_2011_Conflicts_With_Other_Records: "تداخل با دیگر رکوردها",
        Error_2012_Min_Value: "مقدار وارد شده باید بزرگتر از {{num}}  باشد",
        Error_2013_Max_Value: "مقدار وارد شده باید کوچکتر از {{num}}  باشد",
        Error_2014_Min_Length_String: "مقدار وارد شده باید بزرگتر از {{num}} کارکتر باشد",
        Error_2015_Max_Length_String: "مقدار وارد شده باید کوچکتر از {{num}} کارکتر باشد",
        Error_2015_SqlBusy: "SQL BUSY",
        200: "کد سنسور قبلا ثبت شده لطفا کد دیگری انتخاب کنید",
        201: "ُسریال سنسور قبلا ثبت شده لطفا سریال دیگری انتخاب کنید",
        202: "این رکورد را نمی شود حذف کرد"




    });
    $translateProvider.preferredLanguage('fa');
    $translateProvider.useSanitizeValueStrategy('escape');


});