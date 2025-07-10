import { DynamoDBClient, GetItemCommand, PutItemCommand, ScanCommand, Update } from "@aws-sdk/client-dynamodb";
import { Injectable } from "@nestjs/common";
import { Movie } from "./entities/movie.entity";
import { UpdateMovieDto } from "./dto/update-movie.dto";

@Injectable()
export class MovieRepository {
    private readonly tableName = 'streamify_movies';
    private readonly client: DynamoDBClient

    constructor() {
        this.client = new DynamoDBClient({
            region: process.env.REGION,
            credentials: {
                accessKeyId: process.env.ACCESS_KEY!,
                secretAccessKey: process.env.SECRET_ACCESS_KEY!,
            },
        });
    }

    async findAll() {
        const result: Movie[] = [];

        const command = new ScanCommand({
        TableName: this.tableName,
        });

        const response = await this.client.send(command)
        if(response.Items){
            response.Items.forEach(item => {
            result.push(Movie.fromObject(item));
            });
        }

        return result;
    }

    async findById(id: string) {
        const command = new GetItemCommand({
            TableName: this.tableName,
            Key: {
                id: { S: id.toString() },
            },
        });

        const response = await this.client.send(command);
        if (response.Item) {
            return Movie.fromObject(response.Item);
        }
        return undefined;
    }

    async create(movie: Movie) {
        const itemObject: Record<string, any> = {
            id: { S: movie.id },
            title: { S: movie.title },
            description: { S: movie.description },
            image: { S: movie.image },
        };

        const command = new PutItemCommand({
            TableName: this.tableName,
            Item: itemObject,
        });

        await this.client.send(command);
        return movie;
    }

    async update(movie: UpdateMovieDto) {
        const itemObject: Record<string, any> = {
            id: { S: movie.id }
        };

        if (movie.title) {
            itemObject.title = { S: movie.title };
        }
        if (movie.description) {
            itemObject.description = { S: movie.description };
        }
        if (movie.image) {
            itemObject.image = { S: movie.image };
        }

        const command = new PutItemCommand({
            TableName: this.tableName,
            Item: itemObject,
        });

        await this.client.send(command);
        return movie;
    }

    delete(id: string) {
        return `This action removes a #${id} movie`;
    }
}