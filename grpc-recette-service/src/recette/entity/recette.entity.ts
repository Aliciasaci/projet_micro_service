import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Recette extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public nom!: string;

  @Column({ type: 'varchar' })
  public description!: string;

  @Column({ type: 'varchar' })
  public ingredients!: string;

  @Column({ type: 'varchar' })
  public instructions!: string;

  @Column({ type: 'integer' })
  public tempsPreparation!: number;

  @Column({ type: 'integer' })
  public tempsCuisson!: number;

  @Column({ type: 'varchar' })
  public categorie!: string;
}
