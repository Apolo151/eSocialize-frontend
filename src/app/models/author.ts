import { Post } from './post';
export interface Author {
    id: number;             
    name: string;    
    password: string;      
    bio?: string | null;
    email?: string | null;
    profilePictureUrl: string; 
    createdAt: Date;
    posts?: Post[];
    friends?: Author[];       
  }
  