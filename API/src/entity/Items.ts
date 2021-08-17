import { Entity, PrimaryGeneratedColumn, Unique, Column } from 'typeorm';
import { MinLength, IsNotEmpty} from 'class-validator';

@Entity()
export class Items {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MinLength(5)
  name: string;

  @Column()
  @MinLength(5)
  description: string;

  @Column()
  price: number;

  @Column()
  image: string;

}
