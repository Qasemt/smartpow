export namespace XGlobal {
    export const  enum En_OS {
        Linux = 1, Windows = 2
    }
    export const  enum En_Language {
        NAN = 0,
        Persin = 1,
        English = 2
    }

    export const  enum En_Sensor_Type {
        NAN = -1,
        TEMP = 1 << 0,
        HUM = 1 << 1,
        AC = 1 << 2,
        PH = 1 << 3,
        LUX = 1 << 4,
        CO2 = 1 << 5,
        TEM_HUM = HUM | TEMP
    }
    export const  enum En_Sensor_Model {
        NAN = -1,
        DHT_22 = 1,
    }


    export enum SPRES {
        //_____________________ GENERAL_____________from (rang 0 - 100)
        E_FAIL = 1,                    // general error
        E_ACCESS_DENIED = 2,                    // for this operation the user is not
        E_NOT_FOUND = 3,                    // item not found
        E_NOT_MODIFIED = 4,                    // are changed
        E_BAD_REQUEST = 5,                    // invalid request parameters 
        E_AUTHENTICATION = 6,                    // object is not initialized
        E_SQL_ERROR = 7,                    // sql error
        E_INVALID_ARGS = 8,                    // argument are invalid
        E_TOO_LARGE = 9,                    // larger than assigned buffer
        E_NOT_MATCH = 10,
        E_ALREADY_EXIST = 11,
        E_TOO_MANY_REQUEST = 12,
        E_NOT_IMPLEMENTED = 13,

        E_AUTHORIZATION_REQUIRED = 14,
        E_SOAP_ERROR = 15,                    // soap error
        E_LOW_MEMORY = 16,
        E_LOW_DISK_SPACE = 17,
        E_UNIQUE_FIELD = 18,
        E_USER_OR_PASSWORD_NOT_FOUND = 19,
        //_____________________ SQLITE_____________from (rang 100 - 199)
        E_SQLITE_ERROR = 101,  /* SQL error or missing database */
        E_SQLITE_INTERNAL = 102,  /* Internal logic error in SQLite */
        E_SQLITE_PERM = 103,  /* Access permission denied */
        E_SQLITE_ABORT = 104,  /* Callback routine requested an abort */
        E_SQLITE_BUSY = 105,  /* The database file is locked */
        E_SQLITE_LOCKED = 106,  /* A table in the database is locked */
        E_SQLITE_NOMEM = 107,  /* A malloc() failed */
        E_SQLITE_READONLY = 108,  /* Attempt to write a readonly database */
        E_SQLITE_INTERRUPT = 109,  /* Operation terminated by sqlite3_interrupt()*/
        E_SQLITE_IOERR = 110,  /* Some kind of disk I/O error occurred */
        E_SQLITE_CORRUPT = 111,  /* The database disk image is malformed */
        E_SQLITE_NOTFOUND = 112,  /* Unknown opcode in sqlite3_file_control() */
        E_SQLITE_FULL = 113,  /* Insertion failed because database is full */
        E_SQLITE_CANTOPEN = 114,  /* Unable to open the database file */
        E_SQLITE_PROTOCOL = 115,  /* Database lock protocol error */
        E_SQLITE_EMPTY = 116,  /* Database is empty */
        E_SQLITE_SCHEMA = 117,  /* The database schema changed */
        E_SQLITE_TOOBIG = 118,  /* String or BLOB exceeds size limit */
        E_SQLITE_CONSTRAINT = 119,  /* Abort due to constraint violation */
        E_SQLITE_MISMATCH = 120,  /* Data type mismatch */
        E_SQLITE_MISUSE = 121,  /* Library used incorrectly */
        E_SQLITE_NOLFS = 122,  /* Uses OS features not supported on host */
        E_SQLITE_AUTH = 123,  /* Authorization denied */
        E_SQLITE_FORMAT = 124,  /* Auxiliary database format error */
        E_SQLITE_RANGE = 125,  /* 2nd parameter to sqlite3_bind out of range */
        E_SQLITE_NOTADB = 126,  /* File opened that is not a database file */
        E_SQLITE_NOTICE = 127,  /* Notifications from sqlite3_log() */
        E_SQLITE_WARNING = 128,  /* Warnings from sqlite3_log() */

        //_____________________ user map error_____________from (200-299)
        RES_UE_UNIQUE_SENSORINFOS_SERIAL = 200,  /* UNIQUE constraint failed : sensorinfos.sensorserial */
        RES_UE_UNIQUE_SENSORINFOS_CODE = 201,  /* UNIQUE constraint failed : sensorinfos.sensorcode */

        //---
        S_OK = 0,                     // general case for the successful implementation âûïîëíåíèÿ
        S_FALSE = 1,                     // success but with some reservations (eg, no data)
    }

    export enum En_Events {
        events_LCDMessage = 1
    }

    export enum En_Sch_Mode {
        Daily = 1,
        Manually = 4,
        Sensor = 5
    }

}
export enum x1 {
    Daily = 1,
    Manually = 4,
    Sensor = 5
}

/*~ If your module exports types or values, write them as usual */
export interface StringFormatOptions {
    fancinessLevel: number;
}




