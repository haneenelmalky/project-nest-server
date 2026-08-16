import { Controller, Body, Get, Param, Post, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dtos/create-movie';
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
    @Get()
    findAll() {
        console.log('MoviesController.findAll called');
        return this.moviesService.findAll();
    }
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.moviesService.findOne(id);
    }
    @Post()
    create(@Body() movie: CreateMovieDto) {
        return this.moviesService.create(movie);
    }
}