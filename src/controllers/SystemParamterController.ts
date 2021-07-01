import { JsonController, Get, Post, Param, QueryParam, Delete, Body, Res, Req, NotFoundError, HttpError } from "routing-controllers";
import { Service } from "typedi";
import { SystemParameterRepository } from "../repository/SystemParameterRepository";
import { Not_FoundError } from "../common/MyStatus";
import * as api from "../common/api";
import { SystemParameter } from "../model/SystemParameter";
import { SP } from "./../SP";
import { json } from "body-parser";
import * as fs from 'fs';
import { error } from "util";

var macaddress = require('macaddress');
var cmd = require('node-cmd');
//-----------------------

class postAnyObject {
    userTime: String;
    //-------------------------- ip
    StaticIp: string;
    SubNetMask: string;
    WifiName: string;
    WifiPassword: string;
    WifiMode: number;
    DefaultGatewayIp: string;
}
const  enum EnTaskType {
    None = -1,
    GetSystemTime = 1,
    SetSystemTime = 2,
    SetFormIp = 3,
    GetCurrentIP = 4,//not used
    GetMacAddress = 5,
    SystemReboot = 6
}
const enum En_Rec_KeyValue {
    StaticIp = 1,
    SubNetMask = 2,
    WifiName = 3,
    WifiPassword = 4,
    WifiMode = 5,
    DefaultGatewayIp = 6
};

async function WriteToTextFile(addressFile: string, txtContent: string) {

    let res_write: boolean;

    let res1 = await fs.writeFile(addressFile, txtContent, function (err: any) {
        if (err) {
            console.log(err);
            res_write = false;
        }
        res_write = true;
    });

    if (res_write) {
        var cmd_ = 'dos2unix ' + addressFile;
        console.log('Address File ' + cmd_);
        cmd.get(cmd_, function (data1: any) {
            console.log("Run Dos2Unix " + data1);

        });
    }




}

function RemoveFile(fileAddress: string) {

    if (fs.existsSync(fileAddress)) {
        fs.unlinkSync(fileAddress)
    }
    return true
}

@Service()
@JsonController()
export class SystemParamtersController {


    _car_ret: string = "";
    _AddressFile: string = "";
    _Addresshostapd: string = "";

    constructor(private system_paramS_Repository: SystemParameterRepository) {
        switch (SP._CurrentOS) {
            case api.XGlobal.En_OS.Windows: {
                this._AddressFile = "d:/t1.txt";
                this._Addresshostapd = "d:/hostapd.conf";
                console.log("windows  platform");
                this._car_ret = "\r\n";
                break;
            }
            case api.XGlobal.En_OS.Linux:
                {
                    this._AddressFile = "/etc/network/interfaces";
                    this._Addresshostapd = "/etc/hostapd/hostapd.conf";
                    console.log("Linux  platform");
                    this._car_ret = "\n";
                    break
                }
        }


    }

    private HotSpotInterfaceNetContent(netObject: any) {
        var txtContent = [];

        txtContent.push("allow-hotplug wlan0");
        txtContent.push(this._car_ret);
        txtContent.push("iface wlan0 inet static");
        txtContent.push(this._car_ret);
        txtContent.push("address " + netObject.StaticIp);
        txtContent.push(this._car_ret);
        txtContent.push("netmask " + netObject.SubNetMask);
        txtContent.push(this._car_ret);
        txtContent.push("up iptables-restore < /etc/iptables.ipv4.nat");

        return txtContent;
    }

    private Comment_HotSpotInterfaceNetContent() {
        var txtContent = [];
        txtContent.push("#allow-hotplug wlan0");
        txtContent.push(this._car_ret);
        txtContent.push("#iface wlan0 inet static");
        txtContent.push(this._car_ret);
        txtContent.push("#address 192.168.1.56");
        txtContent.push(this._car_ret);
        txtContent.push("#netmask 255.255.255.0");
        txtContent.push(this._car_ret);
        txtContent.push("#up iptables-restore < /etc/iptables.ipv4.nat");
        return txtContent;
    }

    private HotSpotContent(netObject: any) {
        var txtContentHotspot = [];
        txtContentHotspot.push("interface=wlan0");
        txtContentHotspot.push(this._car_ret);
        txtContentHotspot.push("driver=rtl871xdrv");
        txtContentHotspot.push(this._car_ret);
        txtContentHotspot.push("ssid=" + netObject.WifiName);
        txtContentHotspot.push(this._car_ret);
        txtContentHotspot.push("hw_mode=g");
        txtContentHotspot.push(this._car_ret);
        txtContentHotspot.push("channel=6");
        txtContentHotspot.push(this._car_ret);
        txtContentHotspot.push("macaddr_acl=0");
        txtContentHotspot.push(this._car_ret);
        txtContentHotspot.push("auth_algs=1");
        txtContentHotspot.push(this._car_ret);
        txtContentHotspot.push("ignore_broadcast_ssid=0");
        txtContentHotspot.push(this._car_ret);
        txtContentHotspot.push("wpa=2");
        txtContentHotspot.push(this._car_ret);
        txtContentHotspot.push("wpa_passphrase=" + netObject.WifiPassword);
        txtContentHotspot.push(this._car_ret);
        txtContentHotspot.push("wpa_key_mgmt=WPA-PSK");
        txtContentHotspot.push(this._car_ret);
        txtContentHotspot.push("wpa_pairwise=TKIP");
        txtContentHotspot.push(this._car_ret);
        txtContentHotspot.push("rsn_pairwise=CCMP");
        return txtContentHotspot;
    }

    private WifiContent(netObject: any) {
        var txtContent = [];
        txtContent.push("auto wlan0");
        txtContent.push(this._car_ret);
        txtContent.push("allow-hotplug wlan0");
        txtContent.push(this._car_ret);
        txtContent.push("iface wlan0 inet static");
        txtContent.push(this._car_ret);
        txtContent.push("address " + netObject.StaticIp);
        txtContent.push(this._car_ret);
        txtContent.push("netmask " + netObject.SubNetMask);
        txtContent.push(this._car_ret);
        txtContent.push("gateway " + netObject.DefaultGatewayIp);
        txtContent.push(this._car_ret);
        txtContent.push("wpa-passphrase " + netObject.WifiPassword);
        txtContent.push(this._car_ret);
        txtContent.push("wpa-ssid " + netObject.WifiName);
        return txtContent;
    }
    private Comment_WifiContent() {
        var txtContent = [];
        txtContent.push("#auto wlan0");
        txtContent.push(this._car_ret);
        txtContent.push("#allow-hotplug wlan0");
        txtContent.push(this._car_ret);
        txtContent.push("#iface wlan0 inet static");
        txtContent.push(this._car_ret);
        txtContent.push("#address 192.168.1.56");
        txtContent.push(this._car_ret);
        txtContent.push("#netmask 255.255.255.0");
        txtContent.push(this._car_ret);
        txtContent.push("#gateway 192.168.1.210");
        txtContent.push(this._car_ret);
        txtContent.push("#wpa-passphrase 123456 ");
        txtContent.push(this._car_ret);
        txtContent.push("#wpa-ssid smartpow");
        return txtContent;
    }
    private EthernetContent(netObject: any) {
        var txtContent = [];
        txtContent.push("auto lo");
        txtContent.push(this._car_ret);
        txtContent.push("iface lo inet loopback");
        txtContent.push(this._car_ret);
        txtContent.push("auto eth0");
        txtContent.push(this._car_ret);
        txtContent.push("iface eth0 inet static");
        txtContent.push(this._car_ret);
        txtContent.push("address " + netObject.StaticIp);
        txtContent.push(this._car_ret);
        txtContent.push("netmask " + netObject.SubNetMask);
        txtContent.push(this._car_ret);
        txtContent.push("gateway " + netObject.DefaultGatewayIp);
        return txtContent;
    }

    private Comment_EthernetContent() {
        var txtContent = [];
        txtContent.push("#auto eth0");
        txtContent.push(this._car_ret);
        txtContent.push("#iface eth0 inet static");
        txtContent.push(this._car_ret);
        txtContent.push("#address 192.168.1.56");
        txtContent.push(this._car_ret);
        txtContent.push("#netmask 255.255.255.0");
        txtContent.push(this._car_ret);
        txtContent.push("#gateway 192.168.1.210");
        return txtContent;
    }
    private StaticEthernetContent() {
        var txtContent = [];
        txtContent.push("auto lo");
        txtContent.push(this._car_ret);
        txtContent.push("iface lo inet loopback");
        txtContent.push(this._car_ret);
        txtContent.push("iface eth0 inet static");
        txtContent.push(this._car_ret);
        txtContent.push("address 192.168.1.56");
        txtContent.push(this._car_ret);
        txtContent.push("netmask 255.255.255.0");
        txtContent.push(this._car_ret);
        txtContent.push("gateway 192.168.1.210");
        return txtContent;
    }
    private ProcessHotSpot(netObject: any) {
        var txtContent = [];
        txtContent.push("#------------- Ethernet -------------- ");
        txtContent.push(this._car_ret);
        txtContent = txtContent.concat(this.StaticEthernetContent());
        txtContent.push(this._car_ret);
        txtContent.push("#------------- HotSpot -------------- ");
        txtContent.push(this._car_ret);
        txtContent = txtContent.concat(this.HotSpotInterfaceNetContent(netObject));
        txtContent.push(this._car_ret);
        txtContent.push("#------------- Wifi -------------- ");
        txtContent.push(this._car_ret);
        txtContent = txtContent.concat(this.Comment_WifiContent());
        txtContent.push(this._car_ret);


        if (RemoveFile(this._AddressFile)) {
            WriteToTextFile(this._AddressFile, txtContent.join(""));
        }
        //---------------------
        var txtContentHotspot = this.HotSpotContent(netObject);
        if (RemoveFile(this._Addresshostapd)) {
            WriteToTextFile(this._Addresshostapd, txtContentHotspot.join(""));
        }
    };
    private ProcessWifi(netObject: any) {
        var txtContent = [];
        txtContent.push("#------------- HotSpot -------------- ");
        txtContent.push(this._car_ret);
        txtContent = txtContent.concat(this.Comment_HotSpotInterfaceNetContent());
        txtContent.push(this._car_ret);
        txtContent.push("#------------- Ethernet -------------- ");
        txtContent.push(this._car_ret);
        txtContent = txtContent.concat(this.StaticEthernetContent());
        txtContent.push(this._car_ret);
        txtContent.push("#------------- Wifi -------------- ");
        txtContent.push(this._car_ret);
        txtContent = txtContent.concat(this.WifiContent(netObject));
        txtContent.push(this._car_ret);

        if (RemoveFile(this._AddressFile)) {
            WriteToTextFile(this._AddressFile, txtContent.join(""));
        }
    };
    private ProcessEthernet(netObject: any) {
        var txtContent = [];
        txtContent.push("#------------- HotSpot -------------- ");
        txtContent.push(this._car_ret);
        txtContent = txtContent.concat(this.Comment_HotSpotInterfaceNetContent());
        txtContent.push(this._car_ret);

        txtContent.push("#------------- Wifi -------------- ");
        txtContent.push(this._car_ret);
        txtContent = txtContent.concat(this.Comment_WifiContent());
        txtContent.push(this._car_ret);

        txtContent.push("#------------- Ethernet -------------- ");
        txtContent.push(this._car_ret);
        txtContent = txtContent.concat(this.EthernetContent(netObject));
        txtContent.push(this._car_ret);
        if (RemoveFile(this._AddressFile)) {
            WriteToTextFile(this._AddressFile, txtContent.join(""));
        }
    }

    @Get("/service/home/system_params/getlist")
    all(): Promise<SystemParameter[]> {
        return this.system_paramS_Repository.findAll();
    }
 
     
    @Get("/service/home/system_params/task")
    @Post("/service/home/system_params/task")
    async all_task( @QueryParam("code") task_id: number, @Body() post_x: postAnyObject, @Res() res: any, @Req() req: any) {
    
   try{
        switch (task_id) {
            case EnTaskType.GetSystemTime: {
                res.send({ "unix_current_time": (SP.UnixTime()) });
                break;
            }
            case EnTaskType.GetMacAddress:
                {
                    var result_final = [];
                    var list_nets = await macaddress.all(function (err: any, all: any) {
                        return all;
                    });

                    for (var key in list_nets) {
                        if (list_nets.hasOwnProperty(key)) {
                            result_final.push({
                                description: key,
                                mac_address: list_nets[key]["mac"],
                                ip: list_nets[key]["ipv4"]

                            });

                        }
                    }

                    res.send(result_final);
                    break;
                }
            case EnTaskType.GetCurrentIP:
                res.send("Task not used.");
                break;
            case EnTaskType.SetFormIp:
                await this.system_paramS_Repository.SaveOneRec(En_Rec_KeyValue.StaticIp, post_x.StaticIp);
                await this.system_paramS_Repository.SaveOneRec(En_Rec_KeyValue.SubNetMask, post_x.SubNetMask);
                await this.system_paramS_Repository.SaveOneRec(En_Rec_KeyValue.WifiMode, post_x.WifiMode.toString());
                await this.system_paramS_Repository.SaveOneRec(En_Rec_KeyValue.WifiName, post_x.WifiName);
                await this.system_paramS_Repository.SaveOneRec(En_Rec_KeyValue.WifiPassword, post_x.WifiPassword);
                await this.system_paramS_Repository.SaveOneRec(En_Rec_KeyValue.DefaultGatewayIp, post_x.DefaultGatewayIp);
                //------
                if (post_x.WifiMode === 3) {
                    await this.ProcessEthernet(req.body);
                } else if (req.body.WifiMode == 2) {
                    await this.ProcessHotSpot(req.body);
                } else if (req.body.WifiMode == 1) {
                    await this.ProcessWifi(req.body);
                }

                res.send(200);
                break;
            case EnTaskType.SetSystemTime:
                {
                    var cmd_str = 'date -s "' + post_x.userTime + '"';

                    let write_to_linux = await cmd.get(cmd_str, function (t: any) {
                        // console.log('write system time to RTC  >>> ' + data);
                        return "done";
                    });
                    //-----------------

                    let write_to_Rtc = await cmd.get('hwclock -s', function (t: any) {
                        // console.log('write system time to RTC  >>> ' + data);
                        return "done";
                    });
                    res.send(200);
                    // res.send("get SetSystemTime : done");
                    break;
                }
            case EnTaskType.SystemReboot:
                let res_reboot = await cmd.get("shutdown -r now", function (t: any) {

                    return "done";
                });
                break;
            default:
                res.send("Task not found");
                break;

        }
    } catch(e)  {
        res.status(e.httpCode)
        .send({
            name :e.name,
          message: e.message,
          stack:e.stack
        });
      
} 
   
}



}