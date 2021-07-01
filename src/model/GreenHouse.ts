import {Entity, Column,PrimaryColumn, PrimaryGeneratedColumn, OneToOne, OneToMany} from "typeorm";
import { DeviceInfo } from "./DeviceInfo";
import { SensorInfo } from "./SensorInfo";
@Entity()
export class GreenHouse {
  
    @PrimaryGeneratedColumn()
    id: number;
    @OneToMany(type => DeviceInfo, DeviceInfo => DeviceInfo.greenHouse) // note: we will create author property in the Photo class below
    deviceInfos: DeviceInfo[];

    @OneToMany(type => SensorInfo, SensorInfo => SensorInfo.greenHouse) // note: we will create author property in the Photo class below
    SensorInfos: SensorInfo[];

    @Column({unique:true,nullable:false})
    code: number;
    @Column()
    title:string;
    @Column({ nullable: true })
    description:string;
    @Column()
    createdAt:number;
    @Column()
    updatedAt:number;

}