import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Addresses } from "./addresses.entity";
import { Categories } from "./categories.entity";
import { Schedules } from "./schedules.entity";

@Entity()
export class Properties {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("boolean", { default: false })
  sold: boolean;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  value: number;

  @Column()
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Addresses, { nullable: false })
  @JoinColumn()
  address: Addresses;

  @OneToMany(() => Schedules, (schedules) => schedules.property)
  schedules: Schedules[];

  @ManyToOne(() => Categories, (Categories) => Categories)
  category: Categories;
}
