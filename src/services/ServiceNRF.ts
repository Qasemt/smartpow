import { SensorLogs } from "../model/SensorLogs";
import { SP } from "../SP";
import { SensorLogRepository } from "../repository/SensorLogRepository";
import * as api from "../common/api";
//source :https://www.npmjs.com/package/nrf

export class ServiceNRF {
    private m_nrf24: any = "";
    private m_radio: any = undefined;
    private pipes = [0xF0F0F0F0E1, 0xF0F0F0F0D2];
    private m_SensorLogRepository: SensorLogRepository;
    //var pipes =[0x544d52687c, 0xabcdabcd71];


    // On DATA RECEIVE
    private async onDataRec(d: any) {
        var pattern = /#(\d+),(-?\d*\.?\d+),(-?\d*\.?\d+)#/g;
        var nrfdataString = d.toString('utf8');
        var tempval = 0.0;
        var humval = 0.0;
        var sensorserial = 0;
        var sensorcode = 0;
        // بصورت پیش فرض کد سنسور دما یک ست می شود
        try {

            console.log("RAW DATA : " + nrfdataString);

            var match = pattern.exec(d.toString('utf8'))
            if (match != null && match.index >= 0) {
                sensorcode = 1;


                let sensorserial = match[1];
                let tempval = match[2];
                let humval = match[3];
                let r: SensorLogs;
                r.sensorserial = +sensorserial;
                r.sensorcode = 1;
                r.value1 = +tempval;
                r.value2 = +humval;
                r.value3 = 0;
                r.value4 = 0;
                r.sensor_type = api.XGlobal.En_Sensor_Type.TEM_HUM;
                r.sensor_model = api.XGlobal.En_Sensor_Model.DHT_22;
                r.createdAt = SP.UnixTime();
                // console.log("temp :" + tempval + " " + "hum :" + humval);
               
                if (r.sensor_model == api.XGlobal.En_Sensor_Model.DHT_22) {
                    await this.saveHDTSensor(r);
                }

            }

        } catch (e) {
            console.log("err:" + e);
        } finally {
            console.log("NRF GOT DATA ");
        }


    }
    private async saveHDTSensor(f: SensorLogs) {

        this.m_SensorLogRepository.saveLogs(f);
    }
    public loadModule(): void {
        try {
            this.m_nrf24 = require('nrf');

        } catch (e) {
            if (e.code === 'MODULE_NOT_FOUND') {
                console.log("Module NRF Not Found ...! ");
            }
        }
    }

    public async NRFInit() {
        let result: boolean = false;
        try {
            if (this.m_radio != undefined) {
                console.log("NRF Driver Init >>>>>>>>>>>> ");
                this.m_radio._debug = false;
                this.m_radio.channel(0x4c);
                this.m_radio.dataRate('1Mbps');
                this.m_radio.crcBytes(2);
                this.m_radio.transmitPower('PA_LOW')
                this.m_radio.autoRetransmit({ count: 2, delay: 500 });
                //radio.setStates({DYNPD:0x00, FEATURE:0x00,EN_DPL:0});
                // radio.setStates({DYNPD:0x00, FEATURE:0x01});
                // radio.setStates({EN_DPL:0});
                await this.m_radio.begin(function (e: any) {


                    this.m_radio.printDetails();
                    var rx = this.m_radio.openPipe('rx', this.pipes[0], { size: "auto", autoAck: false }),
                        tx = this.m_radio.openPipe('tx', this.pipes[1], { size: "auto", autoAck: false });
                    //    radio.setStates({DYNPD:0x00, FEATURE:0x00,EN_DPL:0});
                    tx.on('ready', function () {
                        //    radio.printDetails();


                    });
                    tx.on('error', function (e: any) {
                        console.log('err', e);
                    });

                    rx.on('data', this.onDataRec);

                    rx.on('error', function (e: any) {
                        console.log('err NRF => ', e);
                    });
                    console.log("NRF ");
                    result = true;
                });
            }
        } catch (e) {
            console.log('NRF  -> Error >>> ' + e);
            return result;
        } finally {

            return result;

        }

    }

    public NRFStop(): void {

        this.m_radio.end(function () {
            console.log("NRF Stopped ");
        })
    }
}