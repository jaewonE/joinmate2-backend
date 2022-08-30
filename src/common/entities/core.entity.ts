import { IsInt, IsPositive } from 'class-validator';
import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CoreEntity {
  @PrimaryGeneratedColumn('increment')
  @IsInt()
  @IsPositive()
  id: number;

  @CreateDateColumn()
  createAt: Date;
}
