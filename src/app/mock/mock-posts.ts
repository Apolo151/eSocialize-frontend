import { Post } from '../models/post';
import { Author } from '../models/author';
//generated from ChatGPT
const authors: Author[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    bio: 'Software Engineer and TypeScript enthusiast.',
    email: 'alice.johnson@example.com',
    profilePictureUrl: undefined,
    createdAt: new Date('2024-01-01T00:00:00Z'),
  },
  {
    id: 2,
    name: 'Bob Smith',
    bio: 'Frontend developer with a passion for Angular.',
    email: 'bob.smith@example.com',
    profilePictureUrl: undefined,
    createdAt: new Date('2024-01-02T00:00:00Z'),
  },
  {
    id: 3,
    name: 'Carol Williams',
    bio: 'React developer and UI/UX designer.',
    email: 'carol.williams@example.com',
    profilePictureUrl: undefined,
    createdAt: new Date('2024-01-03T00:00:00Z'),
  },
  {
    id: 4,
    name: 'Dave Brown',
    bio: 'JavaScript expert and web performance advocate.',
    email: 'dave.brown@example.com',
    profilePictureUrl: undefined,
    createdAt: new Date('2024-01-04T00:00:00Z'),
  },
  {
    id: 5,
    name: 'Eve Davis',
    bio: 'CSS specialist and web design guru.',
    email: 'eve.davis@example.com',
    profilePictureUrl: undefined,
    createdAt: new Date('2024-01-05T00:00:00Z'),
  }
];

export const mockPosts: Post[] = [
  {
    id: 1,
    title: 'Exploring TypeScript',
    body: 'TypeScript is a powerful tool that adds static typing to JavaScript. It helps in catching errors early during development and makes the code more maintainable.',
    author: authors[0],
    createdAt: new Date('2024-09-01T10:00:00Z')
  },
  {
    id: 2,
    title: 'Introduction to Angular',
    body: 'Angular is a popular framework for building single-page applications. It provides a robust set of tools and features for developing modern web applications.',
    author: authors[1],
    createdAt: new Date('2024-09-02T12:30:00Z')
  },
  {
    id: 3,
    title: 'Getting Started with React',
    body: 'React is a library for building user interfaces. It allows developers to create reusable UI components and manage the state of their applications effectively.',
    author: authors[2],
    createdAt: new Date('2024-09-03T14:15:00Z')
  },
  {
    id: 4,
    title: 'Understanding JavaScript Closures',
    body: 'Closures are a fundamental concept in JavaScript that allow functions to retain access to variables from their lexical scope even after the function has finished executing.',
    author: authors[3],
    createdAt: new Date('2024-09-04T16:45:00Z')
  },
  {
    id: 5,
    title: 'Mastering CSS Grid',
    body: 'CSS Grid is a powerful layout system that provides a way to create complex grid-based designs with ease. It allows for more control over the layout of web pages.',
    author: authors[4],
    createdAt: new Date('2024-09-05T09:00:00Z')
  }
];
