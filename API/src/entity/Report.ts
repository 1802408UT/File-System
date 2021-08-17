import { Entity, PrimaryGeneratedColumn, Unique, Column } from 'typeorm';
import { MinLength, IsNotEmpty} from 'class-validator';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MinLength(3)
  product: string;

  @Column()
  @MinLength(2)
  price: number;

  @Column()
  @MinLength(5)
  movimiento: string;

  @Column()
  @MinLength(3)
  vendedor: string;

}
