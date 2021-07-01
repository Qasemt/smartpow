import { Entity, Column, PrimaryColumn, JoinColumn, OneToOne, OneToMany, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { GreenHouse } from "./GreenHouse";
import { MonitorList } from "./MonitorList";

@Entity()
export class SensorInfo {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    sensorserial: number;
    @Column()
    sensorcode: number;
    @Column( { default: 0 })
    hastemp: number;
    @Column( { default: 0 })
    hashum: number;
    @Column( { default: 0 })
    hasEC: number;
    @Column( { default: 0 })
    hasPH: number;
    @Column( { default: 0 })
    haslux: number;
    @Column( { default: 0 })
    hasCO2: number;

    @Column('double precision', { nullable: true })
    installPositionX: number;
    @Column('double precision', { nullable: true })
    installPositiony: number;
   
    @OneToMany(type => MonitorList, MonitorList => MonitorList._sensorInfo) 
    monitorLists: MonitorList[];
    
    @ManyToOne(type => GreenHouse,greenHouse=>greenHouse)
    greenHouse: GreenHouse;

    @Column({ nullable: true })
    description: string;
    @Column()
    createdAt: number;
    @Column()
    updatedAt: number;




}