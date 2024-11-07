import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Products } from './products.entity';

@Entity({
  name: 'categories',
})
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();
  @Column('varchar', { length: 50, nullable: false })
  name: string;
  @OneToMany(() => Products, (product) => product.category)
  product: Products[];
}
