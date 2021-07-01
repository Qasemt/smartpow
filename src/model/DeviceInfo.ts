import { Entity, Column, PrimaryColumn, JoinColumn, OneToOne, OneToMany, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { GreenHouse } from "./GreenHouse";
@Entity()
export class DeviceInfo {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({unique:true,nullable:false})
    code: number;
    @Column()
    title: string;
    
    @ManyToOne(type => GreenHouse,greenHouse=>greenHouse)
    greenHouse: GreenHouse;
   
    @Column()
    powerstatus: boolean;
    @Column()
    schedulemode: number;
    @Column({ default: 1, nullable: false })
    durationtimesecs: number;
    @Column({ default: 0, nullable: false })
    starttime: number;
    @Column()
    deviceenable: boolean;
    @Column()
    smsalertenable: boolean;
    @Column()
    createdAt: number;
    @Column()
    updatedAt: number;



    constructor(code: number, title: string, power_status: boolean, schedule_mode: number, device_enable: boolean, sms_alert_enable: boolean) {
        this.code = code;
        this.title = title;
        this.powerstatus = power_status;
        this.schedulemode = schedule_mode;
        this.deviceenable = device_enable;
        this.smsalertenable = sms_alert_enable;

    }

}