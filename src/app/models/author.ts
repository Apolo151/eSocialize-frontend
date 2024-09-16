import { Post } from './post';
export interface Author {
    id: number;             
    userName: string;    
    email?: string | null;
    bio?: string | null;
    profilePicture?: string; 
    
    password?: string | null;      
    isActive?: boolean;
    createdAt?: Date;
    friends?: number[];       
  }
  