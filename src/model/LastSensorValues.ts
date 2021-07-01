import { Entity, Column, PrimaryColumn } from "typeorm";
@Entity()
export class LastSensorValues {

    @PrimaryColumn("integer")
    id: number;
    @Column()
    sensorserial: number;
    @Column()
    sensorcode: number;
    @Column('double precision') //temp
    value1: number;
    @Column('double precision') // hum
    value2: number;
    @Column('double precision') //ph
    value3: number;
    @Column('double precision') //ec
    value4: number;
    @Column('double precision') // lux
    value5: number;
    @Column()
    sensor_type: number;
    @Column()
    sensor_model: number;
    @Column()
    createdAt: number;
    @Column()
    updatedAt: number;

}