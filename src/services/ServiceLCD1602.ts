import { SP } from "../SP";
import * as api from "../common/api";
// lcd 16 x 2

var Jdate = require('jdate');
export class ServiceLCD1602 {

    private m_i2c: any = "";
    private m_is_rpi_available: boolean = false;
    private m_lcd_device: any = undefined;
    private m_LastMinuteValue = -1;
    private m_address = 0x27;
    private m_Messages: any = [];
    private m_lastStatusText = "";
    //--
    private _StartTime = new Date();
    private _ShowLastMessage: any;
    private _MessageTimeout: number = 7;
    private _NumberOFDeviceON: number = 0;
    private _MessageType: number = -1;
    private _is_AllDeviceOff_Show: boolean = false;
    private _isRefresh: boolean = false;

    // commands
    private LCD_CLEARDISPLAY = 0x01;
    private LCD_RETURNHOME = 0x02;
    private LCD_ENTRYMODESET = 0x04;
    private LCD_DISPLAYCONTROL = 0x08;
    private LCD_CURSORSHIFT = 0x10;
    private LCD_FUNCTIONSET = 0x20;
    private LCD_SETCGRAMADDR = 0x40;
    private LCD_SETDDRAMADDR = 0x80;

    //flags for display entry mode
    private LCD_ENTRYRIGHT = 0x00;
    private LCD_ENTRYLEFT = 0x02;
    private LCD_ENTRYSHIFTINCREMENT = 0x01;
    private LCD_ENTRYSHIFTDECREMENT = 0x00;

    //flags for display on/off control
    private LCD_DISPLAYON = 0x04;
    private LCD_DISPLAYOFF = 0x00;
    private LCD_CURSORON = 0x02;
    private LCD_CURSOROFF = 0x00;
    private LCD_BLINKON = 0x01;
    private LCD_BLINKOFF = 0x00;

    // flags for display/cursor shift
    private LCD_DISPLAYMOVE = 0x08;
    private LCD_CURSORMOVE = 0x00;
    private LCD_MOVERIGHT = 0x04;
    private LCD_MOVELEFT = 0x00;

    //flags for function set
    private LCD_8BITMODE = 0x10;
    private LCD_4BITMODE = 0x00;
    private LCD_2LINE = 0x08;
    private LCD_1LINE = 0x00;
    private LCD_5x10DOTS = 0x04;
    private LCD_5x8DOTS = 0x00;


    // flags for backlight control
    private LCD_BACKLIGHT = 0x08;
    private LCD_NOBACKLIGHT = 0x00;
    private En = 0x4;//0b00000100 // Enable bit
    private Rw = 0x2;//0b00000010 // Read/Write bit
    private Rs = 0x1;//0b00000001 // Register select bit
    constructor() {

        SP._Emitter.on(api.XGlobal.En_Events.events_LCDMessage, this.onLCDMessage);
    }
    public loadModule(): void {
        try {
            this.m_i2c = require('i2c');
            this.m_lcd_device = new this.m_i2c(this.m_address, { device: '/dev/i2c-1' });
            this.m_is_rpi_available = true;
        } catch (e) {
            if (e.code === 'MODULE_NOT_FOUND') {
                console.log("Module I2C Not Found ...! ");
            }
        }
    }
    private onLCDMessage(messageObject: any) {
        this.addMessage(messageObject);
    }

    private on_TimeOut_NewMessage() {

        var now = new Date();

        if (this.getSecs(this._StartTime, now) <= 5) return;

        if (this._ShowLastMessage != undefined && this.getSecs(this._ShowLastMessage, now) <= this._MessageTimeout) return;


        if (this.m_Messages.length > 0) {

            var msgRecs = this.m_Messages.shift();
            this.clearLine(msgRecs.Line);
            this._is_AllDeviceOff_Show = false;
            this.m_lastStatusText = "";
            this._ShowLastMessage = new Date();
            this._MessageTimeout = msgRecs.MSGTimeOut;
            this.lineOut(msgRecs.msg, msgRecs.Line);

        }


    };
    private writRawI2C(raw_data: any): void {
        this.m_lcd_device.write(raw_data, function (err: any) {
        });
    };

    //clocks EN to latch command
    private lcdStrobe(data: any) {
        this.writRawI2C([(data | this.En | this.LCD_BACKLIGHT)]);
        // sleep(.0005)
        this.writRawI2C(((data & ~this.En) | this.LCD_BACKLIGHT));
        // sleep(.0001)
    };

    private lcdWrite4(data: any) {

        this.writRawI2C(new Buffer([(data | this.LCD_BACKLIGHT)]));
        this.writRawI2C(new Buffer([(data | this.LCD_DISPLAYON | this.LCD_BACKLIGHT)]));
        this.writRawI2C(new Buffer([((data & ~this.LCD_DISPLAYON) | this.LCD_BACKLIGHT)]));
        //  lcdStrobe(data);

    }
    private lcdWrite(data: any, mode: any) {
        if (this.m_is_rpi_available) {
            this.lcdWrite4(mode | (data & 0xF0));
            this.lcdWrite4(mode | ((data << 4) & 0xF0));
        }
    }

    private LCDINIT() {
        if (this.m_is_rpi_available) {
            this.lcdWrite(0x03, 0);
            this.lcdWrite(0x03, 0);
            this.lcdWrite(0x03, 0);
            this.lcdWrite(0x02, 0);

            this.lcdWrite(this.LCD_FUNCTIONSET | this.LCD_2LINE | this.LCD_5x8DOTS | this.LCD_4BITMODE, 0);
            this.lcdWrite(this.LCD_DISPLAYCONTROL | this.LCD_DISPLAYON, 0);
            this.lcdWrite(this.LCD_CLEARDISPLAY, 0);
            this.lcdWrite(this.LCD_ENTRYMODESET | this.LCD_ENTRYLEFT, 0);
        }
    }
    private logg(data: any) {
        return;
        //  console.log(data)
    }
    private lineOut(str: any, addr: any) {
        if (addr == 1)
            this.lcdWrite(0x80, 0);
        if (addr == 2)
            this.lcdWrite(0xC0, 0);
        if (addr == 3)
            this.lcdWrite(0x94, 0);
        if (addr == 4)
            this.lcdWrite(0xD4, 0);

        if (this.m_is_rpi_available) {
            str.split('').forEach(function (c: any) {
                this.lcdWrite(c.charCodeAt(0), 1);
            });
        } else {
            this.logg("_____________________________");
            this.logg(addr + "> " + str);
        }
    };
    private showTime() {

        var now = new Date();
        if (this.m_LastMinuteValue != now.getMinutes()) {
            var j = Jdate.JDate();
            var persianDateStr = j.toString('yy/MM/dd HH:mm');

            this.lineOut(persianDateStr, 2);
            j = null;

            this.m_LastMinuteValue = now.getMinutes();
        }

    };

    private clearLine(line: any) {
        if (this.m_is_rpi_available) {
            var str = "";
            for (let ii: number = 1; ii <= 16; ii++) {
                str += " ";
            }
            this.lineOut(str, line);
        } else {
            //  console.log("<< CLEAR LINE " + line + " >>");
        }
    };

    private clearScreen() {
        if (this.m_is_rpi_available)
            this.lcdWrite(this.LCD_CLEARDISPLAY, 0);
        else {
            this.logg("<< CLEAR SCREEN >>");
        }
    };

    private myWritMessage(messageValue: any) {

        var msgReady = "Device " + messageValue.DeviceCode + ": " + (messageValue.DeviceStatus ? "On" : "Off");

        if (messageValue.Line == 2) {
            strLine = "[Line 2]";
        }

        if (this.m_is_rpi_available == false) {
            this.logg("_____________________________");
            var strLine = "[Line 1]";
            this.logg(strLine + ">> " + msgReady);

        } else this.lineOut(msgReady, messageValue.Line);
    };
    private refreshDeviceStatus(): void {
        this.m_lastStatusText = "";
        // this.modeldeviceinfo.findAll().then(function (records) {

        //     // console.log("-------------------- All :" + records.length);
        //     this._NumberOFDeviceON = 0;
        //     this._AllDeviceStatuse = [];
        //     for (ii = 0; ii < records.length; ii++) {
        //         var rec = records[ii];
        //         if (rec.deviceenable) {
        //             self._AllDeviceStatuse.push({
        //                 Line: 1,
        //                 DeviceCode: rec.code,
        //                 DeviceStatus: rec.powerstatus,
        //                 msg: "Device " + rec.code + ": " + (rec.powerstatus ? "On" : "Off")
        //             });
        //             if (rec.powerstatus == true)
        //                 self._NumberOFDeviceON++
        //         }
        //     }
        // }).catch(function (error) {
        //     Logg('LCD1602 > RefreshDeviceStatus [ Device Info ] ' + error);


        // });

    };
    private splashScreen(): void {

        this.lineOut(" Smart Pow ", 1);
        this.lineOut("      INIT    ", 2);
    };
    private addMessage(MessageObj: any) {
        this.m_Messages.push(MessageObj);
    };
    private getSecs(sTime: any, eTime: any) {
        var secs = (eTime - sTime) / 1000;

        return Math.abs(secs);
    };
}
