import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Users } from './users.entity';
import { OrderDetail } from './orderDetails.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: string = uuid();
  @OneToMany(() => Users, (user) => user.id)
  user_id: string;
  @Column('timestamp')
  date: Date = new Date();
  @OneToOne(() => OrderDetail)
  @JoinColumn()
  orderDetail: OrderDetail;
}
