import {Author} from 'src/app/models/author';
import {PostComment} from 'src/app/models/comment';
export interface Post {
    id: number;     
    title: string;      
    body: string;       
    author: Author;     
    createdAt: Date;
    comments: PostComment[];
  } 
  