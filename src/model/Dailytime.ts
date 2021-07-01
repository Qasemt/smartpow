import {Entity, Column,PrimaryColumn, Double, PrimaryGeneratedColumn} from "typeorm";
@Entity()
export class DailyTime {
  
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    deviceCode:number;
    @Column()
    starttime :number;
    @Column()
    endtime:number;
    @Column()
    durationofsecond:number;
    @Column()
    durationofminute:number;
    @Column()
    smsalert:boolean;
    @Column()
    istaskactive:boolean;
    @Column()
    createdAt:number;
    @Column()
    updatedAt:number;

}