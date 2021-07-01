import {Entity, Column,PrimaryColumn} from "typeorm";
@Entity()
export class SystemParameter {
  
    @PrimaryColumn("integer")
    pkey: number;
    @Column()
    pkeytitle:string;
    @Column()
    pvalue :string;
    @Column()
    createdAt:number;
    @Column()
    updatedAt:number;

}