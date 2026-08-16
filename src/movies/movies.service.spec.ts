import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { beforeEach, describe, expect, it } from '@jest/globals';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all movies', () => {
    const movies = service.findAll();

    expect(movies).toBeDefined();
    expect(movies.length).toBeGreaterThan(0);
  });

  it('should find a movie by id', () => {
    const movie = service.findOne(1);

    expect(movie).toBeDefined();
    expect(movie.id).toBe(1);
  });

  it('should throw an error if movie is not found', () => {
    expect(() => service.findOne(999)).toThrow();
  });

  it('should create a new movie', () => {
    const movie = service.create({
      title: 'Titanic',
      release_year: 1997,
    });

    expect(movie).toBeDefined();
    expect(movie.title).toBe('Titanic');
    expect(movie.release_year).toBe(1997);
  });

  it('should reject a movie with a future release year', () => {
    expect(() =>
      service.create({
        title: 'Future Movie',
        release_year: 3000,
      }),
    ).toThrow();
  });
});