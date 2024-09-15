import { Post } from './post';
export interface Author {
    id: number;             
    username: string;    
    password: string;      
    profile_picture: string; 
    isActive: boolean;
    createdAt: Date;
    email?: string | null;
    bio?: string | null;
    posts?: Post[];
    friends?: number[];       
  }
  