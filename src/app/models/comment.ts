import {Author} from 'src/app/models/author';

export interface PostComment{
    id: number;
    content: string;
    PostId: number;
    UserId: number;
    createdAt: Date;
}