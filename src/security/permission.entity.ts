import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn("identity")
  id: string;

  @Column({ unique: true, nullable: false})
  tipo: string;

  @Column()
  descricao: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({unique: true})
  userId: string;

}