import { Entity, Column, PrimaryColumn, ManyToOne, JoinTable, PrimaryGeneratedColumn } from "typeorm";
import { SensorInfo } from "./SensorInfo";

@Entity()
export class MonitorList {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => SensorInfo, _sensorInfo => _sensorInfo)
    @JoinTable()
    _sensorInfo: SensorInfo;

    @Column()
    sensortype: number;
    @Column()
    createdAt: number;
    @Column()
    updatedAt: number;




    constructor(sensortype: number) {

        this.sensortype = sensortype;

    }


}