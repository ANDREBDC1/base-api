import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false})
  tipo: string;

  @Column()
  descricao: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({nullable: false})
  userId: string;

}