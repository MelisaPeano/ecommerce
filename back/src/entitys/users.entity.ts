import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Order } from './order.entity';
@Entity({
  name: 'users',
})
export class Users {
  @PrimaryColumn('uuid')
  id: string = uuid();
  @Column('varchar', { length: 50, nullable: false })
  name: string;
  @Column('varchar', { length: 50, nullable: false, unique: true })
  email: string;
  @Column('varchar', { length: 20, nullable: false })
  password: string;
  @Column('int', { nullable: true })
  phone: number;
  @Column('varchar', { length: 50, nullable: true })
  country: string;
  @Column('text', { nullable: true })
  address: string;
  @Column('varchar', { length: 50, nullable: true })
  city: string;
  @OneToMany(() => Order, (order) => order.user_id)
  orders: Order[];
}