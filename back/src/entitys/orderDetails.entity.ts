import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Order } from './order.entity';
import { Products } from './products.entity';
@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();
  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  price: number;
  @OneToOne(() => Order, (order) => order.orderDetail)
  @JoinColumn() // requerido desde un lado de la tabla contendrá "id"
  order: Order;
  @ManyToMany(() => Products, (product) => product.orderDetail)
  products: Products[];
}
