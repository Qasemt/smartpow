import {Entity, Column,PrimaryColumn} from "typeorm";
@Entity()
export class Profile {

    @PrimaryColumn("integer",{ nullable: false })
    code: number;
    @Column({ nullable: false })
    name:string;
    @Column({ nullable: false })
    lastName :string;
    @Column({ nullable: false })
    userName:string;
    @Column({ nullable: false })
    pass:string;
    @Column({ nullable: false })
    mobile:string;
    @Column({ nullable: false })
    userType:number;
    @Column({ nullable: false })
    memberOf:string;
    @Column({ nullable: false })
    isGroup:boolean;
    @Column({ nullable: false })
    isRTL:boolean;
    @Column({ nullable: false })
    langId:boolean;
    @Column({ nullable: false })
    createdAt:number;
    @Column({ nullable: false })
    updatedAt:number;
   
}