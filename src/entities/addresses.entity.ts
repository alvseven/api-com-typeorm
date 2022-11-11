import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Addresses {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  district: string;

  @Column()
  zipCode: string;

  @Column()
  number: string;

  @Column()
  city: string;

  @Column()
  state: string;
}
