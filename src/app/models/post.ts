import {Author} from 'src/app/models/author';
import {PostComment} from 'src/app/models/comment';
import {Like} from 'src/app/models/like';
export interface Post {
    id: number;     
    userId: number;
    content: string;   
    createdAt: Date;
    likes: Like[];
    comments: PostComment[];
  } 
  