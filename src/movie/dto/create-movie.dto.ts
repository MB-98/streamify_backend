import { Movie } from "../entities/movie.entity";


export class CreateMovieDto {
    title: string;
    description: string;
    image: string;
    filename: string;
    
    constructor(title: string, description: string, image: string, filename: string ) {
        this.title = title;
        this.description = description;
        this.image = image;
        this.filename = filename;
    }
    
    static fromObject(obj: any): CreateMovieDto {
        return new CreateMovieDto(
            obj.title,
            obj.description,
            obj.image,
            obj.filename
        );
    }
}
