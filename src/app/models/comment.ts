import {Author} from 'src/app/models/author';

export interface PostComment{
    id: number;
    body: string;
    author: Author;
    createdAt: Date;
}