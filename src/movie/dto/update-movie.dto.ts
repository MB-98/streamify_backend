import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { Movie } from '../entities/movie.entity';

export class UpdateMovieDto {
    id: string;
    title?: string;
    description?: string;
    image?: string;
    
    constructor(id: string, title?: string, description?: string, image?: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.image = image;
    }
    
    static fromObject(obj: any): UpdateMovieDto {
        return new UpdateMovieDto(
        obj.id,
        obj.title,
        obj.description,
        obj.image
        );
    }

}
