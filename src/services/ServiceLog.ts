import { SP } from "../SP";
import * as api from "../common/api";
var log4js = require('log4js'); // include log4js

const fs = require('fs');
export class ServiceLog {

    public static logger_info: any;
    public static logger_error: any;


    constructor() {
    }
    public async init() {
        var logDir = "";
        switch (SP._CurrentOS) {
            case api.XGlobal.En_OS.Windows: {
                var logDir = "./loggs/"
                break;
            }
            case api.XGlobal.En_OS.Linux:
                {
                    var logDir=SP.getObj().getSRVConfigFile.FolderRoot+"/logs/";
                    break;
                }
        }
        // Create the log directory if it does not exist
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }


        log4js.level = 'debug'; // default level is OFF - which means no logs at all.

        log4js.configure({
            appenders:
                {
                    out: {
                        "type": "stdout"
                    },

                    my_error: {
                        type: 'file', filename: logDir + 'error.log', maxLogSize: 1024 * 1024,
                        category: 'error',
                        backups: 5, layout: {
                            type: 'pattern',
                            pattern: '[%d] [%p] [%c]> %m %n-------------'
                        }
                    }
                    , my_info: {
                        type: 'file', filename: logDir + 'info.log', maxLogSize: 1024 * 1024,
                        category: 'info',
                        backups: 2, layout: {
                            type: 'pattern',
                            pattern: '[%d] [%p] [%c]> %m %n-------------'
                        }
                    }

                }
            , categories: {
                default: { appenders: ['my_error'], level: 'error' },
                log_info: { appenders: ['my_info'], level: 'info' },


            }
        });
        //---------------------------------------
        // {

        //     appenders: 

        //     {  
        //          mylogg: { type: 'file', filename: logDir+'error.log',daysToKeep :5, pattern: 'yyyy-MM-dd HH:mm:ss', compress: true , layout: {
        //             type: 'pattern',
        //             pattern: '[%d] [%p] [%c]> %m %n-------------'
        //           }} },
        //     categories: { default: { appenders: ['mylogg'], level: 'debug' } }
        // }
        //------------------------------------------------------------
        ServiceLog.logger_error = log4js.getLogger();
        ServiceLog.logger_info = log4js.getLogger('log_info');



    }

    public static error(v: any) {
        ServiceLog.logger_error.error(v);
    }
    public static info(v: any) {
        ServiceLog.logger_info.info(v);
    }






}
