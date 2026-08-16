import { Column, Entity, PrimaryGeneratedColumn,Index } from 'typeorm';

@Entity('movies')
@Index('movies_year_idx', ['releaseYear'])
export class Movie {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id!: number;

  @Column({
    type: 'uuid',
    default: () => 'gen_random_uuid()',
    unique: true,
  })
  uuid!: string;

  @Column({ type: 'text' })
  title!: string;

  @Column({ name: 'release_year', type: 'integer' })
  releaseYear!: number;

  @Column({
    name: 'runtime_minutes',
    type: 'integer',
    nullable: true,
  })
  runtimeMinutes!: number | null;

  @Column({
    type: 'text',
    nullable: true,
  })
  overview!: string | null;

  @Column({
    name: 'poster_url',
    type: 'text',
    nullable: true,
  })
  posterUrl!: string | null;

  @Column({
    name: 'trailer_url',
    type: 'text',
    nullable: true,
  })
  trailerUrl!: string | null;

  @Column({
    type: 'text',
    nullable: true,
  })
  language!: string | null;
}