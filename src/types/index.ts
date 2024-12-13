export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface Resource {
  _id: string;
  title: string;
  fileName: string;
  image: string;
  grade: number;
  category: string;
  tags: string[];
  fileUrl: string;
  fileType: string;
  fileSize: number;
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correct: string;
  _id: string;
}

export interface Exam {
  _id: string;
  title: string;
  subject: string;
  keywords: string[];
  grade: number;
  duration: number;
  difficulty: string;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
  questionCount: number;
}

export interface WordGame {
  totalWords: number;
}