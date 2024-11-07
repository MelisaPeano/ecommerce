import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Category } from './categories.entity';
import { OrderDetail } from './orderDetails.entity';

@Entity({
  name: 'products',
})
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();
  @Column('varchar', { length: 50, nullable: false })
  name: string;
  @Column('text', { nullable: false })
  description: string;
  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  price: number;
  @Column('int', { nullable: false })
  stock: number;
  @Column({ nullable: true, default: './assets/comingsoon.png' })
  imgUrl?: string;
  @ManyToOne(() => Category, (category) => category.product)
  category: string;
  @ManyToMany(() => OrderDetail, (ordenDetail) => ordenDetail.products)
  @JoinTable()
  orderDetail?: [];
}
