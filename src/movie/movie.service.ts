import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieRepository } from './movie.repository';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MovieService {

  constructor(private readonly movieRepository: MovieRepository) {}

  findAll() {
    return this.movieRepository.findAll();
  }

  findOne(id: string) {
    return this.movieRepository.findById(id);
  }

  create(createMovie: CreateMovieDto) {
    return this.movieRepository.create(Movie.fromCreateMovieDto(createMovie));
  }
  
  update(updateMovie: UpdateMovieDto) {
    return this.movieRepository.update(updateMovie);
  }

  remove(id: string) {
    return this.movieRepository.delete(id);
  }
}
