import {Entity, Column,PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
@Entity()
export class SensorsAssignToDevices {
  /*سنسور حساس به دستگاه می کند */

  @PrimaryGeneratedColumn()
    id: number;
    @Column()
    deviceCode:number;
    @Column('double precision')
    value1 :number;
    @Column('double precision')
    value2:number;
    @Column()
    sensitivesensor:number;
    @Column({default:0})
    sensorcode:number;
    @Column()
    smsalert:boolean;
    @Column()
    istaskactive:boolean;
    @Column()
    createdAt:number;
    @Column()
    updatedAt:number;

}