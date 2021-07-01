import {Entity, Column,PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
@Entity()
export class SensorLogs {
  
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    sensorserial:number;
    @Column()
    sensorcode :number;
    @Column('double precision',{ default: null,nullable: true })
    value1:number;
    @Column('double precision',{ default: null,nullable: true })
    value2:number;
    @Column('double precision',{ default: null,nullable: true })
    value3:number;
    @Column('double precision',{ default: null,nullable: true })
    value4:number;
    @Column('double precision',{ default: null,nullable: true })
    value5:number;
    @Column('double precision',{ default: null,nullable: true })
    value6:number;
    @Column()
    sensor_type:number;
    @Column()
    sensor_model:number;
    @Column()
    createdAt:number;
    @Column()
    updatedAt:number;

}