import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Properties } from "./properties.entity";

import { User } from "./user.entity";

@Entity("schedules_users_properties")
export class Schedules {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(() => Properties)
  property: Properties;

  @ManyToOne(() => User)
  user: User;
}
