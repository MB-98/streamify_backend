import { v4 as uuidv4 } from 'uuid';
import { CreateMovieDto } from '../dto/create-movie.dto';

export class Movie {
    id: string;
    title: string;
    description: string;
    image: string;
    filename: string;
    
    constructor(id: string, title: string, description: string, image: string, filename: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.image = image;
        this.filename = filename;
    }

    static fromObject(obj: any): Movie {
        return new Movie(
            obj.id.S,
            obj.title.S,
            obj.description.S,
            obj.image.S,
            obj.filename.S
        );
    }

    static fromCreateMovieDto(createMovieDto: CreateMovieDto): Movie {
        return new Movie(
            uuidv4(),
            createMovieDto.title,
            createMovieDto.description,
            createMovieDto.image,
            createMovieDto.filename
        );
    }
}
