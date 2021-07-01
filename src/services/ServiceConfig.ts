import { SP } from "../SP";
import * as api from "../common/api";
let fs = require('fs');
let path = require("path");

export class ServiceConfig {

    private m_configuration: any = "";

    public get ServerHttpsPort(): number {
        switch (SP._CurrentOS) {
            case api.XGlobal.En_OS.Windows: {
                return this.m_configuration.WinServerHttpsPort;
            }
            case api.XGlobal.En_OS.Linux:
                {
                    return this.m_configuration.ServerHttpsPort;
                }
        }
    }
    public get   ServerSensorPort():number
    {
        switch (SP._CurrentOS) {
            case api.XGlobal.En_OS.Windows: {
                return this.m_configuration.ServerSensorPort;
            }
            case api.XGlobal.En_OS.Linux:
                {
                    return this.m_configuration.ServerSensorPort;
                }
        }
    }
    public get ServerHttpPort(): number {
        switch (SP._CurrentOS) {
            case api.XGlobal.En_OS.Windows: {
                return this.m_configuration.WinServerHttpPort;
            }
            case api.XGlobal.En_OS.Linux:
                {
                    return this.m_configuration.ServerHttpPort;
                }
        }
    }
    public get App_Name(): string {
        return this.m_configuration.App_Name;
    }
    public get FolderRoot(): string {
        return this.m_configuration.Folder_Root;
    }

    public get ServerIp(): string {
        return this.m_configuration.ServerIP;
    }

    get first_init(): boolean {
        return this.m_configuration.first_init;
    }
    set first_init(v: boolean) {
        this.m_configuration.first_init = v;
    }

    public readConfig(): boolean {
        let res: boolean = false;
        try {

            if (fs.existsSync(path.join(__dirname, './../../config.json')) == false) return false;

            this.m_configuration = JSON.parse(fs.readFileSync(path.join(__dirname, './../../config.json')));

            res = true;
        } catch (e) {
            res = false;
        }

        return res;
    }

    public writeConfig(): boolean {
        let res: boolean = false;
        try {

            if (fs.existsSync(path.join(__dirname, './../../config.json')) == false) return false;
            fs.writeFileSync(path.join(__dirname, './../../config.json'), JSON.stringify(this.m_configuration));
            res = true;
        } catch (e) {
            res = false;
        }

        return res;
    }
}