import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsInt()
  release_year!: number;
}
