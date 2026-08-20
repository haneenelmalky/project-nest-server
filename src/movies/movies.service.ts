import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dtos/create-movie';
import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  private addIsRecent(movie: Movie) {
    const currentYear = new Date().getFullYear();

    return {
      ...movie,
      isRecent: currentYear - movie.releaseYear <= 2,
    };
  }

  async findAll() {
    const movies = await this.movieRepository.find();

    return movies.map((movie) => this.addIsRecent(movie));
  }

  async findOne(id: number) {
    const movie = await this.movieRepository.findOne({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return this.addIsRecent(movie);
  }

  async create(movie: CreateMovieDto) {
    if (movie.release_year > new Date().getFullYear()) {
      throw new BadRequestException('Release year cannot be in the future');
    }

    const newMovie = this.movieRepository.create(movie);

    return this.movieRepository.save(newMovie);
  }
}