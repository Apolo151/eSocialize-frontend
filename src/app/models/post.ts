import {Author} from 'src/app/models/author';
import {PostComment} from 'src/app/models/comment';
import {Likes} from 'src/app/models/likes';
export interface Post {
    id: number;     
    userId: number;
    content: string;   
    createdAt: Date;
    likes: Likes[];
    comments: PostComment[];
  } 
  