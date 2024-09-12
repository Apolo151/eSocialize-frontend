import { Post } from './post';
export interface Author {
    id: number;             
    name: string;          
    bio?: string;          
    email?: string;        
    profilePictureUrl?: string; 
    createdAt: Date;
    posts?: Post[];
    friends?: Author[];       
  }
  